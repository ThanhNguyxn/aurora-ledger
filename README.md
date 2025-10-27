# 🌟 Aurora Ledger - Personal Finance Management

<div align="center">

![Aurora Ledger Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Aurora+Ledger+-+Smart+Personal+Finance)

**Modern, Simple, and Free Personal Finance Management Application**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [💻 Installation](#installation) • [🤝 Contributing](#contributing)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)

</div>

---

## 💡 About

**Aurora Ledger** is a comprehensive web application designed to help you manage your personal finances effortlessly. With a beautiful, intuitive interface and powerful features, Aurora Ledger empowers you to:

- 📊 **Track Income & Expenses** - Record every financial transaction
- 🎯 **Manage Budgets** - Set goals and control spending
- 📈 **Analyze Finances** - Visualize your data through interactive charts
- 💰 **Plan Financially** - Make smarter financial decisions
- 🌍 **Multi-Currency Support** - Track finances in 29+ currencies

> **100% Free** • **Secure** • **Easy to Use** • **Access Anywhere**

---

## ✨ Key Features

### 🔐 Security & Privacy
- **Secure Authentication** - JWT-based user authentication
- **Password Encryption** - Bcrypt hashing for maximum security
- **Private Data** - Each user's data is completely isolated
- **HTTPS Support** - Secure connections for all data transfers

### 💳 Transaction Management
- ✅ **Quick Entry** - Add transactions in seconds
- ✅ **Categorization** - Organize with custom categories
- ✅ **Notes & Details** - Add descriptions to each transaction
- ✅ **Search & Filter** - Find transactions easily
- ✅ **Edit & Delete** - Full control over your data

### 🌍 Multi-Currency Support
- 💱 **29+ Currencies** - From USD, EUR, VND to AED, SAR, and more
- 🔄 **Real-time Exchange Rates** - Automatic currency conversion
- 📊 **Currency-aware Reports** - Accurate financial analytics
- 🎨 **Beautiful UI** - Flag icons for easy currency identification

**Supported Currencies:**
- Americas: USD, CAD, BRL, MXN
- Europe: EUR, GBP, CHF, SEK, NOK, DKK, PLN, RUB, TRY
- Asia-Pacific: VND, JPY, CNY, KRW, THB, SGD, MYR, IDR, PHP, INR, HKD, AUD, NZD
- Middle East: AED, SAR
- Africa: ZAR

### 📁 Custom Categories
- 🎨 **Personalized Categories** - Create categories that fit your lifestyle
- 🌈 **Color Coding** - Distinguish categories with colors
- 📊 **Category Analytics** - See where your money goes

### 💰 Smart Budgets
- 🎯 **Monthly Budgets** - Set spending limits per category
- 📉 **Progress Tracking** - Visual indicators of budget usage
- ⚠️ **Auto Warnings** - Get notified when approaching limits
- 💡 **Insights** - Learn from your spending patterns

### 📊 Reports & Analytics
- 📈 **Trend Charts** - Visualize income/expense trends
- 🥧 **Pie Charts** - Spending distribution by category
- 📅 **Custom Date Ranges** - Analyze any time period
- 📥 **CSV Export** - Download your data for offline analysis

### 🎨 User Experience
- 🖥️ **Modern Design** - Clean and professional interface
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast & Smooth** - Optimized performance
- 🌐 **PWA Ready** - Install as a mobile app

---

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful and responsive charts
- **Axios** - HTTP client for API calls

### Backend
- **Node.js & Express** - RESTful API server
- **PostgreSQL** - Robust relational database
- **JWT** - Secure authentication
- **Bcrypt** - Password hashing
- **Passport.js** - OAuth authentication (Google)

### DevOps & Deployment
Aurora Ledger can be deployed on various free platforms:

**Frontend Hosting (Free Tier):**
- ☁️ **[Vercel](https://vercel.com)** - Recommended for React apps
- 🔷 **[Netlify](https://netlify.com)** - Easy deployment with CI/CD
- 🎯 **[GitHub Pages](https://pages.github.com)** - Free for public repos
- 🌐 **[Cloudflare Pages](https://pages.cloudflare.com)** - Global CDN

**Backend Hosting (Free Tier):**
- 🚀 **[Render](https://render.com)** - 750 hours/month free
- 🔵 **[Railway](https://railway.app)** - $5 free credits/month
- ⚡ **[Fly.io](https://fly.io)** - Generous free tier
- 🟣 **[Cyclic](https://cyclic.sh)** - Serverless deployment

**Database (Free Tier):**
- 💾 **[Neon](https://neon.tech)** - Serverless PostgreSQL (Recommended)
- 🐘 **[Supabase](https://supabase.com)** - PostgreSQL + extras
- 🌊 **[ElephantSQL](https://elephantsql.com)** - 20MB free
- 🎯 **[Aiven](https://aiven.io)** - 1 month free trial

---

## 💻 Installation

### Quick Start (Users)

👉 **Just visit:** [Aurora Ledger](#) and create your account!

### Development Setup

#### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/aurora-ledger.git
cd aurora-ledger
```

#### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp env.example .env

# Configure your .env file with:
# - DATABASE_URL (PostgreSQL connection string)
# - JWT_SECRET (random secret key)
# - GOOGLE_CLIENT_ID (optional, for OAuth)
# - GOOGLE_CLIENT_SECRET (optional, for OAuth)

# Run database migrations
npm run migrate

# Start the server
npm start
```

#### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp env.example .env

# Configure your .env file with:
# - VITE_API_URL (your backend URL)

# Start development server
npm run dev
```

#### 4. Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 🌍 Deployment Guide

### Deploy to Vercel (Frontend) + Render (Backend) + Neon (Database)

#### Step 1: Database (Neon)
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string

#### Step 2: Backend (Render)
1. Create account at [render.com](https://render.com)
2. New Web Service → Connect your GitHub repo
3. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables (DATABASE_URL, JWT_SECRET, etc.)
4. Deploy

#### Step 3: Frontend (Vercel)
1. Create account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Add environment variable: `VITE_API_URL` (your Render backend URL)
4. Deploy

🎉 Your app is now live!

---

## 📱 Usage Guide

### 1. Create an Account
- Click "Sign Up"
- Enter your name, email, and password
- Start managing your finances!

### 2. Add Transactions
- Go to "Transactions" page
- Click "+ Add Transaction"
- Fill in amount, date, category, and notes
- Save to track your spending

### 3. Set Budgets
- Navigate to "Budgets"
- Choose a category
- Set monthly spending limit
- Monitor your progress

### 4. View Reports
- Check "Dashboard" for overview
- Visit "Reports" for detailed analytics
- Export data as CSV for backup

### 5. Manage Categories
- Customize in "Categories" page
- Create categories that fit your lifestyle
- Assign colors for easy identification

---

## 🎯 Use Cases

### 👤 Individuals
- Control monthly spending
- Save for specific goals
- Understand spending patterns

### 👨‍👩‍👧 Families
- Manage household expenses
- Track family budgets
- Plan financial future together

### 🎓 Students
- Monitor pocket money
- Track tuition and books
- Learn financial management early

### 💼 Freelancers
- Track project income
- Manage business expenses
- Separate personal and business finances

---

## 🛣️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Bank account integration
- [ ] Recurring transactions
- [ ] Shared budgets for families
- [ ] AI-powered insights
- [ ] Investment tracking
- [ ] Bill reminders
- [ ] Receipt scanning

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
- 🐛 **Report Bugs** - Open an [Issue](../../issues)
- 💡 **Suggest Features** - Share your ideas
- 🔧 **Submit Code** - Create Pull Requests
- 📖 **Improve Docs** - Help others understand
- 🌍 **Translations** - Add language support

### Development Process
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Exchange Rate API** - [ExchangeRate-API](https://www.exchangerate-api.com/)
- **Icons** - Country flags and currency symbols
- **Community** - Thanks to all contributors!

---

## 📞 Support

### Need Help?

- 📧 **Email:** support@auroraledger.com
- 🐛 **Bug Reports:** [GitHub Issues](../../issues)
- 💬 **Discussions:** [GitHub Discussions](../../discussions)
- 📖 **Documentation:** [Wiki](../../wiki)

### Community

- ⭐ **Star** this repo if you find it helpful!
- 👀 **Watch** for updates
- 🔀 **Fork** to create your own version

---

## 🔒 Security

Found a security vulnerability? Please email security@auroraledger.com instead of opening a public issue.

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/aurora-ledger)
![GitHub issues](https://img.shields.io/github/issues/yourusername/aurora-ledger)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/aurora-ledger)

---

<div align="center">

**Start Managing Your Finances Smartly Today!**

[🚀 Get Started](#installation) • [📖 Read Docs](#features) • [💬 Join Community](../../discussions)

---

Made with ❤️ by Aurora Ledger Team

⭐ If you find this helpful, give us a star on GitHub!

</div>
