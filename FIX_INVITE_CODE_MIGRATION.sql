-- Fix invite code migration issue
-- Run this on Neon SQL Editor if getting 500 error when creating invite codes

-- Step 1: Drop existing constraint if exists (ignore error if not exists)
ALTER TABLE family_invite_codes 
DROP CONSTRAINT IF EXISTS family_invite_codes_role_check;

-- Step 2: Ensure role column exists with correct settings
-- If column already exists, this will be skipped
ALTER TABLE family_invite_codes 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'contributor';

-- Step 3: Update any NULL values
UPDATE family_invite_codes 
SET role = 'contributor' 
WHERE role IS NULL;

-- Step 4: Add constraint (fresh)
ALTER TABLE family_invite_codes
ADD CONSTRAINT family_invite_codes_role_check 
CHECK (role IN ('manager', 'contributor', 'observer'));

-- Step 5: Verify - Check if column exists
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'family_invite_codes' 
AND column_name = 'role';

-- Should return:
-- column_name: role
-- data_type: character varying
-- column_default: 'contributor'::character varying
-- is_nullable: YES

