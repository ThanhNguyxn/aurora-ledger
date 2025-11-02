import express from 'express';
import pool from '../config/database.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all families for current user
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await pool.query(
      `SELECT 
         f.id, f.name, f.description, f.created_at, f.updated_at,
         u.full_name as created_by_name, u.email as created_by_email,
         fm.role, fm.status, fm.joined_at,
         COUNT(DISTINCT fm2.id) FILTER (WHERE fm2.status = 'active') as member_count
       FROM families f
       INNER JOIN family_members fm ON f.id = fm.family_id
       LEFT JOIN users u ON f.created_by = u.id
       LEFT JOIN family_members fm2 ON f.id = fm2.family_id
       WHERE fm.user_id = $1
       GROUP BY f.id, f.name, f.description, f.created_at, f.updated_at,
                u.full_name, u.email, fm.role, fm.status, fm.joined_at
       ORDER BY f.created_at DESC`,
      [userId]
    );

    res.json({ families: rows });
  } catch (error) {
    console.error('Error fetching families:', error);
    res.status(500).json({ error: 'Failed to fetch families' });
  }
});

// Get specific family details
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is member
    const { rows: memberCheck } = await pool.query(
      'SELECT role, status FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (memberCheck.length === 0) {
      return res.status(403).json({ error: 'You are not a member of this family' });
    }

    // Get family details
    const { rows } = await pool.query(
      `SELECT 
         f.id, f.name, f.description, f.created_at, f.updated_at,
         u.full_name as created_by_name, u.email as created_by_email
       FROM families f
       LEFT JOIN users u ON f.created_by = u.id
       WHERE f.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Family not found' });
    }

    // Get members
    const { rows: members } = await pool.query(
      `SELECT 
         fm.id, fm.user_id, fm.role, fm.status, fm.joined_at, fm.invited_at,
         u.full_name, u.email,
         inviter.full_name as invited_by_name
       FROM family_members fm
       INNER JOIN users u ON fm.user_id = u.id
       LEFT JOIN users inviter ON fm.invited_by = inviter.id
       WHERE fm.family_id = $1
       ORDER BY 
         CASE fm.role 
           WHEN 'owner' THEN 1 
           WHEN 'admin' THEN 2 
           WHEN 'member' THEN 3 
           ELSE 4 
         END,
         fm.joined_at ASC`,
      [id]
    );

    res.json({
      family: rows[0],
      members,
      currentUserRole: memberCheck[0].role,
      currentUserStatus: memberCheck[0].status
    });
  } catch (error) {
    console.error('Error fetching family details:', error);
    res.status(500).json({ error: 'Failed to fetch family details' });
  }
});

// Create new family
router.post('/', requireAuth, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const userId = req.user.id;
    const { name, description } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Family name is required' });
    }

    await client.query('BEGIN');

    // Create family
    const { rows: familyRows } = await client.query(
      `INSERT INTO families (name, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name.trim(), description?.trim() || null, userId]
    );

    const family = familyRows[0];

    // Add creator as owner
    await client.query(
      `INSERT INTO family_members (family_id, user_id, role, status, joined_at)
       VALUES ($1, $2, 'owner', 'active', CURRENT_TIMESTAMP)`,
      [family.id, userId]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Family created successfully',
      family
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating family:', error);
    res.status(500).json({ error: 'Failed to create family' });
  } finally {
    client.release();
  }
});

// Update family
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, description } = req.body;

    // Check if user is owner or admin
    const { rows: memberCheck } = await pool.query(
      'SELECT role FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (memberCheck.length === 0 || !['owner', 'admin'].includes(memberCheck[0].role)) {
      return res.status(403).json({ error: 'Only owners and admins can update family details' });
    }

    const { rows } = await pool.query(
      `UPDATE families 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description)
       WHERE id = $3
       RETURNING *`,
      [name?.trim(), description?.trim(), id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Family not found' });
    }

    res.json({
      message: 'Family updated successfully',
      family: rows[0]
    });
  } catch (error) {
    console.error('Error updating family:', error);
    res.status(500).json({ error: 'Failed to update family' });
  }
});

// Delete family (owner only)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is owner
    const { rows: memberCheck } = await pool.query(
      'SELECT role FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (memberCheck.length === 0 || memberCheck[0].role !== 'owner') {
      return res.status(403).json({ error: 'Only the owner can delete the family' });
    }

    await pool.query('DELETE FROM families WHERE id = $1', [id]);

    res.json({ message: 'Family deleted successfully' });
  } catch (error) {
    console.error('Error deleting family:', error);
    res.status(500).json({ error: 'Failed to delete family' });
  }
});

// Invite member to family
router.post('/:id/invite', requireAuth, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { email, role = 'member' } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!['member', 'admin', 'viewer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if current user can invite
    const { rows: memberCheck } = await pool.query(
      'SELECT role FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (memberCheck.length === 0 || !['owner', 'admin'].includes(memberCheck[0].role)) {
      return res.status(403).json({ error: 'Only owners and admins can invite members' });
    }

    await client.query('BEGIN');

    // Find user by email
    const { rows: userRows } = await client.query(
      'SELECT id, email, full_name FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (userRows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'User not found with this email' });
    }

    const invitedUser = userRows[0];

    // Check if already a member
    const { rows: existingMember } = await client.query(
      'SELECT status FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, invitedUser.id]
    );

    if (existingMember.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: existingMember[0].status === 'pending' 
          ? 'User already has a pending invitation'
          : 'User is already a member'
      });
    }

    // Create invitation
    await client.query(
      `INSERT INTO family_members (family_id, user_id, role, invited_by, status)
       VALUES ($1, $2, $3, $4, 'pending')`,
      [id, invitedUser.id, role, userId]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Invitation sent successfully',
      invitedUser: {
        id: invitedUser.id,
        email: invitedUser.email,
        full_name: invitedUser.full_name
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inviting member:', error);
    res.status(500).json({ error: 'Failed to send invitation' });
  } finally {
    client.release();
  }
});

