# 🔄 Migration Guide - Amount Limit Update

## Overview
This migration increases the maximum amount limit from **9,999,999,999.99** to **999,999,999,999.99** for better support of large financial transactions.

## What Changed?
- **Database**: `amount` column changed from `DECIMAL(12, 2)` to `DECIMAL(15, 2)`
- **Backend**: Validation updated to accept amounts up to 999,999,999,999.99
- **Frontend**: Input fields now support larger numbers with `step="any"`

## How to Run Migration

### For Existing Database (Production/Development)
```bash
cd backend
npm run migrate:amount
```

### For New Installation
The migration is already included in the main migrate script:
```bash
cd backend
npm run migrate
```

## Verification
After running the migration, you can verify:

1. Check database schema:
```sql
\d transactions
\d budgets
```

2. Look for: `amount | numeric(15,2) | not null`

## Rollback (if needed)
If you need to rollback (not recommended if you have large amounts stored):
```sql
ALTER TABLE transactions ALTER COLUMN amount TYPE DECIMAL(12, 2);
ALTER TABLE budgets ALTER COLUMN amount TYPE DECIMAL(12, 2);
```

## Notes
- ✅ Safe to run on existing databases (no data loss)
- ✅ Works with PostgreSQL
- ✅ Backward compatible with existing data
- ⚠️ Make sure to backup your database before running migrations in production

