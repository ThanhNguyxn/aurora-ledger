-- Setup Admin Account and Sample Data for Testing
-- Run this on Neon PostgreSQL

-- ========================================
-- PART 1: Update Admin Account
-- ========================================

-- First, check current user ID
SELECT id, email, full_name, role, created_at 
FROM users 
WHERE email = 'thanhnguyentuan2007@gmail.com';

-- Update admin account to user_id = 1 (if needed)
-- WARNING: This will swap IDs, be careful!

-- Step 1: Temporarily set current user_id 1 to something else (if exists)
UPDATE users SET id = 99999 WHERE id = 1 AND email != 'thanhnguyentuan2007@gmail.com';

-- Step 2: Update admin to id = 1
UPDATE users 
SET id = 1, 
    role = 'admin',
    created_at = '2024-01-15 10:00:00'  -- Set created date to early 2024
WHERE email = 'thanhnguyentuan2007@gmail.com';

-- Step 3: Verify
SELECT id, email, full_name, role, created_at 
FROM users 
WHERE email = 'thanhnguyentuan2007@gmail.com';


-- ========================================
-- PART 2: Add Sample Data (Run after Part 1)
-- ========================================

-- Get the user_id for sample data
DO $$
DECLARE
    admin_user_id INT;
    cat_food_id INT;
    cat_transport_id INT;
    cat_shopping_id INT;
    cat_bills_id INT;
    cat_salary_id INT;
    cat_other_income_id INT;
