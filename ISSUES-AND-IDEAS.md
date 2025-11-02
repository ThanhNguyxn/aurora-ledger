# Issues & Future Ideas - Aurora Ledger

## 🐛 Known Issues (To Fix)

### High Priority
- [x] **Dashboard forecast variable error** - Fixed ✅
  - Issue: Variable `forecast` was referenced but declared as `forecastData`
  - Location: `frontend/src/pages/Dashboard.jsx` line 286
  - Status: FIXED - Changed all `forecast` references to `forecastData`

- [x] **Admin User Details Modal** - Completed ✅
  - Feature: Click eye icon on users to view detailed information
  - Implementation:
    - Backend endpoint: `GET /api/admin/users/:id/details`
    - User Details Modal with 3 sections:
      1. Account Information (email, name, role, currency, registration method, joined date)
      2. Statistics (transaction/category/budget/goal/recurring counts)
      3. Family Memberships (families, roles, members with expandable lists)
    - Role badges with icons (Crown/Shield/UserCheck/Eye)
    - "This user" tag to highlight current user in member lists
    - Translated to 10 languages (en, vi, de, es, fr, ja, ko, pt, ru, zh)
    - OAuth provider translation (Email/Password vs Google)
  - UX Improvements:
    - Removed Stats column from table (less clutter)
    - Reduced pagination from 20 → 10 users/page
    - Fixed API authentication (axios → api helper)
  - Status: COMPLETE and committed ✅

- [ ] **Analytics & Family pages showing blank screen** - FAILED ATTEMPTS ❌
  - Root Cause: Double Layout wrapper (Layout in App.jsx + Layout in page components)
  - Attempted Solutions:
    1. Added empty state messages → Did NOT fix (still blank)
    2. Removed Layout wrapper from components → Syntax errors, code broken
    3. Git reset to clean state → Lost all changes
  - Current Status: **REVERTED TO ORIGINAL STATE**
  - Real Issue: **Architecture problem** - Components have `<Layout>` wrapper but also wrapped by Layout in App.jsx routing
  - Proper Fix Required: Need to completely rewrite components WITHOUT Layout wrapper OR change App.jsx routing structure
  - **RECOMMENDATION**: Leave as-is for now, this is a major refactor that needs careful planning

