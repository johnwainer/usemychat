'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Briefcase,
  Globe,
  MapPin,
  Calendar,
  Tag,
  Edit,
  Trash2,
  Plus,
  MessageSquare,
  PhoneCall,
  Video,
  FileText,
  Instagram,
  Facebook,
  Linkedin,
  Music,
  TrendingUp,
  Clock,
  User,
  X,
  Save,
  Loader2,
  Users,
  Building2
} from 'lucide-react';
import Link from 'next/link';

interface Contact {
  id: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  website: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  whatsapp: string | null;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  twitter: string | null;
  tiktok: string | null;
  status: string;
  lifecycle_stage: string;
  lead_score: number;
  source: string | null;
  tags: string[] | null;
  notes: string | null;
  avatar_url: string | null;
  last_contact_date: string | null;
  next_follow_up_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
    company: string | null;
    phone: string | null;
  };
}

interface Interaction {
  id: string;
  type: string;
  direction: string | null;
  subject: string | null;
  content: string | null;
  duration_minutes: number | null;
  outcome: string | null;
  sentiment: string | null;
  interaction_date: string;
  created_at: string;
}

export default function AdminContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = params.id as string;

  const [contact, setContact] = useState<Contact | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Contact>>({});
  const [saving, setSaving] = useState(false);
  const [interactionForm, setInteractionForm] = useState({
    type: 'note',
    direction: 'outbound',
    subject: '',
    content: '',
    duration_minutes: '',
    outcome: '',
    sentiment: 'neutral',
  });

  useEffect(() => {
    fetchContact();
    fetchInteractions();
  }, [contactId]);

  const fetchContact = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            company,
            phone
          )
        `)
        .eq('id', contactId)
        .single();

      if (error) throw error;
      setContact(data);
      setEditForm(data);
    } catch (error) {
      console.error('Error fetching contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInteractions = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_interactions')
        .select('*')
        .eq('contact_id', contactId)
        .order('interaction_date', { ascending: false });

      if (error) throw error;
      setInteractions(data || []);
    } catch (error) {
      console.error('Error fetching interactions:', error);
    }
  };

  const handleDeleteContact = async () => {
    if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      router.push('/admin/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error al eliminar el contacto');
    }
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contacts')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          email: editForm.email,
          phone: editForm.phone,
          company: editForm.company,
          job_title: editForm.job_title,
          website: editForm.website,
          status: editForm.status,
          lifecycle_stage: editForm.lifecycle_stage,
          lead_score: editForm.lead_score,
          notes: editForm.notes,
        })
        .eq('id', contactId);

      if (error) throw error;
      
      setEditMode(false);
      fetchContact();
      alert('Contacto actualizado exitosamente');
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Error al actualizar el contacto');
    } finally {
      setSaving(false);
    }
  };

  const handleAddInteraction = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from('contact_interactions')
        .insert([{
          contact_id: contactId,
          user_id: contact?.user_id,
          type: interactionForm.type,
          direction: interactionForm.direction || null,
          subject: interactionForm.subject || null,
          content: interactionForm.content || null,
          duration_minutes: interactionForm.duration_minutes ? parseInt(interactionForm.duration_minutes) : null,
          outcome: interactionForm.outcome || null,
          sentiment: interactionForm.sentiment,
        }]);

      if (error) throw error;

      setShowInteractionModal(false);
      setInteractionForm({
        type: 'note',
        direction: 'outbound',
        subject: '',
        content: '',
        duration_minutes: '',
        outcome: '',
        sentiment: 'neutral',
      });
      fetchInteractions();
      fetchContact();
    } catch (error) {
      console.error('Error adding interaction:', error);
      alert('Error al agregar la interacción');
    }
  };

  const getInteractionIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      call: PhoneCall,
      email: Mail,
      meeting: Video,
      message: MessageSquare,
      note: FileText,
    };
    const Icon = icons[type] || FileText;
    return <Icon className="w-5 h-5" />;
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      lead: 'bg-blue-100 text-blue-800',
      customer: 'bg-purple-100 text-purple-800',
      prospect: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-600">Contacto no encontrado</p>
          <Link href="/admin/contacts" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Volver a contactos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/contacts"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{contact.full_name}</h1>
            <p className="text-gray-600 mt-1">{contact.job_title || 'Sin cargo'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Guardar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={handleDeleteContact}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>

      {/* Client Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
        <div className="flex items-center gap-3 text-white">
          <Users className="w-6 h-6" />
          <div>
            <p className="text-sm opacity-90">Cliente Propietario</p>
            <p className="text-xl font-bold">{contact.profiles?.full_name}</p>
            <p className="text-sm opacity-75">{contact.profiles?.email}</p>
            {contact.profiles?.company && (
              <p className="text-sm opacity-75">{contact.profiles.company}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>
            <div className="space-y-4">
              {editMode ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={editForm.first_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Apellido</label>
                      <input
                        type="text"
                        value={editForm.last_name || ''}
                        onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Empresa</label>
                    <input
                      type="text"
                      value={editForm.company || ''}
                      onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Cargo</label>
                    <input
                      type="text"
                      value={editForm.job_title || ''}
                      onChange={(e) => setEditForm({ ...editForm, job_title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Sitio Web</label>
                    <input
                      type="url"
                      value={editForm.website || ''}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              ) : (
                <>
                  {contact.email && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <a href={`mailto:${contact.email}`} className="hover:text-blue-400">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <a href={`tel:${contact.phone}`} className="hover:text-blue-400">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Building className="w-5 h-5 text-gray-400" />
                      <span>{contact.company}</span>
                    </div>
                  )}
                  {contact.job_title && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span>{contact.job_title}</span>
                    </div>
                  )}
                  {contact.website && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <a href={contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        {contact.website}
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Social Media */}
          {!editMode && (contact.instagram || contact.facebook || contact.linkedin || contact.twitter || contact.tiktok || contact.whatsapp || contact.telegram) && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Redes Sociales</h2>
              <div className="grid grid-cols-2 gap-4">
                {contact.instagram && (
                  <a href={`https://instagram.com/${contact.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-pink-400">
                    <Instagram className="w-5 h-5" />
                    <span>@{contact.instagram}</span>
                  </a>
                )}
                {contact.facebook && (
                  <a href={`https://facebook.com/${contact.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-blue-400">
                    <Facebook className="w-5 h-5" />
                    <span>{contact.facebook}</span>
                  </a>
                )}
                {contact.linkedin && (
                  <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-blue-400">
                    <Linkedin className="w-5 h-5" />
                    <span>{contact.linkedin}</span>
                  </a>
                )}
                {contact.twitter && (
                  <a href={`https://x.com/${contact.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-gray-100">
                    <X className="w-5 h-5" />
                    <span>@{contact.twitter}</span>
                  </a>
                )}
                {contact.tiktok && (
                  <a href={`https://tiktok.com/@${contact.tiktok}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-gray-100">
                    <Music className="w-5 h-5" />
                    <span>@{contact.tiktok}</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Interactions History */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Historial de Interacciones</h2>
              <button
                onClick={() => setShowInteractionModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nueva Interacción
              </button>
            </div>

            <div className="space-y-4">
              {interactions.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No hay interacciones registradas</p>
              ) : (
                interactions.map((interaction) => (
                  <div key={interaction.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-700 rounded-lg text-blue-400">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">
                            {interaction.subject || interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                          </h3>
                          <span className="text-sm text-gray-400">
                            {new Date(interaction.interaction_date).toLocaleDateString()}
                          </span>
                        </div>
                        {interaction.content && (
                          <p className="text-gray-300 text-sm mb-2">{interaction.content}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {interaction.direction && (
                            <span className="capitalize">{interaction.direction}</span>
                          )}
                          {interaction.duration_minutes && (
                            <span>{interaction.duration_minutes} min</span>
                          )}
                          {interaction.outcome && (
                            <span className="capitalize">{interaction.outcome}</span>
                          )}
                          {interaction.sentiment && (
                            <span className="capitalize">{interaction.sentiment}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - CRM Info */}
        <div className="space-y-6">
          {/* Status & Score */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estado CRM</h2>
            <div className="space-y-4">
              {editMode ? (
                <>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Estado</label>
                    <select
                      value={editForm.status || ''}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="lead">Lead</option>
                      <option value="customer">Cliente</option>
                      <option value="prospect">Prospecto</option>
                      <option value="blocked">Bloqueado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Etapa del Ciclo</label>
                    <select
                      value={editForm.lifecycle_stage || ''}
                      onChange={(e) => setEditForm({ ...editForm, lifecycle_stage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="subscriber">Suscriptor</option>
                      <option value="lead">Lead</option>
                      <option value="marketing_qualified_lead">MQL</option>
                      <option value="sales_qualified_lead">SQL</option>
                      <option value="opportunity">Oportunidad</option>
                      <option value="customer">Cliente</option>
                      <option value="evangelist">Evangelista</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Lead Score</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editForm.lead_score || 0}
                      onChange={(e) => setEditForm({ ...editForm, lead_score: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estado</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Etapa del Ciclo</p>
                    <p className="text-white capitalize">{contact.lifecycle_stage.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Lead Score</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold text-white">{contact.lead_score}</span>
                      <span className="text-gray-400">/100</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-4">Información Adicional</h2>
            <div className="space-y-3 text-sm">
              {contact.source && (
                <div>
                  <p className="text-gray-400">Fuente</p>
                  <p className="text-white capitalize">{contact.source}</p>
                </div>
              )}
              {contact.last_contact_date && (
                <div>
                  <p className="text-gray-400">Último Contacto</p>
                  <p className="text-white">{new Date(contact.last_contact_date).toLocaleDateString()}</p>
                </div>
              )}
              {contact.next_follow_up_date && (
                <div>
                  <p className="text-gray-400">Próximo Seguimiento</p>
                  <p className="text-white">{new Date(contact.next_follow_up_date).toLocaleDateString()}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Creado</p>
                <p className="text-white">{new Date(contact.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {!editMode && contact.notes && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Notas</h2>
              <p className="text-gray-300 text-sm whitespace-pre-wrap">{contact.notes}</p>
            </div>
          )}

          {editMode && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Notas</h2>
              <textarea
                value={editForm.notes || ''}
                onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                rows={6}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-gray-900"
                placeholder="Agregar notas sobre el contacto..."
              />
            </div>
          )}

          {/* Tags */}
          {!editMode && contact.tags && contact.tags.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-4">Etiquetas</h2>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interaction Modal */}
      {showInteractionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Nueva Interacción</h2>
            </div>
            <form onSubmit={handleAddInteraction} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tipo</label>
                  <select
                    value={interactionForm.type}
                    onChange={(e) => setInteractionForm({ ...interactionForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="call">Llamada</option>
                    <option value="email">Email</option>
                    <option value="meeting">Reunión</option>
                    <option value="message">Mensaje</option>
                    <option value="note">Nota</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Dirección</label>
                  <select
                    value={interactionForm.direction}
                    onChange={(e) => setInteractionForm({ ...interactionForm, direction: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="inbound">Entrante</option>
                    <option value="outbound">Saliente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Asunto</label>
                <input
                  type="text"
                  value={interactionForm.subject}
                  onChange={(e) => setInteractionForm({ ...interactionForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Asunto de la interacción"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Contenido</label>
                <textarea
                  value={interactionForm.content}
                  onChange={(e) => setInteractionForm({ ...interactionForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detalles de la interacción..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Duración (min)</label>
                  <input
                    type="number"
                    value={interactionForm.duration_minutes}
                    onChange={(e) => setInteractionForm({ ...interactionForm, duration_minutes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Resultado</label>
                  <select
                    value={interactionForm.outcome}
                    onChange={(e) => setInteractionForm({ ...interactionForm, outcome: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar</option>
                    <option value="successful">Exitoso</option>
                    <option value="unsuccessful">No exitoso</option>
                    <option value="follow_up_needed">Requiere seguimiento</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Sentimiento</label>
                  <select
                    value={interactionForm.sentiment}
                    onChange={(e) => setInteractionForm({ ...interactionForm, sentiment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="positive">Positivo</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negativo</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInteractionModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar Interacción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