BEGIN
    -- Get admin user ID
    SELECT id INTO admin_user_id FROM users WHERE email = 'thanhnguyentuan2007@gmail.com';
    
    IF admin_user_id IS NULL THEN
        RAISE EXCEPTION 'Admin user not found';
    END IF;

    -- Get category IDs (assuming default categories exist)
    SELECT id INTO cat_food_id FROM categories WHERE user_id = admin_user_id AND name = 'Food & Dining' LIMIT 1;
    SELECT id INTO cat_transport_id FROM categories WHERE user_id = admin_user_id AND name = 'Transportation' LIMIT 1;
    SELECT id INTO cat_shopping_id FROM categories WHERE user_id = admin_user_id AND name = 'Shopping' LIMIT 1;
    SELECT id INTO cat_bills_id FROM categories WHERE user_id = admin_user_id AND name = 'Bills & Utilities' LIMIT 1;
    SELECT id INTO cat_salary_id FROM categories WHERE user_id = admin_user_id AND name = 'Salary' LIMIT 1;
    SELECT id INTO cat_other_income_id FROM categories WHERE user_id = admin_user_id AND name = 'Other Income' LIMIT 1;

    -- Insert sample transactions (last 6 months)
    -- Income transactions
    INSERT INTO transactions (user_id, type, amount, currency, category_id, description, date) VALUES
    (admin_user_id, 'income', 5000, 'USD', cat_salary_id, 'Monthly Salary - October 2024', '2024-10-01'),
    (admin_user_id, 'income', 5000, 'USD', cat_salary_id, 'Monthly Salary - September 2024', '2024-09-01'),
    (admin_user_id, 'income', 5000, 'USD', cat_salary_id, 'Monthly Salary - August 2024', '2024-08-01'),
    (admin_user_id, 'income', 5000, 'USD', cat_salary_id, 'Monthly Salary - July 2024', '2024-07-01'),
    (admin_user_id, 'income', 5000, 'USD', cat_salary_id, 'Monthly Salary - June 2024', '2024-06-01'),
    (admin_user_id, 'income', 500, 'USD', cat_other_income_id, 'Freelance Project', '2024-09-15'),
    (admin_user_id, 'income', 300, 'USD', cat_other_income_id, 'Bonus', '2024-08-20');

    -- Expense transactions (varied over 6 months)
    INSERT INTO transactions (user_id, type, amount, currency, category_id, description, date) VALUES
    -- October 2024
    (admin_user_id, 'expense', 800, 'USD', cat_food_id, 'Grocery shopping', '2024-10-28'),
    (admin_user_id, 'expense', 45, 'USD', cat_food_id, 'Restaurant dinner', '2024-10-25'),
    (admin_user_id, 'expense', 120, 'USD', cat_transport_id, 'Gas refill', '2024-10-22'),
    (admin_user_id, 'expense', 250, 'USD', cat_shopping_id, 'New shoes', '2024-10-20'),
    (admin_user_id, 'expense', 150, 'USD', cat_bills_id, 'Electricity bill', '2024-10-15'),
    (admin_user_id, 'expense', 80, 'USD', cat_bills_id, 'Internet bill', '2024-10-10'),
    -- September 2024
    (admin_user_id, 'expense', 750, 'USD', cat_food_id, 'Monthly groceries', '2024-09-28'),
    (admin_user_id, 'expense', 100, 'USD', cat_transport_id, 'Gas', '2024-09-20'),
    (admin_user_id, 'expense', 300, 'USD', cat_shopping_id, 'Clothes shopping', '2024-09-15'),
    (admin_user_id, 'expense', 145, 'USD', cat_bills_id, 'Utilities', '2024-09-10'),
    -- August 2024
    (admin_user_id, 'expense', 820, 'USD', cat_food_id, 'Groceries & dining', '2024-08-25'),
    (admin_user_id, 'expense', 150, 'USD', cat_transport_id, 'Car maintenance', '2024-08-18'),
    (admin_user_id, 'expense', 200, 'USD', cat_shopping_id, 'Electronics', '2024-08-12'),
    (admin_user_id, 'expense', 160, 'USD', cat_bills_id, 'Bills', '2024-08-05'),
    -- July 2024
    (admin_user_id, 'expense', 900, 'USD', cat_food_id, 'Food expenses', '2024-07-22'),
    (admin_user_id, 'expense', 130, 'USD', cat_transport_id, 'Transportation', '2024-07-15'),
    (admin_user_id, 'expense', 400, 'USD', cat_shopping_id, 'Summer clothes', '2024-07-08'),
    (admin_user_id, 'expense', 155, 'USD', cat_bills_id, 'Monthly bills', '2024-07-01');

    -- Insert sample budgets
    INSERT INTO budgets (user_id, category_id, amount, currency, period, start_date) VALUES
    (admin_user_id, cat_food_id, 1000, 'USD', 'monthly', '2024-10-01'),
    (admin_user_id, cat_transport_id, 200, 'USD', 'monthly', '2024-10-01'),
    (admin_user_id, cat_shopping_id, 500, 'USD', 'monthly', '2024-10-01'),
    (admin_user_id, cat_bills_id, 300, 'USD', 'monthly', '2024-10-01');

    -- Insert sample goals
    INSERT INTO goals (user_id, name, target_amount, current_amount, currency, target_date, icon, priority, status) VALUES
    (admin_user_id, 'Emergency Fund', 10000, 6500, 'USD', '2025-12-31', 'shield', 'high', 'active'),
    (admin_user_id, 'New Car', 25000, 8000, 'USD', '2025-06-30', 'car', 'high', 'active'),
    (admin_user_id, 'Vacation to Japan', 5000, 2500, 'USD', '2025-03-15', 'plane', 'medium', 'active'),
    (admin_user_id, 'New Laptop', 2000, 1800, 'USD', '2024-12-31', 'laptop', 'medium', 'active');

    -- Insert recurring transactions
    INSERT INTO recurring_transactions (user_id, type, amount, currency, category_id, description, frequency, start_date, is_active) VALUES
    (admin_user_id, 'income', 5000, 'USD', cat_salary_id, 'Monthly Salary', 'monthly', '2024-01-01', true),
    (admin_user_id, 'expense', 150, 'USD', cat_bills_id, 'Electricity Bill', 'monthly', '2024-01-15', true),
    (admin_user_id, 'expense', 80, 'USD', cat_bills_id, 'Internet Bill', 'monthly', '2024-01-10', true),
    (admin_user_id, 'expense', 50, 'USD', cat_food_id, 'Coffee Subscription', 'monthly', '2024-02-01', true);

    RAISE NOTICE 'Sample data created successfully for user %', admin_user_id;
END $$;

-- ========================================
-- Verification Queries
-- ========================================

-- Check user
SELECT id, email, full_name, role, created_at 
FROM users 
WHERE email = 'thanhnguyentuan2007@gmail.com';

-- Check transactions count
SELECT 
    type,
    COUNT(*) as count,
    SUM(amount) as total
FROM transactions
WHERE user_id = (SELECT id FROM users WHERE email = 'thanhnguyentuan2007@gmail.com')
GROUP BY type;

-- Check budgets
SELECT COUNT(*) as budget_count
FROM budgets
WHERE user_id = (SELECT id FROM users WHERE email = 'thanhnguyentuan2007@gmail.com');

-- Check goals
SELECT COUNT(*) as goal_count, SUM(current_amount) as total_saved
FROM goals
WHERE user_id = (SELECT id FROM users WHERE email = 'thanhnguyentuan2007@gmail.com');

-- Check recurring
SELECT COUNT(*) as recurring_count
FROM recurring_transactions
WHERE user_id = (SELECT id FROM users WHERE email = 'thanhnguyentuan2007@gmail.com');

