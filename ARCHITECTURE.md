# 🏗️ Aurora Ledger - System Architecture & Technical Documentation

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Backend Architecture](#backend-architecture)
5. [Frontend Architecture](#frontend-architecture)
6. [Authentication Flow](#authentication-flow)
7. [Multi-Currency System](#multi-currency-system)
8. [API Endpoints](#api-endpoints)
9. [Deployment Architecture](#deployment-architecture)

---

## 🎯 System Overview

Aurora Ledger is a full-stack personal finance management application with the following key components:

```
┌─────────────────────────────────────────────────────────────┐
│                        USER BROWSER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │◄─┤ AuthContext  │──┤ CurrencyCtx  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS.JS BACKEND API SERVER                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │   CRUD   │  │ Currency │  │  OAuth   │   │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  Routes  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│         │            │             │              │         │
│         └────────────┴─────────────┴──────────────┘         │
│                        │                                    │
│                   JWT Middleware                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   POSTGRESQL DATABASE                       │
│  ┌──────────┐  ┌──────────────┐  ┌──────────┐             │
│  │  Users   │  │ Transactions │  │  Budgets │             │
│  ├──────────┤  ├──────────────┤  ├──────────┤             │
│  │Categories│  │ExchangeRates │  │   ...    │             │
│  └──────────┘  └──────────────┘  └──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Live Deployment:**
- **Backend:** https://aurora-ledger-backend.onrender.com
- **Frontend:** (Deployed on Vercel)
- **Database:** Neon PostgreSQL (Serverless)

---

## 🛠️ Technology Stack

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.18
- **Language:** JavaScript (ES Modules)
- **Database:** PostgreSQL 15+ (via Neon)
- **Authentication:** JWT + Passport.js
- **Validation:** Express Validator
- **Password Hashing:** Bcrypt
- **HTTP Client:** Axios (for Exchange Rate API)

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 4
- **Styling:** Tailwind CSS 3
- **Routing:** React Router v6
- **State Management:** Context API
- **Charts:** Recharts
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast

### External APIs
- **Exchange Rate API:** https://www.exchangerate-api.com
  - Free tier: 1,500 requests/month
  - Supports 160+ currencies
  - 24-hour cache implementation

---

## 🗄️ Database Schema

### Tables Overview

```sql
-- Users Table
users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Categories Table
categories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) DEFAULT '#3B82F6',
  icon VARCHAR(50) DEFAULT 'folder',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Transactions Table
transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  type VARCHAR(20) CHECK (type IN ('income', 'expense')),
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT,
  transaction_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

-- Budgets Table
budgets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  month INTEGER CHECK (month BETWEEN 1 AND 12),
  year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, category_id, month, year)
)

-- Exchange Rates Cache Table
exchange_rates (
  id SERIAL PRIMARY KEY,
  from_currency VARCHAR(3) NOT NULL,
  to_currency VARCHAR(3) NOT NULL,
  rate DECIMAL(20, 6) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(from_currency, to_currency)
)
```

### Indexes
```sql
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_budgets_user_id ON budgets(user_id);
CREATE INDEX idx_exchange_rates_currencies ON exchange_rates(from_currency, to_currency);
```

### Relationships
```
users (1) ──< (n) categories
users (1) ──< (n) transactions
users (1) ──< (n) budgets
categories (1) ──< (n) transactions
categories (1) ──< (n) budgets
```

---

## 🔧 Backend Architecture

### Directory Structure
```
backend/
├── config/
│   ├── database.js          # PostgreSQL connection pool
│   └── passport.js          # OAuth strategies (Google)
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── auth.js              # Login/Register endpoints
│   ├── oauth.js             # Google OAuth flow
│   ├── transactions.js      # Transaction CRUD
│   ├── categories.js        # Category CRUD
│   ├── budgets.js           # Budget management
│   ├── reports.js           # Analytics & reports
│   └── currency.js          # Currency conversion
├── scripts/
│   ├── migrate.js           # Initial DB schema
│   ├── migrate-currency.js  # Currency feature migration
│   └── seed.js              # Sample data seeder
├── utils/
│   └── currency.js          # Currency helper functions
├── server.js                # Express app entry point
└── package.json
```

### Server Configuration (server.js)
```javascript
// Entry point: backend/server.js
// Port: 5000 (default) or process.env.PORT
// CORS: Configured for frontend URL
// Routes:
//   - /health           → Health check
//   - /api/auth         → Authentication
//   - /api/categories   → Categories
//   - /api/transactions → Transactions
//   - /api/budgets      → Budgets
//   - /api/reports      → Reports
//   - /api/currency     → Currency operations
```

### Environment Variables
```env
# Required
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend.vercel.app
BACKEND_URL=https://your-backend.onrender.com

# Optional
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EXCHANGE_RATE_API_KEY=0fe9acb002e50ab852947697
PORT=5000
NODE_ENV=production
```

### Authentication Middleware
```javascript
// File: backend/middleware/auth.js
// Extracts JWT from Authorization header
// Verifies token using JWT_SECRET
// Attaches user data to req.user
// Returns 401 if invalid/missing token
```

---

## ⚛️ Frontend Architecture

### Directory Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Main app layout with sidebar
│   │   ├── TransactionModal.jsx # Add/Edit transaction form
│   │   ├── CategoryModal.jsx    # Add/Edit category form
│   │   ├── BudgetModal.jsx      # Set budget form
│   │   └── CurrencySelector.jsx # Currency dropdown (29 currencies)
│   ├── context/
│   │   ├── AuthContext.jsx      # Authentication state
│   │   └── CurrencyContext.jsx  # Currency state & conversion
│   ├── lib/
│   │   └── api.js               # Axios instance with interceptors
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── AuthCallback.jsx     # OAuth redirect handler
│   │   ├── Dashboard.jsx        # Overview & stats
│   │   ├── Transactions.jsx     # Transaction list & management
│   │   ├── Categories.jsx       # Category management
│   │   ├── Budgets.jsx          # Budget tracking
│   │   └── Reports.jsx          # Charts & analytics
│   ├── App.jsx                  # Routes & providers
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind styles
├── index.html
├── vite.config.js
└── package.json
```

### Routing Structure
```javascript
// Public Routes (redirect to /dashboard if authenticated)
/login          → Login page
/register       → Register page
/auth/callback  → OAuth callback handler

// Protected Routes (require authentication)
/               → Redirect to /dashboard
/dashboard      → Overview with stats & charts
/transactions   → Manage income/expenses
/categories     → Customize categories
/budgets        → Set monthly budgets
/reports        → View detailed analytics
```

### Context Providers

#### 1. AuthContext
```javascript
// Provides:
- user: Current user object
- loading: Authentication check status
- login(email, password): Login function
- register(email, password, full_name): Register function
- logout(): Logout function

// Storage:
- localStorage: 'token', 'user'
- axios.defaults.headers.common['Authorization']
```

#### 2. CurrencyContext
```javascript
// Provides:
- currency: Current user's currency (e.g., 'USD')
- setCurrency(code): Update currency preference
- exchangeRates: Object with all exchange rates
- convertAmount(amount, fromCurrency): Convert to user's currency
- formatCurrency(amount, currencyCode): Format with symbol
- loading: Exchange rates loading status

// Features:
- Auto-loads user's saved currency
- Fetches live exchange rates
- Caches rates for 24 hours
- Supports 29+ currencies
```

---

## 🔐 Authentication Flow

### 1. Registration Flow
```
User → Frontend (Register Page)
  ↓ POST /api/auth/register
Backend:
  1. Validate email, password (min 6 chars), full_name
  2. Check if email exists
  3. Hash password with bcrypt (10 rounds)
  4. Create user in database
  5. Create 7 default categories
  6. Generate JWT token (7 days expiry)
  7. Return token + user data
  ↓
Frontend:
  1. Store token in localStorage
  2. Set axios Authorization header
  3. Update AuthContext state
  4. Redirect to /dashboard
```

### 2. Login Flow
```
User → Frontend (Login Page)
  ↓ POST /api/auth/login
Backend:
  1. Validate email format
  2. Find user by email
  3. Compare password with bcrypt
  4. Generate JWT token
  5. Return token + user data
  ↓
Frontend:
  (Same as registration steps 1-4)
```

### 3. Google OAuth Flow
```
User clicks "Login with Google"
  ↓ GET /api/auth/google
Backend: Redirect to Google OAuth consent screen
  ↓ User approves
Google: Redirect to /api/auth/google/callback
Backend:
  1. Verify OAuth token
  2. Extract user email & name
  3. Find or create user
  4. Generate JWT
  5. Redirect to frontend with token
  ↓ GET /auth/callback?token=xxx&name=xxx
Frontend:
  1. Extract token from URL
  2. Store in localStorage
  3. Redirect to /dashboard

Note: OAuth is OPTIONAL - app works without it
```

### 4. Protected Route Access
```
User navigates to /dashboard
  ↓
Frontend (PrivateRoute component):
  1. Check if user exists in AuthContext
  2. If not: redirect to /login
  3. If yes: render requested page
  ↓ API Request
Frontend:
  Add header: Authorization: Bearer <token>
  ↓ POST/GET/PUT/DELETE /api/*
Backend (authMiddleware):
  1. Extract token from header
  2. Verify with JWT_SECRET
  3. Decode user info
  4. Attach to req.user
  5. Continue to route handler
  ↓ If token invalid
  Return 401 Unauthorized
  ↓
Frontend (axios interceptor):
  1. Detect 401 response
  2. Clear localStorage
  3. Redirect to /login
```

---

## 💱 Multi-Currency System

### Supported Currencies (29)
```javascript
Americas:  USD, CAD, BRL, MXN
Europe:    EUR, GBP, CHF, SEK, NOK, DKK, PLN, RUB, TRY
Asia:      VND, JPY, CNY, KRW, THB, SGD, MYR, IDR, PHP, INR, HKD
Oceania:   AUD, NZD
Middle East: AED, SAR
Africa:    ZAR
```

### How It Works

#### 1. Exchange Rate Fetching
```javascript
// Backend: utils/currency.js
API: https://v6.exchangerate-api.com/v6/{API_KEY}/latest/{BASE}

Flow:
1. Check database cache (24h validity)
2. If expired: Fetch from API
3. Store in exchange_rates table
4. Return rate

Caching Strategy:
- Primary: 24-hour fresh cache
- Fallback: Stale cache if API fails
- Prevents API rate limit issues
```

#### 2. Currency Conversion
```javascript
// Frontend: CurrencyContext.jsx
convertAmount(amount, fromCurrency):
  1. If fromCurrency === userCurrency: return amount
  2. Convert to USD first (if needed)
  3. Convert from USD to userCurrency
  4. Return converted amount

Example:
User currency: VND
Transaction: 100 EUR
Steps:
  1. EUR to USD: 100 * 1.08 = 108 USD
  2. USD to VND: 108 * 24,000 = 2,592,000 VND
```

#### 3. Currency Formatting
```javascript
formatCurrency(amount, currencyCode):
  1. Get symbol from mapping
  2. Format with Intl.NumberFormat
  3. Handle decimal places:
     - VND, JPY, KRW, IDR: 0 decimals
     - Others: 2 decimals
  4. Position symbol:
     - Before: $100.00, €100.00
     - After: 100,000 ₫, 100 ¥

Examples:
- USD: $1,234.56
- VND: 1,234,567 ₫
- EUR: €1,234.56
- JPY: 1,234 ¥
```

#### 4. User Currency Preference
```
User selects currency in UI
  ↓ CurrencySelector component
Frontend:
  1. Call setCurrency(newCode)
  ↓ PUT /api/currency/user/preference
Backend:
  1. Validate currency code
  2. UPDATE users SET currency = $1
  ↓
Frontend:
  1. Update CurrencyContext state
  2. Fetch new exchange rates
  3. Re-render all amounts
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register
  Body: { email, password, full_name }
  Returns: { token, user }

POST   /api/auth/login
  Body: { email, password }
  Returns: { token, user }

GET    /api/auth/google
  Initiates Google OAuth flow

GET    /api/auth/google/callback
  OAuth callback endpoint
```

### Categories
```
GET    /api/categories
  Auth: Required
  Returns: Array of user's categories

POST   /api/categories
  Auth: Required
  Body: { name, type, color, icon }
  Returns: Created category

PUT    /api/categories/:id
  Auth: Required
  Body: { name?, type?, color?, icon? }
  Returns: Updated category

DELETE /api/categories/:id
  Auth: Required
  Returns: Success message
```

### Transactions
```
GET    /api/transactions
  Auth: Required
  Query: type, category_id, start_date, end_date, limit, offset
  Returns: Array of transactions with category info

GET    /api/transactions/:id
  Auth: Required
  Returns: Single transaction

POST   /api/transactions
  Auth: Required
  Body: { type, amount, transaction_date, category_id?, description? }
  Returns: Created transaction

PUT    /api/transactions/:id
  Auth: Required
  Body: { type?, amount?, transaction_date?, category_id?, description? }
  Returns: Updated transaction

DELETE /api/transactions/:id
  Auth: Required
  Returns: Success message
```

### Budgets
```
GET    /api/budgets
  Auth: Required
  Query: month, year
  Returns: Array of budgets with spending info

POST   /api/budgets
  Auth: Required
  Body: { category_id, amount, month, year }
  Returns: Created budget

PUT    /api/budgets/:id
  Auth: Required
  Body: { amount }
  Returns: Updated budget

DELETE /api/budgets/:id
  Auth: Required
  Returns: Success message
```

### Reports
```
GET    /api/reports/summary
  Auth: Required
  Query: start_date, end_date
  Returns: { totalIncome, totalExpense, balance, byCategory }

GET    /api/reports/trends
  Auth: Required
  Query: months (default: 6)
  Returns: Monthly income/expense trends
```

### Currency
```
GET    /api/currency/list
  Returns: Array of popular currencies

GET    /api/currency/rate/:from/:to
  Returns: Exchange rate between two currencies

POST   /api/currency/convert
  Body: { amount, from, to }
  Returns: Converted amount with formatting

GET    /api/currency/user/preference
  Auth: Required
  Returns: User's saved currency

PUT    /api/currency/user/preference
  Auth: Required
  Body: { currency }
  Returns: Success message
```

---

## 🚀 Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────────────────┐
│              VERCEL (Frontend CDN)                  │
│  - React app built with Vite                        │
│  - Served as static files                           │
│  - VITE_API_URL → Render backend                    │
│  - Auto-deploy from GitHub main branch              │
└─────────────────────────────────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────────┐
│         RENDER (Backend Web Service)                │
│  URL: https://aurora-ledger-backend.onrender.com    │
│  - Node.js 18 runtime                               │
│  - Start command: npm start                         │
│  - Auto-deploy from GitHub                          │
│  - Environment variables configured                 │
│  - Free tier: Spins down after 15min inactivity     │
└─────────────────────────────────────────────────────┘
                      │ PostgreSQL
                      ▼
┌─────────────────────────────────────────────────────┐
│          NEON (PostgreSQL Database)                 │
│  - Serverless PostgreSQL 15                         │
│  - Connection: DATABASE_URL env var                 │
│  - SSL required                                     │
│  - Free tier: 0.5GB storage, 100h compute/month     │
│  - Auto-pause when inactive                         │
└─────────────────────────────────────────────────────┘
```

### Environment Configuration

**Render (Backend):**
```env
DATABASE_URL=postgresql://...@...neon.tech/...?sslmode=require
JWT_SECRET=random-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app
BACKEND_URL=https://aurora-ledger-backend.onrender.com
EXCHANGE_RATE_API_KEY=0fe9acb002e50ab852947697
NODE_ENV=production

# Optional
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Vercel (Frontend):**
```env
VITE_API_URL=https://aurora-ledger-backend.onrender.com/api
```

### Deployment Flow

**Frontend (Vercel):**
```
1. Push to GitHub main branch
2. Vercel webhook triggers build
3. npm install → vite build
4. Deploy to CDN
5. Assign domain (auto HTTPS)
```

**Backend (Render):**
```
1. Push to GitHub main branch
2. Render webhook triggers build
3. npm install
4. Run npm start (node server.js)
5. Health check at /health
6. Assign URL
```

**Database (Neon):**
```
1. Create project on Neon
2. Copy connection string
3. Add to Render environment variables
4. Run migration: npm run migrate
5. Optional: Run currency migration
```

### First-Time Setup Checklist

```bash
# 1. Database Setup
npm run migrate              # Create tables
npm run migrate-currency     # Add currency features

# 2. Verify Backend
curl https://your-backend.onrender.com/health
# Expected: {"status":"ok","timestamp":"..."}

# 3. Test API
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","full_name":"Test User"}'

# 4. Verify Frontend
# Open browser → https://your-frontend.vercel.app
# Check: Network tab shows API calls to Render backend
```

---

## 🔍 Key Features & Implementation

### 1. Real-time Balance Calculation
```javascript
// Dashboard component
- Fetches all transactions for current month
- Calculates: totalIncome - totalExpense = balance
- Updates on every transaction add/edit/delete
- Converts all amounts to user's currency
```

### 2. Budget Tracking
```javascript
// Budgets page
- User sets monthly limit per category
- System tracks spending in real-time
- Visual progress bars (green → yellow → red)
- Warns at 80%, alerts at 100%
- Compares: budgetAmount vs actualSpent
```

### 3. Category-based Analytics
```javascript
// Reports page uses Recharts
- Pie chart: Expense distribution by category
- Line chart: Income vs Expense trends (6 months)
- Bar chart: Top spending categories
- All data filtered by date range
```

### 4. CSV Export
```javascript
// Transactions & Reports pages
- Converts data to CSV format
- Includes: date, type, category, amount, description
- Downloads as: transactions_YYYY-MM-DD.csv
```

### 5. Responsive Design
```javascript
// Tailwind breakpoints
- Mobile: < 768px (single column, hamburger menu)
- Tablet: 768px - 1024px (sidebar collapses)
- Desktop: > 1024px (full sidebar)
```

---

## 🐛 Common Issues & Solutions

### Issue: OAuth Not Working
**Cause:** Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET
**Solution:** OAuth is optional. Leave env vars empty to disable.
**Backend will show:** `⚠️ Google OAuth disabled`

### Issue: Backend Sleeping (Render Free Tier)
**Cause:** Inactivity for 15+ minutes
**Solution:** First request takes 30-60s to wake up. Subsequent requests are fast.

### Issue: Exchange Rates Not Loading
**Cause:** API key invalid or rate limit exceeded
**Solution:** System uses 24h cache. Old rates still work even if API fails.

### Issue: 401 Unauthorized
**Cause:** Token expired (7 days) or invalid
**Solution:** User automatically logged out. Re-login required.

---

## 📊 Performance Metrics

### Database Queries
- **Optimized with indexes** on user_id, transaction_date
- **JOIN queries** for transactions + categories (single query)
- **Caching** for exchange rates (reduces API calls)

### API Response Times (typical)
- Authentication: ~200ms
- Get transactions: ~150ms
- Create transaction: ~100ms
- Exchange rates (cached): ~50ms
- Exchange rates (API): ~800ms

### Frontend Bundle Size
- Initial bundle: ~180KB (gzipped)
- Lazy loaded: Charts library (~60KB)
- Total: ~240KB for full app

---

## 🔒 Security Measures

1. **Password Security**
   - Bcrypt hashing (10 rounds)
   - Minimum 6 characters enforced
   - Never stored in plain text

2. **JWT Tokens**
   - Signed with secret key
   - 7-day expiration
   - Validated on every protected route

3. **Database Security**
   - SSL required for connections
   - ON DELETE CASCADE for referential integrity
   - User isolation (all queries filtered by user_id)

4. **API Security**
   - CORS configured for frontend only
   - Input validation with express-validator
   - SQL injection prevention (parameterized queries)
   - XSS protection (React auto-escapes)

5. **Environment Variables**
   - Secrets never committed to Git
   - Different values for dev/prod
   - API keys stored securely

---

## 📈 Future Enhancements

- [ ] Recurring transactions (monthly subscriptions)
- [ ] Bill reminders & notifications
- [ ] Receipt upload & OCR
- [ ] Mobile app (React Native)
- [ ] Bank account integration (Plaid API)
- [ ] AI-powered spending insights
- [ ] Shared budgets (family accounts)
- [ ] Investment tracking
- [ ] Two-factor authentication (2FA)
- [ ] Password reset via email
- [ ] Dark mode

---

## 📞 Support & Maintenance

### Health Monitoring
```bash
# Check backend status
curl https://aurora-ledger-backend.onrender.com/health

# Check database connection
# If /health returns 200, database is connected
```

### Logs
- **Render:** View in dashboard → Logs tab
- **Vercel:** View in deployment logs
- **Neon:** Query monitoring in dashboard

### Backup Strategy
- **Database:** Neon automatic backups (point-in-time recovery)
- **User data:** Export to CSV regularly
- **Code:** Git repository on GitHub

---

**Last Updated:** October 2024
**Version:** 1.0.0
**Maintained by:** Aurora Ledger Team

