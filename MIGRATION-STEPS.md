# 🔧 Migration Steps - IMPORTANT!

## ⚠️ Error: "Failed to create transaction"

### Cause:
The database doesn't have the `currency` column yet in the `transactions` table.

---

## ✅ Solution: Run Migration

### Step 1: Access Render Dashboard

1. Go to: https://dashboard.render.com/
2. Click on your backend service: **aurora-ledger-backend**
3. Click **"Shell"** tab (top right)

### Step 2: Run Migration Command

```bash
cd backend
npm run migrate:currency
```

### Step 3: Verify

You should see:
```
🔄 Adding currency column to transactions table...
✅ Added currency column to transactions
✅ Created index on currency column
🎉 Currency column migration completed!
```

### Step 4: Test

1. Go back to Aurora Ledger app
2. Try creating a transaction again
3. Should work now! ✅

---

## 🗃️ What This Does

**Before:**
```sql
transactions:
  amount: 100000
  -- No currency column ❌
```

**After:**
```sql
transactions:
  amount: 100000
  currency: 'VND'  ✅
```

---

## 📋 All Migrations Needed

If starting fresh database, run in order:

```bash
# 1. Main tables
npm run migrate

# 2. Amount limit increase
npm run migrate:amount

# 3. Currency support (NEW!)
npm run migrate:currency
```

Or if already have tables:

```bash
# Just run the new one
npm run migrate:currency
```

---

## 🔍 Check if Migration Already Done

```sql
-- In Render Shell, connect to database:
psql $DATABASE_URL

-- Check if currency column exists:
\d transactions

-- Look for:
-- currency | character varying(3) | default 'USD'::character varying
```

If you see the `currency` column, migration is done! ✅

---

## 💡 Quick Fix

If you can't run migration immediately:

### Temporary: Use old version without currency

Rollback the transaction form to not send currency:

```javascript
// In TransactionModal, remove currency from data
const data = {
  type: formData.type,
  amount: amount,
  // currency: formData.currency,  // Comment this
  transaction_date: formData.transaction_date,
  category_id: formData.category_id ? parseInt(formData.category_id) : null,
  description: formData.description || ''
};
```

But better to run migration! 🚀

---

## 📝 Summary

**Problem:** Failed to create transaction  
**Cause:** Missing `currency` column in database  
**Solution:** Run `npm run migrate:currency` on Render Shell  
**Time:** < 1 minute  
**Data loss:** None (safe migration)  

---

**After migration, multi-currency transactions will work perfectly! 💱✨**

