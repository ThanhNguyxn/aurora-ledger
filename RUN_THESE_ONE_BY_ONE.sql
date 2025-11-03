-- ========================================
-- RUN THESE QUERIES ONE BY ONE
-- Copy each query separately and click Run
-- ========================================

-- STEP 1: Fix invite code constraint
-- Copy this entire block, paste, Run:
ALTER TABLE family_invite_codes DROP CONSTRAINT IF EXISTS family_invite_codes_role_check;
ALTER TABLE family_invite_codes ADD CONSTRAINT family_invite_codes_role_check CHECK (role IS NULL OR role IN ('manager', 'contributor', 'observer'));


-- STEP 2: Add transaction 1 (Salary October)
-- Copy this, paste, Run:
INSERT INTO transactions (user_id, type, amount, currency, description, transaction_date) VALUES (4, 'income', 5000, 'USD', 'Monthly Salary - October', '2024-10-01');


-- STEP 3: Add transaction 2 (Salary September)
-- Copy this, paste, Run:
INSERT INTO transactions (user_id, type, amount, currency, description, transaction_date) VALUES (4, 'income', 5000, 'USD', 'Monthly Salary - September', '2024-09-01');


-- STEP 4: Add transaction 3 (Groceries)
-- Copy this, paste, Run:
INSERT INTO transactions (user_id, type, amount, currency, description, transaction_date) VALUES (4, 'expense', 800, 'USD', 'Grocery shopping', '2024-10-28');


-- STEP 5: Add transaction 4 (Gas)
-- Copy this, paste, Run:
INSERT INTO transactions (user_id, type, amount, currency, description, transaction_date) VALUES (4, 'expense', 120, 'USD', 'Gas refill', '2024-10-22');


-- STEP 6: Add transaction 5 (Shopping)
-- Copy this, paste, Run:
INSERT INTO transactions (user_id, type, amount, currency, description, transaction_date) VALUES (4, 'expense', 250, 'USD', 'New shoes', '2024-10-20');


-- STEP 7: Add transaction 6 (Bills)
-- Copy this, paste, Run:
INSERT INTO transactions (user_id, type, amount, currency, description, transaction_date) VALUES (4, 'expense', 150, 'USD', 'Electricity bill', '2024-10-15');


-- STEP 8: Add goal 1 (Emergency Fund)
-- Copy this, paste, Run:
INSERT INTO saving_goals (user_id, name, target_amount, current_amount, currency, deadline, icon, priority, is_completed) VALUES (4, 'Emergency Fund', 10000, 6500, 'USD', '2025-12-31', '🛡️', 'high', false);


-- STEP 9: Add goal 2 (New Car)
-- Copy this, paste, Run:
INSERT INTO saving_goals (user_id, name, target_amount, current_amount, currency, deadline, icon, priority, is_completed) VALUES (4, 'New Car', 25000, 8000, 'USD', '2025-06-30', '🚗', 'high', false);


-- DONE! ✅
-- Check results:
SELECT COUNT(*) FROM transactions WHERE user_id = 4;
SELECT COUNT(*) FROM saving_goals WHERE user_id = 4;

