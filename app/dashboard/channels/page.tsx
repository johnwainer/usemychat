'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Sparkles,
  Share2,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Music4,
  Shield,
  UserCog,
  Headphones,
  Eye
} from 'lucide-react';

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

interface TeamMember {
  id: string;
  full_name: string | null;
  email: string;
  role: 'owner' | 'admin' | 'supervisor' | 'agent' | 'viewer';
}

const platformConfig: Record<Channel['platform'], { label: string; icon: any; color: string; bg: string }> = {
  whatsapp: { label: 'WhatsApp', icon: MessageCircle, color: 'text-green-600', bg: 'bg-green-50' },
  facebook: { label: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-50' },
  instagram: { label: 'Instagram', icon: Instagram, color: 'text-pink-600', bg: 'bg-pink-50' },
  linkedin: { label: 'LinkedIn', icon: Linkedin, color: 'text-sky-700', bg: 'bg-sky-50' },
  tiktok: { label: 'TikTok', icon: Music4, color: 'text-gray-900', bg: 'bg-gray-100' }
};

const roleConfig = {
  owner: { label: 'Propietario', icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  admin: { label: 'Administrador', icon: Shield, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  supervisor: { label: 'Supervisor', icon: UserCog, color: 'text-green-600', bgColor: 'bg-green-100' },
  agent: { label: 'Agente', icon: Headphones, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  viewer: { label: 'Observador', icon: Eye, color: 'text-gray-600', bgColor: 'bg-gray-100' }
};

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [workspaceOwnerId, setWorkspaceOwnerId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'owner' | 'admin' | 'supervisor' | 'agent' | 'viewer' | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    platform: 'whatsapp' as Channel['platform'],
    name: '',
    distribution: 'team' as 'team' | 'selected',
    assigned_member_ids: [] as string[],
    automation_enabled: true,
    auto_reply_enabled: false
  });

  const canEdit = userRole === 'owner' || userRole === 'admin' || userRole === 'supervisor';

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: memberData } = await supabase
        .from('team_members')
        .select('role, workspace_owner_id')
        .eq('user_id', user.id)
        .single();

      if (memberData) {
        setUserRole(memberData.role as any);
        setWorkspaceOwnerId(memberData.workspace_owner_id);

        const [{ data: channelsData }, { data: membersData }] = await Promise.all([
          supabase
            .from('channels')
            .select('*')
            .eq('workspace_owner_id', memberData.workspace_owner_id)
            .order('created_at', { ascending: false }),
          supabase
            .from('team_members')
            .select('id, full_name, email, role')
            .eq('workspace_owner_id', memberData.workspace_owner_id)
        ]);

        if (channelsData) setChannels(channelsData as Channel[]);
        if (membersData) setMembers(membersData as TeamMember[]);
      } else {
        setUserRole('owner');
        setWorkspaceOwnerId(user.id);

        const [{ data: channelsData }, { data: membersData }] = await Promise.all([
          supabase
            .from('channels')
            .select('*')
            .eq('workspace_owner_id', user.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('team_members')
            .select('id, full_name, email, role')
            .eq('workspace_owner_id', user.id)
        ]);

        if (channelsData) setChannels(channelsData as Channel[]);
        if (membersData) setMembers(membersData as TeamMember[]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCreateChannel = async () => {
    if (!workspaceOwnerId || !canEdit) return;
    setSending(true);

    const supabase = createClient();
    const payload = {
      workspace_owner_id: workspaceOwnerId,
      platform: form.platform,
      name: form.name || platformConfig[form.platform].label,
      status: 'active',
      assigned_member_ids: form.distribution === 'selected' ? form.assigned_member_ids : members.map(m => m.id),
      distribution: form.distribution,
      automation_enabled: form.automation_enabled,
      auto_reply_enabled: form.auto_reply_enabled
    };

    const { error } = await supabase.from('channels').insert(payload);
    if (!error) {
      setShowModal(false);
      setForm({ platform: 'whatsapp', name: '', distribution: 'team', assigned_member_ids: [], automation_enabled: true, auto_reply_enabled: false });
      const { data: channelsData } = await supabase
        .from('channels')
        .select('*')
        .eq('workspace_owner_id', workspaceOwnerId)
        .order('created_at', { ascending: false });
      if (channelsData) setChannels(channelsData as Channel[]);
    } else {
      alert('Error al crear canal: ' + error.message);
    }

    setSending(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Canales</h1>
          <p className="text-gray-600">Conecta y administra canales omnicanal</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Agregar canal
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {channels.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Acn no has agregado canales</div>
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
                    <span className="px-2 py-1 bg-gray-100 rounded-full">Distribucin: {channel.distribution === 'team' ? 'Equipo completo' : 'Asignados'}</span>
                    {channel.automation_enabled && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full">Automatizaciones</span>}
                    {channel.auto_reply_enabled && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Auto-respuestas</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && canEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Agregar canal</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <Share2 className="w-5 h-5" />
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
                        form.platform === platform ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="platform"
                        value={platform}
                        checked={form.platform === platform}
                        onChange={() => setForm({ ...form, platform })}
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
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  placeholder="Ej. WhatsApp ventas norte"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distribucin</label>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${form.distribution === 'team' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="distribution"
                        value="team"
                        checked={form.distribution === 'team'}
                        onChange={() => setForm({ ...form, distribution: 'team', assigned_member_ids: members.map(m => m.id) })}
                      />
                      <span className="text-sm text-gray-800">Equipo completo</span>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${form.distribution === 'selected' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                      <input
                        type="radio"
                        name="distribution"
                        value="selected"
                        checked={form.distribution === 'selected'}
                        onChange={() => setForm({ ...form, distribution: 'selected', assigned_member_ids: [] })}
                      />
                      <span className="text-sm text-gray-800">Miembros seleccionados</span>
                    </label>
                  </div>
                </div>

                {form.distribution === 'selected' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Asignar a miembros</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      {members.map((member) => (
                        <label key={member.id} className="flex items-center gap-3 text-sm text-gray-800">
                          <input
                            type="checkbox"
                            checked={form.assigned_member_ids.includes(member.id)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...form.assigned_member_ids, member.id]
                                : form.assigned_member_ids.filter(id => id !== member.id);
                              setForm({ ...form, assigned_member_ids: next });
                            }}
                          />
                          <span>{member.full_name || member.email}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${roleConfig[member.role].bgColor} ${roleConfig[member.role].color}`}>
                            {roleConfig[member.role].label}
                          </span>
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
                    checked={form.automation_enabled}
                    onChange={(e) => setForm({ ...form, automation_enabled: e.target.checked })}
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Automatizaciones</p>
                    <p className="text-xs text-gray-600">Habilita flujos y mensajes automaticos</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.auto_reply_enabled}
                    onChange={(e) => setForm({ ...form, auto_reply_enabled: e.target.checked })}
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Auto-replies</p>
                    <p className="text-xs text-gray-600">Respuestas instantaneas para fuera de horario</p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={sending || !form.name.trim()}
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
