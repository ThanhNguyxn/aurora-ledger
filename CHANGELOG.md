# 📋 Aurora Ledger - Changelog

## Version 1.0.0 - October 27, 2025

### 🎉 Initial Release

**Live URLs:**
- Frontend: https://aurora-ledger.vercel.app
- Backend: https://aurora-ledger-backend.onrender.com

---

## ✨ Latest Updates

### 🐛 Bug Fixes (October 27, 2025)

#### Currency Display Issues ✅
- **Fixed:** Currency symbols now update properly when switching currencies
- **Fixed:** All pages (Dashboard, Transactions, Budgets, Reports) now use `formatCurrency()`
- **Fixed:** Proper symbol positioning for different currencies
  - Before amount: $, €, £, etc.
  - After amount: ₫, ¥, ₩, kr, etc.
- **Fixed:** Decimal places handling
  - No decimals: VND, JPY, KRW, IDR
  - 2 decimals: All others
- **Added:** Support for all 29 currencies with proper symbols

#### Password Reset ✅
- **Fixed:** Reset tokens now stored in database (not memory)
- **Fixed:** Tokens persist across server restarts
- **Added:** Email sending via Nodemailer + SendGrid/Gmail
- **Added:** Beautiful HTML email templates
- **Added:** Token expiry (1 hour) with auto-cleanup
- **Added:** Forgot Password and Reset Password pages

#### Authentication ✅
- **Fixed:** Google OAuth callback handling
- **Fixed:** User data properly saved to localStorage
- **Fixed:** JWT token structure consistency
- **Added:** Remember Me checkbox on login
- **Added:** Auto-fill email on return visits

#### UI/UX Improvements ✅
- **Added:** Currency selector in sidebar
- **Removed:** "Try Demo Account" button (dev-only feature)
- **Added:** "Forgot password?" link
- **Fixed:** Vercel SPA routing (404 errors)
- **Fixed:** All interactive buttons and forms

---

## 🌍 Multi-Currency Support

### Supported Currencies (29)

**Americas (4):**
- 🇺🇸 USD (US Dollar) - $
- 🇨🇦 CAD (Canadian Dollar) - C$
- 🇧🇷 BRL (Brazilian Real) - R$
- 🇲🇽 MXN (Mexican Peso) - $

**Europe (9):**
- 🇪🇺 EUR (Euro) - €
- 🇬🇧 GBP (British Pound) - £
- 🇨🇭 CHF (Swiss Franc) - Fr
- 🇸🇪 SEK (Swedish Krona) - kr
- 🇳🇴 NOK (Norwegian Krone) - kr
- 🇩🇰 DKK (Danish Krone) - kr
- 🇵🇱 PLN (Polish Zloty) - zł
- 🇷🇺 RUB (Russian Ruble) - ₽
- 🇹🇷 TRY (Turkish Lira) - ₺

**Asia-Pacific (13):**
- 🇻🇳 VND (Vietnamese Dong) - ₫
- 🇯🇵 JPY (Japanese Yen) - ¥
- 🇨🇳 CNY (Chinese Yuan) - ¥
- 🇰🇷 KRW (Korean Won) - ₩
- 🇹🇭 THB (Thai Baht) - ฿
- 🇸🇬 SGD (Singapore Dollar) - S$
- 🇲🇾 MYR (Malaysian Ringgit) - RM
- 🇮🇩 IDR (Indonesian Rupiah) - Rp
- 🇵🇭 PHP (Philippine Peso) - ₱
- 🇮🇳 INR (Indian Rupee) - ₹
- 🇭🇰 HKD (Hong Kong Dollar) - HK$
- 🇦🇺 AUD (Australian Dollar) - A$
- 🇳🇿 NZD (New Zealand Dollar) - NZ$

**Middle East & Africa (3):**
- 🇦🇪 AED (UAE Dirham) - د.إ
- 🇸🇦 SAR (Saudi Riyal) - ر.س
- 🇿🇦 ZAR (South African Rand) - R

### Currency Features
- ✅ Real-time exchange rates (ExchangeRate API)
- ✅ 24-hour caching for performance
- ✅ Automatic conversion across all pages
- ✅ Currency-specific formatting
- ✅ User preference saved to database

---

## 📚 Features

### Core Features
- ✅ User Authentication (Email/Password + Google OAuth)
- ✅ Transaction Management (Income & Expense tracking)
- ✅ Category Management (Custom categories with colors)
- ✅ Budget Tracking (Monthly budgets with progress bars)
- ✅ Financial Reports (Charts and analytics)
- ✅ Multi-Currency Support (29 currencies)
- ✅ Password Reset (Email-based)

### Security
- ✅ JWT Authentication (7-day expiry)
- ✅ Bcrypt Password Hashing (10 rounds)
- ✅ SQL Injection Protection
- ✅ HTTPS/SSL Encryption
- ✅ CORS Configuration
- ✅ User Data Isolation

### User Experience
- ✅ Remember Me functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Real-time updates
- ✅ Beautiful UI with Tailwind CSS
- ✅ Interactive charts with Recharts
- ✅ Toast notifications
- ✅ Loading states

---

## 🛠️ Technical Details

### Frontend
- React 18 + Vite
- Tailwind CSS 3
- React Router v6
- Recharts
- Axios
- React Hot Toast

### Backend
- Node.js 18+
- Express 4.18
- PostgreSQL 15
- JWT + Passport.js
- Bcrypt
- Nodemailer

### Deployment
- Frontend: Vercel (CDN, auto-deploy)
- Backend: Render (750h/month free)
- Database: Neon (Serverless PostgreSQL)

### External APIs
- ExchangeRate API (currency conversion)
- SendGrid (email delivery - optional)

---

## 🔧 Environment Variables

### Backend (Render)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=***
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://aurora-ledger.vercel.app
BACKEND_URL=https://aurora-ledger-backend.onrender.com
EXCHANGE_RATE_API_KEY=***
SENDGRID_API_KEY=*** (optional)
EMAIL_FROM=*** (optional)
GOOGLE_CLIENT_ID=*** (optional)
GOOGLE_CLIENT_SECRET=*** (optional)
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://aurora-ledger-backend.onrender.com/api
```

---

## 📈 Performance

- Frontend bundle: ~180KB (gzipped)
- API response time: ~150-250ms
- Database queries: < 50ms (indexed)
- Currency conversion: ~50ms (cached)
- First load: 1-2 seconds

---

## 🚀 What's Next

### Planned Features
- [ ] Email notifications (budget alerts)
- [ ] Recurring transactions
- [ ] Receipt upload & scanning
- [ ] Mobile app (React Native)
- [ ] Bank account integration
- [ ] AI-powered insights
- [ ] Shared budgets (family accounts)
- [ ] Two-factor authentication (2FA)
- [ ] Dark mode
- [ ] Custom date range exports

### Infrastructure
- [ ] Add Google Analytics
- [ ] Set up error monitoring (Sentry)
- [ ] Configure custom domain
- [ ] Automated database backups
- [ ] Performance monitoring

---

## 📞 Support

- **Issues:** https://github.com/ThanhNguyxn/aurora-ledger/issues
- **Documentation:** See README.md
- **Live Site:** https://aurora-ledger.vercel.app

---

**Last Updated:** October 27, 2025
**Version:** 1.0.0
**Status:** 🟢 Production

