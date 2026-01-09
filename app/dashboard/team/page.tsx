'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Mail,
  Shield,
  Trash2,
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
  RefreshCw,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Music4,
  Sparkles,
  Share2
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

interface Channel {
  id: string;
  platform: 'whatsapp' | 'facebook' | 'instagram' | 'linkedin' | 'tiktok';
  name: string;
  status: 'active' | 'inactive';
  workspace_owner_id: string;
  assigned_member_ids: string[] | null;
  distribution?: 'team' | 'selected';
  automation_enabled?: boolean;
  auto_reply_enabled?: boolean;
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

const platformConfig: Record<Channel['platform'], { label: string; icon: any; color: string; bg: string }> = {
  whatsapp: { label: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50' },
  facebook: { label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
  instagram: { label: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
  linkedin: { label: 'LinkedIn', icon: Linkedin, color: 'text-sky-700', bg: 'bg-sky-50' },
  tiktok: { label: 'TikTok', icon: Music4, color: 'text-gray-900', bg: 'bg-gray-100' }
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'supervisor' | 'agent' | 'viewer'>('agent');
  const [sending, setSending] = useState(false);
  const [searchTerm] = useState('');
  const [filterRole] = useState<string>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [teamOwner, setTeamOwner] = useState<any>(null);
  const [workspaceOwnerId, setWorkspaceOwnerId] = useState<string | null>(null);
  const [channelForm, setChannelForm] = useState({
    platform: 'whatsapp' as Channel['platform'],
    name: '',
    distribution: 'team' as 'team' | 'selected',
    assigned_member_ids: [] as string[],
    automation_enabled: true,
    auto_reply_enabled: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const supabase = createClient();

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

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
      setWorkspaceOwnerId(memberData.workspace_owner_id);

      // Fetch owner profile
      const { data: ownerProfile } = await supabase
        .from('profiles')
        .select('full_name, email, company')
        .eq('id', memberData.workspace_owner_id)
        .single();

      setTeamOwner(ownerProfile);

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

      const { data: channelsData } = await supabase
        .from('channels')
        .select('*')
        .eq('workspace_owner_id', memberData.workspace_owner_id)
        .order('created_at', { ascending: false });

      if (channelsData) setChannels(channelsData as Channel[]);
    } else {
      // User is the owner
      setIsOwner(true);
      setUserRole('owner');
      setWorkspaceOwnerId(user.id);

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

  const handleCreateChannel = async () => {
    if (!workspaceOwnerId) return;
    setSending(true);

    const supabase = createClient();
    const payload = {
      workspace_owner_id: workspaceOwnerId,
      platform: channelForm.platform,
      name: channelForm.name || platformConfig[channelForm.platform].label,
      status: 'active',
      assigned_member_ids: channelForm.distribution === 'selected' ? channelForm.assigned_member_ids : members.map(m => m.id),
      distribution: channelForm.distribution,
      automation_enabled: channelForm.automation_enabled,
      auto_reply_enabled: channelForm.auto_reply_enabled
    };

    const { error } = await supabase.from('channels').insert(payload);

    if (error) {
      alert('Error al crear canal: ' + error.message);
    } else {
      setShowChannelModal(false);
      setChannelForm({
        platform: 'whatsapp',
        name: '',
        distribution: 'team',
        assigned_member_ids: [],
        automation_enabled: true,
        auto_reply_enabled: false
      });
      fetchData();
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

  const canManageChannels = isOwner || userRole === 'admin' || userRole === 'supervisor';

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
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Equipo</h1>
          <p className="text-gray-600">Administra los miembros de tu equipo y sus permisos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {canManageChannels && (
            <button
              onClick={() => setShowChannelModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Agregar canal
            </button>
          )}
          {(isOwner || userRole === 'admin') && (
            <button
              onClick={() => setShowInviteModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Invitar miembro
            </button>
          )}
        </div>
      </div>

      {/* Channels */}
      {canManageChannels && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Canales conectados</h2>
              <p className="text-sm text-gray-600">Agrega y administra canales ilimitados</p>
            </div>
            <button
              onClick={() => setShowChannelModal(true)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Nuevo canal
            </button>
          </div>
          {channels.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Aún no has agregado canales</div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {channels.map((channel) => {
                const cfg = platformConfig[channel.platform];
                const Icon = cfg.icon;
                return (
                  <div key={channel.id} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cfg.bg}`}>
                        <Icon className={`w-5 h-5 ${cfg.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{channel.name}</p>
                        <p className="text-sm text-gray-600">{cfg.label}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${channel.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {channel.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">Distribución: {channel.distribution === 'team' ? 'Equipo completo' : 'Asignados'}</span>
                      {channel.automation_enabled && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Automatizaciones</span>}
                      {channel.auto_reply_enabled && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Auto-respuestas</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Equipo</h1>
          <p className="text-gray-600">Administra los miembros de tu equipo y sus permisos</p>
        </div>
        {(isOwner || userRole === 'admin') && (
          <button
            onClick={() => setShowInviteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            Invitar miembro
          </button>
        )}
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
                        <span className="text-xs text-gray-700">
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
                      className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.last_active_at
                        ? new Date(member.last_active_at).toLocaleDateString()
                        : 'Nunca'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.joined_at
                        ? new Date(member.joined_at).toLocaleDateString()
                        : 'Pendiente'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isOwner && member.role !== 'owner' && (
                          <>
                            <select
                              value={member.role}
                              onChange={(e) => handleUpdateRole(member.id, e.target.value)}
                              className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        {!isOwner && (
                          <span className="text-sm text-gray-500">Solo lectura</span>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
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

      {showChannelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Agregar canal</h2>
              <button onClick={() => setShowChannelModal(false)} className="text-gray-500 hover:text-gray-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {(['whatsapp','facebook','instagram','linkedin','tiktok'] as Channel['platform'][]).map(platform => {
                  const cfg = platformConfig[platform];
                  const Icon = cfg.icon;
                  return (
                    <label
                      key={platform}
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        channelForm.platform === platform ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="platform"
                        value={platform}
                        checked={channelForm.platform === platform}
                        onChange={() => setChannelForm({ ...channelForm, platform })}
                        className="hidden"
                      />
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${cfg.bg}`}>
                        <Icon className={`w-5 h-5 ${cfg.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{cfg.label}</p>
                        <p className="text-xs text-gray-600">Conecta un canal de {cfg.label}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre interno</label>
                <input
                  type="text"
                  value={channelForm.name}
                  onChange={(e) => setChannelForm({ ...channelForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  placeholder="Ej. WhatsApp ventas norte"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distribución</label>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${channelForm.distribution === 'team' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="distribution"
                        value="team"
                        checked={channelForm.distribution === 'team'}
                        onChange={() => setChannelForm({ ...channelForm, distribution: 'team', assigned_member_ids: members.map(m => m.id) })}
                      />
                      <span className="text-sm text-gray-800">Equipo completo</span>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${channelForm.distribution === 'selected' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="distribution"
                        value="selected"
                        checked={channelForm.distribution === 'selected'}
                        onChange={() => setChannelForm({ ...channelForm, distribution: 'selected', assigned_member_ids: [] })}
                      />
                      <span className="text-sm text-gray-800">Miembros seleccionados</span>
                    </label>
                  </div>
                </div>

                {channelForm.distribution === 'selected' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asignar a miembros</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {members.map((member) => (
                        <label key={member.id} className="flex items-center gap-3 text-sm text-gray-800">
                          <input
                            type="checkbox"
                            checked={channelForm.assigned_member_ids.includes(member.id)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...channelForm.assigned_member_ids, member.id]
                                : channelForm.assigned_member_ids.filter(id => id !== member.id);
                              setChannelForm({ ...channelForm, assigned_member_ids: next });
                            }}
                          />
                          <span>{member.full_name || member.email}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelForm.automation_enabled}
                    onChange={(e) => setChannelForm({ ...channelForm, automation_enabled: e.target.checked })}
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Automatizaciones</p>
                    <p className="text-xs text-gray-600">Habilita flujos y mensajes automáticos</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelForm.auto_reply_enabled}
                    onChange={(e) => setChannelForm({ ...channelForm, auto_reply_enabled: e.target.checked })}
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Auto-replies</p>
                    <p className="text-xs text-gray-600">Respuestas instantáneas para fuera de horario</p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowChannelModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={sending || !channelForm.name.trim()}
                  onClick={handleCreateChannel}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Guardar canal
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
