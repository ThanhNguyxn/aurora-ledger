import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import api from '../lib/api';
import toast from 'react-hot-toast';
import {
  Users, Plus, Mail, Shield, Trash2, Settings,
  UserPlus, X, Check, Crown, UserCheck, Eye, AlertTriangle
} from 'lucide-react';

export default function Family() {
  const { t } = useTranslation();
  
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [familyDetails, setFamilyDetails] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [familiesRes, invitationsRes] = await Promise.all([
        api.get('/families'),
        api.get('/families/invitations/pending')
      ]);
      setFamilies(familiesRes.data.families);
      setInvitations(invitationsRes.data.invitations);
      
      if (familiesRes.data.families.length > 0 && !selectedFamily) {
        selectFamily(familiesRes.data.families[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load families');
    } finally {
      setLoading(false);
    }
  };

  const selectFamily = async (familyId) => {
    try {
      const res = await api.get(`/families/${familyId}`);
      setFamilyDetails(res.data);
      setSelectedFamily(familyId);
    } catch (error) {
      console.error('Error fetching family details:', error);
      toast.error('Failed to load family details');
    }
  };

  const handleCreateFamily = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await api.post('/families', {
        name: formData.get('name'),
        description: formData.get('description')
      });
      toast.success('Family created successfully!');
      setShowCreateModal(false);
      fetchData();
    } catch (error) {
      console.error('Error creating family:', error);
      toast.error(error.response?.data?.error || 'Failed to create family');
    }
  };

  const handleInviteMember = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await api.post(`/families/${selectedFamily}/invite`, {
        email: formData.get('email'),
        role: formData.get('role')
      });
      toast.success('Invitation sent successfully!');
      setShowInviteModal(false);
      selectFamily(selectedFamily);
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error(error.response?.data?.error || 'Failed to send invitation');
    }
  };

  const handleInvitationResponse = async (familyId, action) => {
    try {
      await api.post(`/families/${familyId}/invitation/${action}`);
      toast.success(`Invitation ${action}ed successfully!`);
      fetchData();
    } catch (error) {
      console.error(`Error ${action}ing invitation:`, error);
      toast.error(`Failed to ${action} invitation`);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    
    try {
      await api.delete(`/families/${selectedFamily}/members/${memberId}`);
      toast.success('Member removed successfully!');
      selectFamily(selectedFamily);
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error(error.response?.data?.error || 'Failed to remove member');
    }
  };

  const handleChangeRole = async (memberId, newRole) => {
    try {
      await api.put(`/families/${selectedFamily}/members/${memberId}/role`, {
        role: newRole
      });
      toast.success('Role updated successfully!');
      selectFamily(selectedFamily);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(error.response?.data?.error || 'Failed to update role');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'member': return <UserCheck className="h-4 w-4 text-green-500" />;
      case 'viewer': return <Eye className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'owner': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'admin': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'member': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Family & Group Sharing
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage shared budgets, goals, and expenses with your family or group
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Family
          </button>
        </div>

        {/* Pending Invitations */}
        {invitations.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                Pending Invitations ({invitations.length})
              </h3>
            </div>
            <div className="space-y-2">
              {invitations.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {invite.family_name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Invited by {invite.invited_by_name} as {invite.role}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInvitationResponse(invite.family_id, 'accept')}
                      className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleInvitationResponse(invite.family_id, 'decline')}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {families.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Families Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a family to start sharing budgets and goals
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Family
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Family List */}
            <div className="lg:col-span-1 space-y-3">
              {families.map((family) => (
                <button
                  key={family.id}
                  onClick={() => selectFamily(family.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedFamily === family.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {family.name}
                      </h3>
                      {family.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {family.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className={`px-2 py-1 rounded-full ${getRoleBadgeColor(family.role)}`}>
                          {family.role}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {family.member_count} members
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Family Details */}
            {familyDetails && (
              <div className="lg:col-span-2 space-y-6">
                {/* Family Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {familyDetails.family.name}
                      </h2>
                      {familyDetails.family.description && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {familyDetails.family.description}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Created by {familyDetails.family.created_by_name}
                      </p>
                    </div>
                    {['owner', 'admin'].includes(familyDetails.currentUserRole) && (
                      <button
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <UserPlus className="h-4 w-4" />
                        Invite
                      </button>
                    )}
                  </div>
                </div>

                {/* Members List */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Members ({familyDetails.members.length})
                  </h3>
                  <div className="space-y-3">
                    {familyDetails.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {member.full_name?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {member.full_name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {member.email}
                            </p>
                            {member.status === 'pending' && (
                              <span className="text-xs text-yellow-600 dark:text-yellow-400">
                                Pending invitation
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {member.role === 'owner' ? (
                            <span className={`px-3 py-1 rounded-full flex items-center gap-1 ${getRoleBadgeColor(member.role)}`}>
                              {getRoleIcon(member.role)}
                              {member.role}
                            </span>
                          ) : ['owner', 'admin'].includes(familyDetails.currentUserRole) ? (
                            <select
                              value={member.role}
                              onChange={(e) => handleChangeRole(member.id, e.target.value)}
                              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            >
                              <option value="admin">Admin</option>
                              <option value="member">Member</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          ) : (
                            <span className={`px-3 py-1 rounded-full flex items-center gap-1 ${getRoleBadgeColor(member.role)}`}>
                              {getRoleIcon(member.role)}
                              {member.role}
                            </span>
                          )}
                          {member.role !== 'owner' && ['owner', 'admin'].includes(familyDetails.currentUserRole) && (
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create Family Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Create New Family
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleCreateFamily} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Family Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Smith Family"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Our family budget group"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Invite Member
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="member@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  defaultValue="member"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="admin">Admin - Can manage budgets and members</option>
                  <option value="member">Member - Can add transactions and contribute</option>
                  <option value="viewer">Viewer - Can only view data</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
