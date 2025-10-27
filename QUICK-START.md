# 🚀 Aurora Ledger - Quick Start Guide

## Test Your Deployment (Step by Step)

### ✅ Step 1: Check if Site is Live

Open: [https://aurora-ledger.vercel.app](https://aurora-ledger.vercel.app)

You should see the login page with "AuroraLedger" title.

---

### ✅ Step 2: Create Account

1. Click **"Register here"**
2. Fill in:
   - Full Name: Your name
   - Email: your-email@example.com
   - Password: At least 6 characters
   - Confirm Password: Same as above
3. Click **"Create Account"**
4. Should redirect to Dashboard

**Default Categories Created:**
- Salary, Other Income (income)
- Food & Dining, Transportation, Shopping, Bills & Utilities, Other Expenses (expense)

---

### ✅ Step 3: Add Your First Transaction

1. Go to **"Transactions"** page (sidebar)
2. Click **"+ Add Transaction"** button
3. Fill the form:
   - **Type:** Income or Expense (click button)
   - **Amount:** Enter number (e.g., 100)
   - **Date:** Select date (default is today)
   - **Category:** Choose from dropdown
   - **Description:** Optional note
4. Click **"Create"**
5. ✅ Transaction appears in the list!

**Example - Add Salary:**
- Type: Income (green)
- Amount: 5000
- Date: Today
- Category: Salary
- Description: Monthly salary

**Example - Add Expense:**
- Type: Expense (red)
- Amount: 50
- Date: Today
- Category: Food & Dining
- Description: Lunch

---

### ✅ Step 4: Set a Budget

1. Go to **"Budgets"** page
2. Select **Month & Year** (top of page)
3. Click **"+ Set Budget"** button
4. Select:
   - **Category:** Food & Dining (or any expense category)
   - **Budget Amount:** 3000
5. Click **"Set Budget"**
6. ✅ See progress bar showing spending!

---

### ✅ Step 5: Change Currency

1. Look at **sidebar** (left side)
2. Under your email, see currency dropdown (🇺🇸 USD)
3. **Click it** → Select a currency:
   - 🇻🇳 VND → All amounts show in ₫
   - 🇪🇺 EUR → All amounts show in €
   - 🇯🇵 JPY → All amounts show in ¥
4. ✅ See all numbers update instantly!

---

### ✅ Step 6: View Reports

1. Go to **"Reports"** page
2. See charts:
   - Total Income/Expense cards
   - Monthly trends (6 months)
   - Income breakdown (pie chart)
   - Expense categories (bar chart)
3. Click **"Export CSV"** to download data

---

### ✅ Step 7: Test Features

**Add Category:**
1. Go to "Categories"
2. Click "+ Add Category"
3. Name: Coffee
4. Type: Expense
5. Color: Choose any
6. Create → Done!

**Edit Transaction:**
1. Go to "Transactions"
2. Click ✏️ (edit icon)
3. Change amount/date/category
4. Update → Done!

**Delete Transaction:**
1. Click 🗑️ (delete icon)
2. Confirm
3. Deleted!

**Try Remember Me:**
1. Logout (bottom of sidebar)
2. Go to login page
3. Tick "Remember me"
4. Login
5. Logout again → Email pre-filled next time!

---

## 🔐 Test Password Reset

1. Go to **Login** page
2. Click **"Forgot password?"**
3. Enter your email
4. Click "Send Reset Link"
5. **Check Render Logs:**
   - Go to: https://dashboard.render.com
   - Select: aurora-ledger-backend
   - Tab: Logs
   - Find: "PASSWORD RESET REQUESTED"
   - Copy the reset URL
6. **Open URL** in browser
7. Enter new password → Reset!

---

## 🐛 If Something Doesn't Work

### Frontend Not Loading
- Check: https://vercel.com/dashboard
- See if deployment succeeded
- Check deployment logs for errors

### Backend API Errors
- Check: https://dashboard.render.com
- Service should be "Live" (green dot)
- Check Logs tab for errors
- First request after sleep takes 30-60s

### Currency Not Changing
- Make sure you're logged in
- Currency selector is in sidebar
- Refresh page after changing
- Check browser console (F12) for errors

### Can't Add Transaction
- Check all fields are filled
- Amount must be > 0
- Date must be selected
- Category is optional

### Can't Set Budget
- Only works for **expense categories**
- Amount must be > 0
- Month/Year must be selected

---

## 📊 What You Should See

### Dashboard
- **3 stat cards:** Balance, Income, Expenses
- **Pie chart:** Expense breakdown
- **List:** Recent 5 transactions
- **Categories:** Top spending categories

### Transactions
- **Table:** All your transactions
- **Filters:** Type, Category, Date range
- **Buttons:** Add, Edit, Delete, Export
- **Color coding:** Green (income), Red (expense)

### Budgets
- **Overall progress:** Total budget vs spent
- **Per category:** Progress bars
- **Alerts:** Yellow (80%), Red (100%)

### Reports
- **Line chart:** 6-month trends
- **Pie charts:** Income & Expense breakdown
- **Bar chart:** Top spending categories
- **Export:** Download CSV

---

## 🎯 Key Features to Test

### Multi-Currency (29 currencies)
- [x] USD → $ (dollar sign before)
- [x] VND → ₫ (dong sign after)
- [x] EUR → € (euro sign before)
- [x] JPY → ¥ (yen sign after)
- [x] All amounts convert automatically

### Security
- [x] Can't access dashboard without login
- [x] Each user sees only their data
- [x] Logout clears session
- [x] Token expires after 7 days

### UI/UX
- [x] Responsive (works on mobile)
- [x] Toast notifications
- [x] Loading states
- [x] Confirmation dialogs
- [x] Error messages

---

## ⏰ Performance

**Expected Response Times:**
- Login/Register: < 1 second
- Load dashboard: 1-2 seconds
- Add transaction: < 1 second
- Change currency: < 1 second
- Load reports: 2-3 seconds (charts)

**First Request After Sleep (Render free tier):**
- May take 30-60 seconds to wake up
- Subsequent requests are fast

---

## 💡 Tips

1. **Add transactions regularly** - Best way to track finances
2. **Set realistic budgets** - Start high, reduce gradually
3. **Check reports monthly** - Understand spending patterns
4. **Use categories** - Better organization and analytics
5. **Try different currencies** - See how conversion works
6. **Export CSV** - Backup your data regularly

---

## 📞 Need Help?

**If you find bugs:**
1. Open browser console (F12)
2. Check for error messages
3. Screenshot the error
4. Report on GitHub Issues

**Common Issues:**
- Backend sleeping (Render free tier) - Wait 60s
- Token expired - Login again
- CORS error - Check environment variables
- 404 errors - Redeploy frontend (Vercel)

---

## 🎉 Enjoy Aurora Ledger!

**Live Site:** https://aurora-ledger.vercel.app

Start managing your finances today! 💰

---

**Last Updated:** October 27, 2025

