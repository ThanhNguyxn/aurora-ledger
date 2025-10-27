import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';

const router = express.Router();

// Store reset tokens in memory (for production, use database or Redis)
const resetTokens = new Map();

// Request password reset
router.post('/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      // Check if user exists
      const userResult = await pool.query(
        'SELECT id, email, full_name FROM users WHERE email = $1',
        [email]
      );

      if (userResult.rows.length === 0) {
        // Don't reveal if email exists or not for security
        return res.json({ message: 'If your email is registered, you will receive a reset link.' });
      }

      const user = userResult.rows[0];

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // 1 hour

      // Store token (in production, save to database)
      resetTokens.set(resetToken, {
        userId: user.id,
        email: user.email,
        expiry: resetTokenExpiry
      });

      // In production, send email here
      // For now, we'll return the token in response (DEV ONLY!)
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      console.log('==============================================');
      console.log('PASSWORD RESET REQUESTED');
      console.log(`Email: ${user.email}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log('==============================================');

      // TODO: Send email with nodemailer
      // For now, return success
      res.json({
        message: 'If your email is registered, you will receive a reset link.',
        // DEV ONLY - remove in production
        devResetUrl: resetUrl
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Reset password with token
router.post('/reset-password',
  [
    body('token').notEmpty(),
    body('newPassword').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { token, newPassword } = req.body;

      // Verify token
      const tokenData = resetTokens.get(token);

      if (!tokenData) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      if (Date.now() > tokenData.expiry) {
        resetTokens.delete(token);
        return res.status(400).json({ error: 'Reset token has expired' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await pool.query(
        'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [hashedPassword, tokenData.userId]
      );

      // Delete used token
      resetTokens.delete(token);

      console.log(`Password reset successful for user ID: ${tokenData.userId}`);

      res.json({ message: 'Password reset successfully' });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;