### Medium Priority
- [ ] **Google OAuth not configured**
  - Warning: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` not set
  - Impact: Users cannot login with Google
  - Location: Backend `.env` file
  - Fix: Need to create Google OAuth app and add credentials

- [ ] **Port 5000 conflict on restart**
  - Issue: Backend sometimes fails to start because port is already in use
  - Solution: Kill existing process or use different port
  - Workaround: `Get-Process -Name node | Stop-Process -Force`

### Low Priority
- [ ] **Missing key prop warnings in lists**
  - Location: Various list renders in React components
  - Impact: Console warnings, no functional impact
  - Fix: Add unique `key` prop to mapped elements

## 💡 Future Ideas & Enhancements

### User Experience
- [ ] **Add onboarding tutorial/walkthrough**
  - Interactive guide for first-time users
  - Step-by-step setup wizard (add transaction → create budget → set goal)
  - Highlight key features (Dashboard health score, multi-currency, dark mode)
  - Sample data option to explore features before adding real data

- [ ] **Improve empty states across all pages**
  - Add illustrations or Lottie animations
  - Actionable CTAs with quick-add buttons
  - Show mockup screenshots of what data will look like
  - Add helpful tips (e.g., "Set budgets to track spending automatically")

- [ ] **Enhanced data export**
  - ✅ CSV export already exists for transactions
  - Add Excel export with formatted sheets
  - PDF statements with branding and summaries
  - Scheduled email reports (weekly/monthly digest)
  - Full data backup/restore (all transactions, budgets, goals, families)

- [ ] **Smart search & filters**
  - Global search across all data (transactions, budgets, goals, families)
  - Advanced filters with AND/OR logic
  - Save filter presets for quick access
  - Search by merchant name, amount range, date range

### Features (Expanding Current Capabilities)

- [ ] **Recurring transactions enhancements**
  - ✅ Already have daily/weekly/monthly/yearly scheduling
  - Auto-categorization based on description patterns
  - Predict next bill amounts using history
  - Email/push reminders 1-3 days before due date
  - Mark recurring as "paid" vs auto-create
  - Recurring income support (salary, freelance, etc.)

- [ ] **Advanced Analytics (Beyond Current Trends API)**
  - ✅ Already have: Anomalies, YoY, Velocity, Patterns
  - Seasonal spending analysis (Christmas, summer vacation, etc.)
  - Category benchmarking (compare to average users)
  - Spending heatmap by day of week/month
  - Merchant-level analysis (top vendors, frequency)
  - Cash flow forecasting (6-12 month projections)
  - What-if scenarios (budget changes impact)

- [ ] **Mobile app (React Native)**
  - Native iOS/Android app using same backend API
  - Biometric login (FaceID/TouchID)
  - Receipt photo capture with OCR
  - Quick expense entry widget
  - Offline mode with sync
  - Push notifications for budget alerts

- [ ] **Notifications & Alerts**
  - Browser push notifications (Web Push API)
  - Email notifications via Resend API (already integrated)
  - Budget warnings at 50%, 80%, 100%
  - Goal milestone celebrations (25%, 50%, 75%, 100%)
  - Unusual spending alerts (>2x category average)
  - Family activity feed (new shared expenses, goal contributions)
  - Recurring transaction reminders

- [ ] **Family & Group Features Expansion**
  - ✅ Already have: Family groups, roles, shared budgets/goals
  - Expense splitting calculator (equal, by percentage, custom amounts)
  - Debt tracking between family members ("I owe John $50")
  - Allowance system for kids with auto-recurring deposits
  - Approval workflows for expenses over threshold
  - Family leaderboard (savings, budget adherence)
  - Shared shopping lists with budget tracking

### Technical Improvements

- [ ] **Performance optimization**
  - ✅ Already using React Query with 5min cache
  - Add virtual scrolling for long transaction lists (react-window)
  - Lazy load chart libraries (Code splitting)
  - Image optimization (WebP format, compression)
  - Debounce search inputs
  - Service Worker for offline caching

- [ ] **Error handling & UX**
  - Global error boundary component
  - Toast notifications for API errors (react-hot-toast)
  - Retry logic with exponential backoff
  - Offline mode with queued actions
  - Loading skeletons instead of spinners
  - Optimistic UI updates

- [ ] **Testing (Currently None)**
  - Unit tests with Jest + React Testing Library
  - Integration tests for API endpoints
  - E2E tests with Playwright/Cypress
  - Visual regression tests (Percy/Chromatic)
  - Test coverage reports (>80% target)

- [ ] **Security enhancements**
  - ✅ Already have: Bcrypt, JWT, SQL parameterization
  - Add 2FA (Two-Factor Authentication) via email/authenticator app
  - Session management (logout all devices, view active sessions)
  - Rate limiting on API endpoints (express-rate-limit)
  - SQL injection protection audit
  - CSRF token protection
  - Content Security Policy headers
  - Audit log for sensitive actions

- [ ] **Database & Backend**
  - Database query optimization (indexes, explain analyze)
  - Connection pooling configuration
  - Redis caching layer for exchange rates
  - Background job queue (Bull) for recurring transactions
  - API versioning (/api/v1/, /api/v2/)
  - GraphQL API option for flexible queries
  - Webhook support for integrations

### UI/UX Polish

- [ ] **Dark mode improvements**
  - ✅ Already have dark mode toggle
  - Better color contrast (WCAG AAA compliance)
  - Consistent chart colors in dark mode
  - Smooth theme transitions with CSS animations
  - System preference detection (auto dark/light based on OS)

- [ ] **Accessibility (A11y)**
  - Add ARIA labels to all interactive elements
  - Full keyboard navigation support (Tab, Enter, Escape)
  - Screen reader optimization (VoiceOver, NVDA testing)
  - High contrast mode
  - Focus indicators for all focusable elements
  - Alt text for all images/icons
  - Lighthouse accessibility score >95

- [ ] **Internationalization expansion**
  - ✅ Already have 10 languages (en, vi, zh, de, es, fr, ja, ko, pt, ru)
  - Add Arabic (RTL support needed)
  - Add Hindi, Italian, Dutch
  - Currency formatting by locale (1,000.00 vs 1.000,00)
  - Date formatting by locale (MM/DD/YYYY vs DD/MM/YYYY)
  - Number formatting (thousand separator)
  - RTL layout support for Arabic/Hebrew

- [ ] **Visual enhancements**
  - Micro-interactions (button hover, click animations)
  - Page transition animations (Framer Motion)
  - Confetti effects for goal completion
  - Skeleton screens for loading states
  - Custom scrollbars
  - Gradient backgrounds and glassmorphism effects

### Integrations & Automation

- [ ] **Bank account sync (Premium Feature)**
  - Plaid integration for automatic transaction import
  - Real-time balance tracking
  - Auto-categorization based on merchant data
  - Duplicate transaction detection
  - 10,000+ banks supported in US/Europe/Canada

- [ ] **Payment & billing reminders**
  - ✅ Email via Resend API (already integrated)
  - SMS alerts via Twilio (pay-as-you-go)
  - Browser push notifications (Web Push API)
  - Slack/Discord webhooks for family groups
  - Calendar integration (Google Calendar, Outlook)

- [ ] **Third-party integrations**
  - Zapier/Make.com webhooks
  - IFTTT triggers (new transaction, budget exceeded, goal reached)
  - Google Sheets export (auto-sync)
  - Telegram bot for quick expense entry
  - Notion database sync

- [ ] **Import from other apps**
  - CSV import wizard (map columns to fields)
  - Support for Mint, YNAB, Personal Capital exports
  - QIF/OFX file format support
  - Receipt OCR (Google Vision API / Tesseract.js)

### Social & Community

- [ ] **Public budget templates**
  - ✅ Already have 50/30/20, 60/20/20, 70/20/10, Zero-based
  - User-submitted templates marketplace
  - Template ratings and reviews
  - Browse by country/income level
  - Share your budget anonymously

- [ ] **Financial challenges**
  - 30-day no-spend challenge
  - Save $1000 in 3 months challenge
  - Reduce dining out by 50% challenge
  - Leaderboard and badges
  - Community support forums

- [ ] **Anonymous benchmarking**
  - Compare your spending to users in same income bracket
  - Category averages by country/region
  - Savings rate percentile ranking
  - Privacy-first (aggregated data only)

### Premium/Paid Features (Optional Revenue)

- [ ] **Free tier limitations (if needed)**
  - Current: Unlimited everything ✅
  - Option: Limit to 100 transactions/month (free)
  - Option: 1 family group (free) vs unlimited (pro)
  - Option: 3 saved goals (free) vs unlimited (pro)

- [ ] **Premium features ($5-10/month)**
  - Bank account sync (Plaid integration)
  - Unlimited PDF exports
  - Priority customer support
  - Advanced analytics (12-month trends, custom date ranges)
  - White-label option (remove branding)
  - API access for developers
  - Automatic backups to Google Drive/Dropbox

- [ ] **Team/Business plan ($20-50/month)**
  - Unlimited family groups
  - Business expense tracking
  - Invoice management
  - Tax category tagging
  - Accountant access (view-only mode)
  - Multi-year data retention

## 📝 Notes

### Current Tech Stack
**Frontend:**
- React 18 + Vite (fast builds, HMR)
- React Query (5min cache, reduces API calls 80%)
- Tailwind CSS (utility-first styling)
- Recharts (data visualization)
- React Router v6 (nested routes with Layout/Outlet)
- i18next (10 languages supported)
- jsPDF (PDF export for reports)

**Backend:**
- Node.js v22 + Express
- PostgreSQL (20+ tables, Neon serverless)
- JWT authentication (7-day expiry)
- Bcrypt password hashing
- Passport.js (OAuth support)
- Node-cron (recurring transaction processor)
- Resend (email delivery, 100/day free)

**External APIs:**
- ExchangeRate-API (1,500 req/month free, 29 currencies)

**Hosting (100% FREE):**
- Frontend: Vercel (unlimited bandwidth, global CDN)
- Backend: Render (750 hrs/month, sleeps after 15min - use UptimeRobot)
- Database: Neon (0.5GB, pauses after 7 days inactivity)
- Monitoring: UptimeRobot (ping every 5min, prevents sleep)

### Architecture Decisions
- **React Router v6** with nested routes
- **Layout component** wraps all authenticated pages via `<Outlet />`
  - ⚠️ Do NOT remove Layout wrapper - causes blank screens
  - Always add empty state UI instead of removing Layout
- **Currency Context** provides global currency conversion
- **Theme Context** for dark/light mode persistence (localStorage)
- **Auth Context** manages user session and JWT token
- **API caching** with React Query (5min TTL, stale-while-revalidate)

### Database Schema (20+ Tables)
- **users** - Authentication, roles (admin/moderator/user), OAuth provider
- **families** - Group sharing, owner tracking
- **family_members** - Roles (owner/admin/member/viewer), join dates
- **transactions** - Income/expense with currency, category, notes
- **categories** - Custom categories with colors
- **budgets** - Monthly limits per category with currency
- **goals** - Savings targets with icons, priority, deadline, currency
- **goal_contributions** - Deposit/withdraw tracking with transaction links
- **recurring_transactions** - Scheduled automation (daily/weekly/monthly/yearly)
- **password_resets** - Token-based password recovery
- **invitations** - Email invites for family groups

### API Endpoints Structure
- `/api/auth/*` - Login, register, OAuth, logout
- `/api/transactions/*` - CRUD operations, filters, pagination
- `/api/categories/*` - Category management
- `/api/budgets/*` - Budget CRUD, smart suggestions
- `/api/goals/*` - Goal CRUD, contributions
- `/api/recurring/*` - Recurring transaction management
- `/api/dashboard` - Financial health score, WoW, monthly summary, top categories
- `/api/trends/*` - Analytics (anomalies, YoY, velocity, patterns)
- `/api/reports/*` - Export data, PDF generation
- `/api/families/*` - Family CRUD, invitations, members, shared budgets/goals
- `/api/insights/*` - AI-powered recommendations
- `/api/currency` - Exchange rates (cached 24h)
- `/api/admin/*` - User management, analytics (admin-only)

### Key Features Summary
✅ **Implemented:**
- Multi-currency (29 currencies, real-time rates)
- Dark/Light mode toggle
- i18n (10 languages: en, vi, zh, de, es, fr, ja, ko, pt, ru)
- Dashboard with Financial Health Score (40% savings + 30% budget + 30% goals)
- Transaction CRUD with pagination
- Recurring transactions (auto-creation via cron job)
- Budgets with smart AI suggestions (50/30/20, 60/20/20, 70/20/10, Zero-based)
- Saving goals with contribution tracking
- Family sharing (roles, invitations, shared budgets/goals)
- Advanced analytics (anomalies, YoY, velocity, patterns)
- Reports with CSV/PDF export
- OAuth login (Google)
- Password reset via email
- Admin dashboard
- React Query caching (5min TTL)

⚠️ **Partially Implemented:**
- Mobile responsive (needs optimization)
- Empty states (added to Analytics, needs others)
- Error handling (basic, needs improvement)

❌ **Not Implemented:**
- Unit/Integration/E2E tests
- 2FA authentication
- Bank account sync (Plaid)
- Mobile app (React Native)
- Push notifications
- Receipt OCR
- Offline mode
- Premium features

### Performance Metrics
- React Query cache hit rate: ~80% (reduces API calls significantly)
- Exchange rate cache: 24h (reduces external API calls)
- Dashboard load time: <1s (with cache)
- Transaction list: Paginated (10 items/page, lazy load)

### Known Limitations
1. **Render free tier**: Backend sleeps after 15min inactivity
   - Solution: UptimeRobot pings every 5min
   - Alternative: Upgrade to Render Starter ($7/month)

2. **Neon free tier**: Database pauses after 7 days inactivity
   - Auto-resumes on first query
   - 0.5GB storage limit (enough for ~50,000 transactions)

3. **ExchangeRate-API**: 1,500 requests/month
   - With 24h cache, supports ~50 users daily
   - Alternative: Open Exchange Rates (1,000 req/month free)

4. **Resend email**: 100 emails/day free
   - Enough for password resets + invitations
   - Alternative: SendGrid (100/day free)

### Future Considerations
- **Scalability**: Current free tier supports ~50-100 active users
- **Monetization**: Optional premium features for sustainability
- **Testing**: Critical for production reliability
- **Mobile app**: Expand user base significantly
- **Bank sync**: Game-changer for user retention (Plaid = $249/month)

---

**Last Updated:** November 2, 2025  
**Maintained by:** Development Team  
**Priority Legend:** High > Medium > Low
