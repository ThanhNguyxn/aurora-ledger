# ⚠️ DATABASE MIGRATION REQUIRED

## New Feature: Role Selection for Invite Codes

Invite codes now support **role selection** - just like email invites!

When creating an invite code, you can choose:
- 👨‍💼 **Manager** - Can manage budgets & members
- 👥 **Contributor** - Can add transactions (default)
- 👁️ **Observer** - View only

All users joining via that code will get the selected role.

---

## 🗄️ Database Migration Steps

### 1. Go to Neon PostgreSQL Dashboard

Visit: https://console.neon.tech/

Select your **Aurora Ledger** project

### 2. Open SQL Editor

Click **SQL Editor** in the left sidebar

### 3. Run Migration SQL

Copy and paste the following SQL:

```sql
-- Add role column to family_invite_codes table
ALTER TABLE family_invite_codes 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'contributor';

-- Add check constraint to ensure valid roles
ALTER TABLE family_invite_codes
ADD CONSTRAINT family_invite_codes_role_check 
CHECK (role IN ('manager', 'contributor', 'observer'));

-- Update existing codes to have contributor role
UPDATE family_invite_codes 
SET role = 'contributor' 
WHERE role IS NULL;

COMMENT ON COLUMN family_invite_codes.role IS 'Role that will be assigned to users joining via this invite code';
```

### 4. Click "Run" Button

Wait for success message: ✅ Query executed successfully

### 5. Verify Migration

Run this query to check:

```sql
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'family_invite_codes' 
AND column_name = 'role';
```

You should see:
- `column_name`: role
- `data_type`: character varying
- `column_default`: 'contributor'::character varying

---

## ✅ After Migration

1. **Deploy Backend** - Render will auto-deploy from GitHub push
2. **Deploy Frontend** - Vercel will auto-deploy from GitHub push
3. **Test** - Create new invite code with role selector

---

## 🎯 What Changes

### Before:
- Invite codes always create **contributor** members
- No way to choose role when generating code

### After:
- **Choose role** when generating invite code
- Dropdown with Manager/Contributor/Observer
- Role badge displayed in invite codes list
- Toast shows role when creating code

---

## 📝 Notes

- **Existing codes**: Will default to `contributor` role
- **Backward compatible**: Old codes will still work
- **No downtime**: Migration is safe to run on live database
- **Rollback**: If needed, just drop the column:
  ```sql
  ALTER TABLE family_invite_codes DROP COLUMN role;
  ```

---

**Created:** November 3, 2025  
**Migration File:** `backend/migrations/add_role_to_invite_codes.sql`

