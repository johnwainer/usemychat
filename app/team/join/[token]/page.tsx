'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Users,
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  Building,
  Shield,
  UserCog,
  Headphones,
  Eye,
  Crown
} from 'lucide-react';

interface Invitation {
  id: string;
  workspace_owner_id: string;
  email: string;
  role: 'admin' | 'supervisor' | 'agent' | 'viewer';
  expires_at: string;
  profiles: {
    full_name: string;
    email: string;
    company: string | null;
  } | null;
}

const roleConfig = {
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

export default function JoinTeamPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchInvitation();
  }, [token]);

  useEffect(() => {
    if (!loading && invitation && !currentUser) {
      const company = invitation.profiles?.company || '';
      const params = new URLSearchParams({
        redirect: `/team/join/${token}`,
        email: invitation.email,
        ...(company && { company })
      });
      router.push(`/register?${params.toString()}`);
    }
  }, [loading, invitation, currentUser, token, router]);

  const fetchInvitation = async () => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);

    const { data, error } = await supabase
      .from('team_invitations')
      .select('*')
      .eq('token', token)
      .is('accepted_at', null)
      .single();

    if (error || !data) {
      setError('Invitación no encontrada o ya ha sido aceptada');
      setLoading(false);
      return;
    }

    // Fetch inviter profile separately
    const { data: profileData } = await supabase
      .from('profiles')
      .select('full_name, email, company')
      .eq('id', data.invited_by)
      .single();

    const invitationWithProfile = {
      ...data,
      profiles: profileData
    };

    if (new Date(invitationWithProfile.expires_at) < new Date()) {
      setError('Esta invitación ha expirado');
    } else {
      setInvitation(invitationWithProfile);
    }

    setLoading(false);
  };

  const handleAcceptInvitation = async () => {
    if (!currentUser) {
      router.push(`/register?redirect=/team/join/${token}&email=${encodeURIComponent(invitation?.email || '')}`);
      return;
    }

    if (!invitation) return;

    setAccepting(true);
    const supabase = createClient();

    try {
      // Create team member
      const { error: memberError } = await supabase
        .from('team_members')
        .insert({
          user_id: currentUser.id,
          workspace_owner_id: invitation.workspace_owner_id,
          role: invitation.role,
          email: currentUser.email,
          full_name: currentUser.user_metadata?.full_name || null,
          avatar_url: currentUser.user_metadata?.avatar_url || null,
          is_active: true,
          joined_at: new Date().toISOString()
        });

      if (memberError) throw memberError;

      // Mark invitation as accepted
      const { error: inviteError } = await supabase
        .from('team_invitations')
        .update({ accepted_at: new Date().toISOString() })
        .eq('id', invitation.id);

      if (inviteError) throw inviteError;

      // Redirect to dashboard
      router.push('/dashboard?welcome=team');
    } catch (err: any) {
      setError('Error al aceptar invitación: ' + err.message);
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invitación No Válida</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!invitation) return null;

  const RoleIcon = roleConfig[invitation.role].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Invitación al Equipo</h1>
          <p className="text-blue-100">Has sido invitado a unirte a un equipo</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Workspace Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-3">INVITADO POR</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {invitation.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {invitation.profiles?.full_name || 'Usuario'}
                </p>
                <p className="text-gray-600">{invitation.profiles?.email || 'Email no disponible'}</p>
                {invitation.profiles?.company && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Building className="w-4 h-4" />
                    {invitation.profiles.company}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Role Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <h2 className="text-sm font-medium text-gray-500 mb-3">TU ROL</h2>
            <div className="flex items-start gap-4">
              <div className={`p-3 ${roleConfig[invitation.role].bgColor} rounded-lg`}>
                <RoleIcon className={`w-6 h-6 ${roleConfig[invitation.role].color}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg mb-1">
                  {roleConfig[invitation.role].label}
                </p>
                <p className="text-gray-600">
                  {roleConfig[invitation.role].description}
                </p>
              </div>
            </div>
          </div>

          {/* Invitation Details */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900 mb-1">
                  Invitación enviada a: {invitation.email}
                </p>
                <p className="text-xs text-yellow-700">
                  Expira el: {new Date(invitation.expires_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {!currentUser ? (
            <div className="space-y-3">
              <p className="text-center text-gray-600 mb-4">
                Debes iniciar sesión o crear una cuenta para aceptar esta invitación
              </p>
              <button
                onClick={() => {
                  const params = new URLSearchParams({
                    redirect: `/team/join/${token}`,
                    email: invitation.email
                  });
                  router.push(`/login?${params.toString()}`);
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  const company = invitation.profiles?.company || '';
                  const params = new URLSearchParams({
                    redirect: `/team/join/${token}`,
                    email: invitation.email,
                    ...(company && { company })
                  });
                  router.push(`/register?${params.toString()}`);
                }}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Crear Cuenta
              </button>
            </div>
          ) : currentUser.email !== invitation.email ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-center">
                Esta invitación fue enviada a <strong>{invitation.email}</strong> pero has iniciado sesión como <strong>{currentUser.email}</strong>.
                Por favor, inicia sesión con la cuenta correcta.
              </p>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Rechazar
              </button>
              <button
                onClick={handleAcceptInvitation}
                disabled={accepting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Aceptando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Aceptar Invitación
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
