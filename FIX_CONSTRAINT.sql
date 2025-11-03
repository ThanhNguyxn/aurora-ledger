-- Fix constraint to allow NULL or valid roles

-- Drop old constraint
ALTER TABLE family_invite_codes 
DROP CONSTRAINT IF EXISTS family_invite_codes_role_check;

-- Add new constraint that allows NULL OR valid roles
ALTER TABLE family_invite_codes
ADD CONSTRAINT family_invite_codes_role_check 
CHECK (role IS NULL OR role IN ('manager', 'contributor', 'observer'));

-- Verify
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'family_invite_codes' 
AND column_name = 'role';

