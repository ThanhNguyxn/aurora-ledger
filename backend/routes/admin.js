import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0 || result.rows[0].role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users (admin only)
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT 
        id, 
        email, 
        full_name, 
        role, 
        currency,
        created_at,
        updated_at,
        (SELECT COUNT(*) FROM transactions WHERE user_id = users.id) as transaction_count,
        (SELECT COUNT(*) FROM categories WHERE user_id = users.id) as category_count
      FROM users
    `;

    const params = [];
    
    if (search) {
      query += ` WHERE email ILIKE $1 OR full_name ILIKE $1`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM users';
    const countParams = [];
    
    if (search) {
      countQuery += ` WHERE email ILIKE $1 OR full_name ILIKE $1`;
      countParams.push(`%${search}%`);
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      users: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Get user details by ID (admin only)
router.get('/users/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const userResult = await pool.query(`
      SELECT 
        id, 
        email, 
        full_name, 
        role, 
        currency,
        created_at,
        updated_at
      FROM users
      WHERE id = $1
    `, [id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user statistics
    const statsResult = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM transactions WHERE user_id = $1) as transaction_count,
        (SELECT COUNT(*) FROM categories WHERE user_id = $1) as category_count,
        (SELECT COUNT(*) FROM budgets WHERE user_id = $1) as budget_count,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = $1 AND type = 'income') as total_income,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = $1 AND type = 'expense') as total_expense
    `, [id]);

    res.json({
      user: userResult.rows[0],
      stats: statsResult.rows[0]
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ error: 'Failed to get user details' });
  }
});

// Update user role (admin only)
router.put('/users/:id/role',
  authenticateToken,
  isAdmin,
  [body('role').isIn(['user', 'admin'])],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { role } = req.body;

      // Prevent admin from removing their own admin role
      if (parseInt(id) === req.user.userId && role !== 'admin') {
        return res.status(400).json({ error: 'Cannot remove your own admin role' });
      }

      await pool.query(
        'UPDATE users SET role = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [role, id]
      );

      res.json({ message: 'Role updated successfully' });
    } catch (error) {
      console.error('Update role error:', error);
      res.status(500).json({ error: 'Failed to update role' });
    }
  }
);

// Reset user password (admin only)
router.post('/users/:id/reset-password',
  authenticateToken,
  isAdmin,
  [body('newPassword').isLength({ min: 6 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { newPassword } = req.body;

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await pool.query(
        'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [hashedPassword, id]
      );

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Failed to reset password' });
    }
  }
);

// Delete user (admin only)
router.delete('/users/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (parseInt(id) === req.user.userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Check if user exists
    const userCheck = await pool.query('SELECT id FROM users WHERE id = $1', [id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user (cascade will handle related records)
    await pool.query('DELETE FROM users WHERE id = $1', [id]);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get admin stats (admin only)
router.get('/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const statsResult = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM users WHERE role = 'admin') as admin_users,
        (SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '30 days') as new_users_30d,
        (SELECT COUNT(*) FROM transactions) as total_transactions,
        (SELECT COUNT(*) FROM categories) as total_categories,
        (SELECT COUNT(*) FROM budgets) as total_budgets
    `);

    res.json(statsResult.rows[0]);
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

export default router;
