import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { sendPasswordResetEmail } from '../utils/email.js';

const router = express.Router();

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
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

      // Delete any existing reset tokens for this user
      await pool.query(
        'DELETE FROM password_resets WHERE user_id = $1',
        [user.id]
      );

      // Store token in database
      await pool.query(
        'INSERT INTO password_resets (user_id, token, expires_at) VALUES ($1, $2, $3)',
        [user.id, resetToken, expiresAt]
      );

      // Generate reset URL
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      console.log('==============================================');
      console.log('PASSWORD RESET REQUESTED');
      console.log(`Email: ${user.email}`);
      console.log(`User ID: ${user.id}`);
      console.log(`Expires: ${expiresAt.toISOString()}`);
      console.log('==============================================');

      // Always return reset URL (email optional)
      res.json({
        message: 'Password reset link generated successfully',
        resetUrl: resetUrl, // Always include for direct display
        expiresIn: '1 hour'
      });

      // Try to send email asynchronously (optional - doesn't block if fails)
      sendPasswordResetEmail(user.email, resetUrl, user.full_name)
        .then(sent => {
          if (sent) {
            console.log(`✅ Reset email sent to: ${user.email}`);
          } else {
            console.log(`⚠️ Email not configured - User will use on-screen link`);
          }
        })
        .catch(err => {
          console.error('Email send failed (non-critical):', err.message);
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

      // Find and verify token from database
      const tokenResult = await pool.query(
        `SELECT pr.*, u.email 
         FROM password_resets pr
         JOIN users u ON pr.user_id = u.id
         WHERE pr.token = $1`,
        [token]
      );

      if (tokenResult.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      const tokenData = tokenResult.rows[0];

      // Check if token has expired
      if (new Date() > new Date(tokenData.expires_at)) {
        // Delete expired token
        await pool.query('DELETE FROM password_resets WHERE id = $1', [tokenData.id]);
        return res.status(400).json({ error: 'Reset token has expired' });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await pool.query(
        'UPDATE users SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [hashedPassword, tokenData.user_id]
      );

      // Delete used token
      await pool.query('DELETE FROM password_resets WHERE id = $1', [tokenData.id]);

      console.log(`✅ Password reset successful for: ${tokenData.email} (User ID: ${tokenData.user_id})`);

      res.json({ message: 'Password reset successfully' });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;

