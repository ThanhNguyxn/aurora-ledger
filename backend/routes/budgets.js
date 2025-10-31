import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware);

// Get budgets for a specific month/year
router.get('/', async (req, res) => {
  try {
    const { month, year } = req.query;
    
    if (!month || !year) {
      return res.status(400).json({ error: 'Month and year are required' });
    }

    const result = await pool.query(
      `SELECT b.*, c.name as category_name, c.color as category_color, c.icon as category_icon,
       COALESCE(
         (SELECT SUM(amount) FROM transactions 
          WHERE user_id = $1 
          AND category_id = b.category_id 
          AND type = 'expense'
          AND EXTRACT(MONTH FROM transaction_date) = $2
          AND EXTRACT(YEAR FROM transaction_date) = $3
         ), 0
       ) as spent
       FROM budgets b
       LEFT JOIN categories c ON b.category_id = c.id
       WHERE b.user_id = $1 AND b.month = $2 AND b.year = $3
       ORDER BY c.name`,
      [req.user.id, month, year]
    );

    res.json(result.rows);
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
    body('year').isInt({ min: 2000 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { category_id, amount, month, year } = req.body;

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

      const result = await pool.query(
        `INSERT INTO budgets (user_id, category_id, amount, month, year)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id, category_id, month, year)
         DO UPDATE SET amount = $3, updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [req.user.id, category_id, amount, month, year]
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