// Accept/Decline invitation
router.post('/:id/invitation/:action', requireAuth, async (req, res) => {
  try {
    const { id, action } = req.params;
    const userId = req.user.id;

    if (!['accept', 'decline'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Check if invitation exists
    const { rows: inviteCheck } = await pool.query(
      'SELECT * FROM family_members WHERE family_id = $1 AND user_id = $2 AND status = $3',
      [id, userId, 'pending']
    );

    if (inviteCheck.length === 0) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    if (action === 'accept') {
      await pool.query(
        `UPDATE family_members 
         SET status = 'active', joined_at = CURRENT_TIMESTAMP
         WHERE family_id = $1 AND user_id = $2`,
        [id, userId]
      );
      res.json({ message: 'Invitation accepted successfully' });
    } else {
      await pool.query(
        'DELETE FROM family_members WHERE family_id = $1 AND user_id = $2',
        [id, userId]
      );
      res.json({ message: 'Invitation declined' });
    }
  } catch (error) {
    console.error('Error handling invitation:', error);
    res.status(500).json({ error: 'Failed to handle invitation' });
  }
});

// Get pending invitations for current user
router.get('/invitations/pending', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { rows } = await pool.query(
      `SELECT 
         fm.id, fm.family_id, fm.role, fm.invited_at,
         f.name as family_name, f.description as family_description,
         inviter.full_name as invited_by_name, inviter.email as invited_by_email
       FROM family_members fm
       INNER JOIN families f ON fm.family_id = f.id
       LEFT JOIN users inviter ON fm.invited_by = inviter.id
       WHERE fm.user_id = $1 AND fm.status = 'pending'
       ORDER BY fm.invited_at DESC`,
      [userId]
    );

    res.json({ invitations: rows });
  } catch (error) {
    console.error('Error fetching invitations:', error);
    res.status(500).json({ error: 'Failed to fetch invitations' });
  }
});

// Update member role (owner/admin only)
router.put('/:id/members/:memberId/role', requireAuth, async (req, res) => {
  try {
    const { id, memberId } = req.params;
    const userId = req.user.id;
    const { role } = req.body;

    if (!['member', 'admin', 'viewer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if current user is owner or admin
    const { rows: currentUserCheck } = await pool.query(
      'SELECT role FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (currentUserCheck.length === 0 || !['owner', 'admin'].includes(currentUserCheck[0].role)) {
      return res.status(403).json({ error: 'Only owners and admins can change roles' });
    }

    // Check target member
    const { rows: targetMemberCheck } = await pool.query(
      'SELECT role FROM family_members WHERE id = $1 AND family_id = $2',
      [memberId, id]
    );

    if (targetMemberCheck.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    if (targetMemberCheck[0].role === 'owner') {
      return res.status(403).json({ error: 'Cannot change owner role' });
    }

    await pool.query(
      'UPDATE family_members SET role = $1 WHERE id = $2',
      [role, memberId]
    );

    res.json({ message: 'Member role updated successfully' });
  } catch (error) {
    console.error('Error updating member role:', error);
    res.status(500).json({ error: 'Failed to update member role' });
  }
});

// Remove member from family
router.delete('/:id/members/:memberId', requireAuth, async (req, res) => {
  try {
    const { id, memberId } = req.params;
    const userId = req.user.id;

    // Get current user role
    const { rows: currentUserCheck } = await pool.query(
      'SELECT role, id as current_member_id FROM family_members WHERE family_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (currentUserCheck.length === 0) {
      return res.status(403).json({ error: 'You are not a member of this family' });
    }

    const currentUserRole = currentUserCheck[0].role;
    const currentMemberId = currentUserCheck[0].current_member_id;

    // Get target member
    const { rows: targetMemberCheck } = await pool.query(
      'SELECT role, user_id FROM family_members WHERE id = $1 AND family_id = $2',
      [memberId, id]
    );

    if (targetMemberCheck.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const targetRole = targetMemberCheck[0].role;
    const targetUserId = targetMemberCheck[0].user_id;

    // Members can only remove themselves
    if (currentMemberId === parseInt(memberId)) {
      if (targetRole === 'owner') {
        return res.status(403).json({ error: 'Owner cannot leave the family. Transfer ownership or delete the family.' });
      }
      await pool.query('DELETE FROM family_members WHERE id = $1', [memberId]);
      return res.json({ message: 'You have left the family' });
    }

    // Only owner/admin can remove others
    if (!['owner', 'admin'].includes(currentUserRole)) {
      return res.status(403).json({ error: 'Only owners and admins can remove members' });
    }

    // Cannot remove owner
    if (targetRole === 'owner') {
      return res.status(403).json({ error: 'Cannot remove the owner' });
    }

    await pool.query('DELETE FROM family_members WHERE id = $1', [memberId]);

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error removing member:', error);
    res.status(500).json({ error: 'Failed to remove member' });
  }
});

export default router;
