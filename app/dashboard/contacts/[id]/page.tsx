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
  Twitter,
  TrendingUp,
  Clock,
  User,
  X,
  Save,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import ContactModal from '../ContactModal';

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

export default function ContactDetailPage() {
  const params = useParams();
  const router = useRouter();
  const contactId = params.id as string;

  const [contact, setContact] = useState<Contact | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
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
        .select('*')
        .eq('id', contactId)
        .single();

      if (error) throw error;
      setContact(data);
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
      router.push('/dashboard/contacts');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error al eliminar el contacto');
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
          user_id: user.id,
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      lead: 'bg-blue-100 text-blue-800',
      customer: 'bg-purple-100 text-purple-800',
      prospect: 'bg-yellow-100 text-yellow-800',
      blocked: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getInteractionIcon = (type: string) => {
    const icons: Record<string, any> = {
      call: PhoneCall,
      email: Mail,
      meeting: Video,
      message: MessageSquare,
      note: FileText,
      whatsapp: MessageSquare,
      telegram: MessageSquare,
      instagram: Instagram,
      facebook: Facebook,
      other: FileText,
    };
    const Icon = icons[type] || FileText;
    return <Icon className="w-5 h-5" />;
  };

  const getSentimentColor = (sentiment: string | null) => {
    const colors: Record<string, string> = {
      positive: 'text-green-600',
      neutral: 'text-gray-600',
      negative: 'text-red-600',
    };
    return colors[sentiment || 'neutral'] || 'text-gray-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Contacto no encontrado</h2>
          <Link href="/dashboard/contacts" className="text-blue-600 hover:underline">
            Volver a contactos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/contacts"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a contactos
        </Link>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {contact.avatar_url ? (
                <img src={contact.avatar_url} alt={contact.full_name} className="w-20 h-20 rounded-full" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                  {getInitials(contact.full_name)}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{contact.full_name}</h1>
                {contact.job_title && (
                  <p className="text-lg text-gray-600">{contact.job_title}</p>
                )}
                {contact.company && (
                  <p className="text-gray-500">{contact.company}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {contact.lifecycle_stage}
                  </span>
                  {contact.lead_score > 0 && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <TrendingUp className="w-3 h-3" />
                      {contact.lead_score}/100
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-5 h-5" />
                Editar
              </button>
              <button
                onClick={handleDeleteContact}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h2>
            <div className="space-y-3">
              {contact.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                    {contact.email}
                  </a>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                    {contact.phone}
                  </a>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 truncate">
                    {contact.website}
                  </a>
                </div>
              )}
              {(contact.address_line1 || contact.city) && (
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    {contact.address_line1 && <p>{contact.address_line1}</p>}
                    {contact.address_line2 && <p>{contact.address_line2}</p>}
                    {(contact.city || contact.state || contact.postal_code) && (
                      <p>
                        {[contact.city, contact.state, contact.postal_code].filter(Boolean).join(', ')}
                      </p>
                    )}
                    {contact.country && <p>{contact.country}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Media */}
          {(contact.whatsapp || contact.telegram || contact.instagram || contact.facebook || contact.linkedin || contact.twitter) && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociales</h2>
              <div className="space-y-3">
                {contact.whatsapp && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <span>WhatsApp: {contact.whatsapp}</span>
                  </div>
                )}
                {contact.telegram && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <span>Telegram: {contact.telegram}</span>
                  </div>
                )}
                {contact.instagram && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <a href={`https://instagram.com/${contact.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {contact.instagram}
                    </a>
                  </div>
                )}
                {contact.facebook && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Facebook className="w-5 h-5 text-blue-700" />
                    <span>{contact.facebook}</span>
                  </div>
                )}
                {contact.linkedin && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    <a href={`https://linkedin.com/in/${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {contact.linkedin}
                    </a>
                  </div>
                )}
                {contact.twitter && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    <a href={`https://twitter.com/${contact.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {contact.twitter}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Adicional</h2>
            <div className="space-y-3 text-sm">
              {contact.source && (
                <div>
                  <span className="text-gray-600">Fuente:</span>
                  <span className="ml-2 text-gray-900">{contact.source}</span>
                </div>
              )}
              {contact.last_contact_date && (
                <div>
                  <span className="text-gray-600">Último contacto:</span>
                  <span className="ml-2 text-gray-900">{formatDate(contact.last_contact_date)}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Creado:</span>
                <span className="ml-2 text-gray-900">{formatDate(contact.created_at)}</span>
              </div>
              {contact.tags && contact.tags.length > 0 && (
                <div>
                  <span className="text-gray-600 block mb-2">Etiquetas:</span>
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {contact.notes && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notas</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
            </div>
          )}
        </div>

        {/* Right Column - Interactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Historial de Interacciones</h2>
              <button
                onClick={() => setShowInteractionModal(true)}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nueva Interacción
              </button>
            </div>

            {interactions.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin interacciones</h3>
                <p className="text-gray-600 mb-4">Aún no hay interacciones registradas con este contacto</p>
                <button
                  onClick={() => setShowInteractionModal(true)}
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Primera Interacción
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {interaction.subject || `${interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}`}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <span className="capitalize">{interaction.type}</span>
                              {interaction.direction && (
                                <>
                                  <span>•</span>
                                  <span className="capitalize">{interaction.direction}</span>
                                </>
                              )}
                              {interaction.duration_minutes && (
                                <>
                                  <span>•</span>
                                  <span>{interaction.duration_minutes} min</span>
                                </>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(interaction.interaction_date)}
                          </span>
                        </div>
                        {interaction.content && (
                          <p className="text-gray-700 mb-2">{interaction.content}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm">
                          {interaction.outcome && (
                            <span className="text-gray-600">
                              Resultado: <span className="font-medium">{interaction.outcome}</span>
                            </span>
                          )}
                          {interaction.sentiment && (
                            <span className={`font-medium ${getSentimentColor(interaction.sentiment)}`}>
                              {interaction.sentiment === 'positive' && '😊 Positivo'}
                              {interaction.sentiment === 'neutral' && '😐 Neutral'}
                              {interaction.sentiment === 'negative' && '😞 Negativo'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Contact Modal */}
      {showEditModal && (
        <ContactModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          contact={contact}
          onSave={() => {
            fetchContact();
            setShowEditModal(false);
          }}
        />
      )}

      {/* Add Interaction Modal */}
      {showInteractionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Nueva Interacción</h2>
              <button
                onClick={() => setShowInteractionModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddInteraction} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Interacción *
                  </label>
                  <select
                    value={interactionForm.type}
                    onChange={(e) => setInteractionForm({ ...interactionForm, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    required
                  >
                    <option value="call">Llamada</option>
                    <option value="email">Email</option>
                    <option value="meeting">Reunión</option>
                    <option value="message">Mensaje</option>
                    <option value="note">Nota</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="telegram">Telegram</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <select
                    value={interactionForm.direction}
                    onChange={(e) => setInteractionForm({ ...interactionForm, direction: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                  >
                    <option value="inbound">Entrante</option>
                    <option value="outbound">Saliente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  value={interactionForm.subject}
                  onChange={(e) => setInteractionForm({ ...interactionForm, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                  placeholder="Asunto de la interacción"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contenido
                </label>
                <textarea
                  value={interactionForm.content}
                  onChange={(e) => setInteractionForm({ ...interactionForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                  placeholder="Detalles de la interacción..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración (minutos)
                  </label>
                  <input
                    type="number"
                    value={interactionForm.duration_minutes}
                    onChange={(e) => setInteractionForm({ ...interactionForm, duration_minutes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resultado
                  </label>
                  <input
                    type="text"
                    value={interactionForm.outcome}
                    onChange={(e) => setInteractionForm({ ...interactionForm, outcome: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                    placeholder="Exitoso, pendiente, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sentimiento
                  </label>
                  <select
                    value={interactionForm.sentiment}
                    onChange={(e) => setInteractionForm({ ...interactionForm, sentiment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
                  >
                    <option value="positive">Positivo</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negativo</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowInteractionModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Save className="w-5 h-5" />
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
