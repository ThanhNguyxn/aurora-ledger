import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';
import { getExchangeRate, convertCurrency } from '../utils/currency.js';

const router = express.Router();
router.use(authMiddleware);

// Get budgets for a specific month/year
router.get('/', async (req, res) => {
  try {
    const { month, year } = req.query;
    
    if (!month || !year) {
      return res.status(400).json({ error: 'Month and year are required' });
    }

    // Get user's preferred currency
    const userResult = await pool.query(
      'SELECT currency FROM users WHERE id = $1',
      [req.user.id]
    );
    const userCurrency = userResult.rows[0]?.currency || 'USD';

    const result = await pool.query(
      `SELECT 
         b.id,
         b.category_id,
         b.amount,
         b.currency,
         b.month,
         b.year,
         b.created_at,
         b.updated_at,
         c.name as category_name, 
         c.color as category_color, 
         c.icon as category_icon,
         COALESCE(
           (SELECT 
              COALESCE(
                SUM(
                  CASE 
                    WHEN t.currency = $4 THEN t.amount
                    ELSE 0
                  END
                ), 0
              )
            FROM transactions t
            WHERE t.user_id = $1 
            AND t.category_id = b.category_id 
            AND t.type = 'expense'
            AND EXTRACT(MONTH FROM t.transaction_date) = $2
            AND EXTRACT(YEAR FROM t.transaction_date) = $3
           ), 0
         ) as spent_same_currency,
         COALESCE(
           (SELECT 
              json_agg(
                json_build_object(
                  'amount', t.amount,
                  'currency', t.currency
                )
              )
            FROM transactions t
            WHERE t.user_id = $1 
            AND t.category_id = b.category_id 
            AND t.type = 'expense'
            AND t.currency != $4
            AND EXTRACT(MONTH FROM t.transaction_date) = $2
            AND EXTRACT(YEAR FROM t.transaction_date) = $3
           ), '[]'::json
         ) as spent_other_currencies
       FROM budgets b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.user_id = $1 AND b.month = $2 AND b.year = $3
       ORDER BY c.name`,
      [req.user.id, month, year, userCurrency]
    );

    // Budget amount is already in user's currency (converted when saved)
    // Only need to convert spent amounts from other currencies
    const budgetsWithConversion = await Promise.all(
      result.rows.map(async (budget) => {
        // Budget amount is already in user currency, no conversion needed
        const budgetAmount = budget.amount;

        // Calculate total spent (already in user currency + need to convert others)
        let totalSpent = parseFloat(budget.spent_same_currency || 0);
        
        // Convert other currencies
        const otherSpent = budget.spent_other_currencies || [];
        for (const item of otherSpent) {
          if (item && item.currency && item.amount) {
            const rate = await getExchangeRate(item.currency, userCurrency);
            totalSpent += convertCurrency(item.amount, rate);
          }
        }

        return {
          id: budget.id,
          category_id: budget.category_id,
          amount: budgetAmount, // Already in user's currency
          currency: userCurrency,
          month: budget.month,
          year: budget.year,
          category_name: budget.category_name,
          category_color: budget.category_color,
          category_icon: budget.category_icon,
          spent: totalSpent, // Converted to user's currency
          created_at: budget.created_at,
          updated_at: budget.updated_at
        };
      })
    );

    res.json(budgetsWithConversion);
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create or update budget
router.post('/',
  [
    body('category_id').isInt(),
    body('amount').isFloat({ min: 0.01, max: 999999999999.99 }),
    body('month').isInt({ min: 1, max: 12 }),
    body('year').isInt({ min: 2000 }),
    body('input_currency').optional().isString().isLength({ min: 3, max: 3 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { category_id, amount, month, year, input_currency } = req.body;

      // Get user's preferred currency
      const userResult = await pool.query(
        'SELECT currency FROM users WHERE id = $1',
        [req.user.id]
      );
      const userCurrency = userResult.rows[0]?.currency || 'USD';

      // Convert amount from input currency to user's currency
      let finalAmount = amount;
      const inputCurr = input_currency || userCurrency;
      
      if (inputCurr !== userCurrency) {
        const rate = await getExchangeRate(inputCurr, userCurrency);
        finalAmount = convertCurrency(amount, rate);
        console.log(`💱 Converting budget: ${amount} ${inputCurr} → ${finalAmount} ${userCurrency} (rate: ${rate})`);
      }

      // Verify category belongs to user and is expense type
      const catResult = await pool.query(
        'SELECT id, type FROM categories WHERE id = $1 AND user_id = $2',
        [category_id, req.user.id]
      );
      
      if (catResult.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      if (catResult.rows[0].type !== 'expense') {
        return res.status(400).json({ error: 'Budgets can only be set for expense categories' });
      }

      // Save with user's currency
      const result = await pool.query(
        `INSERT INTO budgets (user_id, category_id, amount, month, year, currency)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (user_id, category_id, month, year)
         DO UPDATE SET amount = $3, currency = $6, updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [req.user.id, category_id, finalAmount, month, year, userCurrency]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Create/Update budget error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete budget
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM budgets WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

