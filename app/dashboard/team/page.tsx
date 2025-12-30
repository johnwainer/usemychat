'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Edit,
  MoreVertical,
  Search,
  Filter,
  Crown,
  Eye,
  UserCog,
  Headphones,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';

interface TeamMember {
  id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'supervisor' | 'agent' | 'viewer';
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  is_active: boolean;
  last_active_at: string | null;
  joined_at: string | null;
  created_at: string;
}

interface TeamInvitation {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'supervisor' | 'agent' | 'viewer';
  invited_by: string;
  token: string;
  expires_at: string;
  created_at: string;
}

const roleConfig = {
  owner: {
    label: 'Propietario',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Acceso completo, puede gestionar facturación y eliminar workspace'
  },
  admin: {
    label: 'Administrador',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Puede gestionar miembros del equipo y todas las configuraciones'
  },
  supervisor: {
    label: 'Supervisor',
    icon: UserCog,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Puede ver todas las conversaciones y gestionar agentes'
  },
  agent: {
    label: 'Agente',
    icon: Headphones,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'Puede manejar conversaciones asignadas'
  },
  viewer: {
    label: 'Observador',
    icon: Eye,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    description: 'Acceso de solo lectura a conversaciones y reportes'
  }
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'supervisor' | 'agent' | 'viewer'>('agent');
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [teamOwner, setTeamOwner] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setCurrentUser(user);

    // Check if user is a team member (not owner)
    const { data: memberData } = await supabase
      .from('team_members')
      .select('role, workspace_owner_id')
      .eq('user_id', user.id)
      .single();

    if (memberData) {
      // User is a team member
      setUserRole(memberData.role);
      setIsOwner(false);

      // Fetch owner profile
      const { data: ownerProfile } = await supabase
        .from('profiles')
        .select('full_name, email, company')
        .eq('id', memberData.workspace_owner_id)
        .single();

      setTeamOwner(ownerProfile);
      // User is a team member
      setUserRole(memberData.role);
      setIsOwner(false);
      setTeamOwner(memberData.profiles);

      // Fetch team members from the owner's workspace
      const { data: membersData } = await supabase
        .from('team_members')
        .select('*')
        .eq('workspace_owner_id', memberData.workspace_owner_id)
        .order('created_at', { ascending: false });

      if (membersData) {
        setMembers(membersData);
      }

      // Only admins can see invitations
      if (memberData.role === 'admin') {
        const { data: invitationsData } = await supabase
          .from('team_invitations')
          .select('*')
          .eq('workspace_owner_id', memberData.workspace_owner_id)
          .is('accepted_at', null)
          .order('created_at', { ascending: false });

        if (invitationsData) {
          setInvitations(invitationsData);
        }
      }
    } else {
      // User is the owner
      setIsOwner(true);
      setUserRole('owner');

      // Fetch team members
      const { data: membersData, error: membersError } = await supabase
        .from('team_members')
        .select('*')
        .eq('workspace_owner_id', user.id)
        .order('created_at', { ascending: false });

      if (!membersError && membersData) {
        setMembers(membersData);
      }

      // Fetch pending invitations
      const { data: invitationsData, error: invitationsError } = await supabase
        .from('team_invitations')
        .select('*')
        .eq('workspace_owner_id', user.id)
        .is('accepted_at', null)
        .order('created_at', { ascending: false });

      if (!invitationsError && invitationsData) {
        setInvitations(invitationsData);
      }
    }

    setLoading(false);
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get user profile for inviter name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    // Generate invitation token
    const token = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    const { error } = await supabase
      .from('team_invitations')
      .insert({
        workspace_owner_id: user.id,
        email: inviteEmail,
        role: inviteRole,
        invited_by: user.id,
        token,
        expires_at: expiresAt.toISOString()
      });

    if (error) {
      alert('Error al crear invitación: ' + error.message);
      setSending(false);
      return;
    }

    // Send invitation email via API
    try {
      const response = await fetch('/api/team/send-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole,
          token,
          inviterName: profile?.full_name || 'Un miembro del equipo'
        })
      });

      const result = await response.json();

      if (result.success) {
        if (result.emailSent) {
          alert('✅ Invitación enviada por email exitosamente');
        } else {
          alert('⚠️ Invitación creada. El email no pudo ser enviado, pero puedes copiar el enlace para compartirlo manualmente.');
        }
        setShowInviteModal(false);
        setInviteEmail('');
        setInviteRole('agent');
        fetchData();
      } else {
        alert('Error al enviar invitación: ' + result.error);
      }
    } catch (error) {
      alert('Error al enviar invitación. Puedes copiar el enlace manualmente.');
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('agent');
      fetchData();
    }

    setSending(false);
  };

  const handleResendInvitation = async (invitation: any) => {
    setSending(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get user profile for inviter name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    // Send invitation email via API
    try {
      const response = await fetch('/api/team/send-invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: invitation.email,
          role: invitation.role,
          token: invitation.token,
          inviterName: profile?.full_name || 'Un miembro del equipo'
        })
      });

      const result = await response.json();

      if (result.success) {
        if (result.emailSent) {
          alert('✅ Invitación reenviada por email exitosamente');
        } else {
          alert('⚠️ El email no pudo ser enviado. Puedes copiar el enlace para compartirlo manualmente.');
        }
      } else {
        alert('Error al reenviar invitación: ' + result.error);
      }
    } catch (error) {
      alert('Error al reenviar invitación');
    }

    setSending(false);
  };

  const handleUpdateRole = async (memberId: string, newRole: string) => {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('team_members')
      .update({ role: newRole })
      .eq('id', memberId);

    if (error) {
      alert('Error al actualizar rol: ' + error.message);
    } else {
      fetchData();
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este miembro del equipo?')) return;

    const supabase = createClient();
    
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) {
      alert('Error al eliminar miembro: ' + error.message);
    } else {
      fetchData();
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('team_invitations')
      .delete()
      .eq('id', invitationId);

    if (error) {
      alert('Error al cancelar invitación: ' + error.message);
    } else {
      fetchData();
    }
  };

  const copyInvitationLink = (token: string) => {
    const link = `${window.location.origin}/team/join/${token}`;
    navigator.clipboard.writeText(link);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Equipo</h1>
        <p className="text-gray-600">Administra los miembros de tu equipo y sus permisos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Miembros</p>
              <p className="text-3xl font-bold text-gray-900">{members.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Activos</p>
              <p className="text-3xl font-bold text-green-600">
                {members.filter(m => m.is_active).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Invitaciones</p>
              <p className="text-3xl font-bold text-orange-600">{invitations.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Agentes</p>
              <p className="text-3xl font-bold text-purple-600">
                {members.filter(m => m.role === 'agent').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Headphones className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 flex gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar miembros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="supervisor">Supervisores</option>
              <option value="agent">Agentes</option>
              <option value="viewer">Observadores</option>
            </select>
          </div>
          {(isOwner || userRole === 'admin') && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <UserPlus className="w-5 h-5" />
              Invitar Miembro
            </button>
          )}
        </div>
      </div>

      {/* Team Owner Info (for members) */}
      {!isOwner && teamOwner && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-600" />
            Propietario del Equipo
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {teamOwner.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{teamOwner.full_name || 'Usuario'}</p>
              <p className="text-sm text-gray-600">{teamOwner.email}</p>
              {teamOwner.company && (
                <p className="text-sm text-gray-500">{teamOwner.company}</p>
              )}
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Pending Invitations */}
      {(isOwner || userRole === 'admin') && invitations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Invitaciones Pendientes
          </h2>
          <div className="space-y-3">
            {invitations.map((invitation) => {
              const RoleIcon = roleConfig[invitation.role].icon;
              return (
                <div key={invitation.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{invitation.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleConfig[invitation.role].bgColor} ${roleConfig[invitation.role].color}`}>
                          <RoleIcon className="w-3 h-3" />
                          {roleConfig[invitation.role].label}
                        </span>
                        <span className="text-xs text-gray-500">
                          Expira: {new Date(invitation.expires_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleResendInvitation(invitation)}
                      disabled={sending}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Reenviar invitación por email"
                    >
                      <RefreshCw className={`w-5 h-5 ${sending ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => copyInvitationLink(invitation.token)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copiar enlace de invitación"
                    >
                      {copiedToken === invitation.token ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCancelInvitation(invitation.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Cancelar invitación"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miembro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Actividad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unido
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMembers.map((member) => {
                const RoleIcon = roleConfig[member.role].icon;
                return (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {member.avatar_url ? (
                          <img
                            src={member.avatar_url}
                            alt={member.full_name || member.email}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                            {(member.full_name || member.email).charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {member.full_name || 'Sin nombre'}
                          </p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${roleConfig[member.role].bgColor} ${roleConfig[member.role].color}`}>
                        <RoleIcon className="w-4 h-4" />
                        {roleConfig[member.role].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.is_active ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-4 h-4" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                          <XCircle className="w-4 h-4" />
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.last_active_at
                        ? new Date(member.last_active_at).toLocaleDateString()
                        : 'Nunca'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.joined_at
                        ? new Date(member.joined_at).toLocaleDateString()
                        : 'Pendiente'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {member.role !== 'owner' && (
                          <>
                            <select
                              value={member.role}
                              onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="admin">Admin</option>
                              <option value="supervisor">Supervisor</option>
                              <option value="agent">Agente</option>
                              <option value="viewer">Observador</option>
                            </select>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Invitar Nuevo Miembro</h2>
            </div>
            <form onSubmit={handleInviteMember} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email del Miembro
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <div className="space-y-3">
                  {(['admin', 'supervisor', 'agent', 'viewer'] as const).map((role) => {
                    const RoleIcon = roleConfig[role].icon;
                    return (
                      <label
                        key={role}
                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          inviteRole === role
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={inviteRole === role}
                          onChange={(e) => setInviteRole(e.target.value as any)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <RoleIcon className={`w-5 h-5 ${roleConfig[role].color}`} />
                            <span className="font-medium text-gray-900">
                              {roleConfig[role].label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {roleConfig[role].description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Invitación
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
