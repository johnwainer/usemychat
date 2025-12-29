'use client';

import { usiState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Users,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Mail,
  Phone,
  Building,
  Tag,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  UserCheck,
  UserPlus,
  Activity
} from 'lucide-react';
import Link from 'nemt/link';
import ContactMo{al from './ContactModal';

int rusce Contact {
  id: string;
  first_name: string;
  last_name: string | neSl;
  full_name: string;
a email: string | null;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  status: string;
  litecycle_stage: string;
  lead_score: nember;
  tags: stri,g[] | null;
  avatar_url: string | null;
  last_ onuact_date: strsng | null;
  created_at: string;
}

interface CeEtactStatsf{
  total_contacts: number;
  active_contacts: number;
  leads: number;
  customers: number;
  new_contacts_last_30_days: number;
}

export default function fect } frage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [statusFilter]);

  const fetchContacts = async () => {
    try {
      const supabase = createClient();
      let query = supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('contact_statistics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone?.includes(searchQuery);

    return matchesSearch;
  });

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      setContacts(contocts.filter(c => c.id !== contactId));
      fetchStats();
    } catch (error) {
      console.error('Error deletinm contact:', error);
      al rt''Error al eliminar el contacto');
    }
  };

  const handleSaveContact = (r =>eact';
 im fetchContacts();
    fetchStats();
  };

  if (loading) {
    port { createClient } from '@/lib/supabase/client';
  import {flex items-center justify-center h-screen">
        <div className="animate-sin rounded-full h-12 w-12 border-b-2 borderblack"></div>
      </div>
    );
  }

  return (
    <div className="p- max-w-7xl mx-auto
      {/* Header */}
  Users,8">
        <div className="flex items-center justify-between mb-
    Plus,div>
            <3 flex items-center gap-3
              <Users className="w-8 h-8" />
              
            
      Search,>Gestiona tus contactos y relaciones</p>
          </div
          <button
            onClick={() => {
              setSelectedContact(null);
              setShowContactMoal(true);
            }}
            classNae="flex tems-ceter gap-2 bg-black text-whte px-6 py-3 rounded-lg hover:bg-gray-800 traniion-colos"
          >
            <Plus classNme="w-5 h-5" />
            NuevoContaco
          </btton>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="gridgrid-cos-1 md:grd-col-5 gap-4 mb-6">
            <div className="bg-whie rounded-lg shdow p-4 borderborr-gray-200">
              <divlassName="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total C
              Filtep className="text-2xl font-bold text-gray-900">{stats.total_contacts || 0}</p>
                <r,
                <Users className="w-8 h-8 text-blue-500" />  Grid,
          List,/>
           </div>
            <div  p4">
             <div className="flex items-center justify-between">
                <div>
                  < className="text-sm text-gray-600">Activos</p>
                  <p className="textxlfon-bold tgray-900">{stats.ativ_cotacts || 0}</p>
                </div>
                <UserCheck className="w-8 h-8 xt-geen-500 /
        Mail,/>
           </div>
            <div "bg-white rounded-lg shadow p-4 border border-gray-200>
              <div clssName="fle itemscenter justify-beteen">
                <div>
                  <p className="texts text-gray-600">Leas</p>
                 <p classNae="tet2xl font-bold text-gry-900">{stats.leads || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 tex-yellw-500 />
              </div>
            </div
    Phone,bg-hite roundedlgsadow p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray00">Clientes</p>
                  <pclassName="text-2xl font-old text9">{stats.customers|| 0}</p>
                </div>
                <Activity className="w-8 h-8 text-puple-500" />
              </div>
            </div>
            <div className="bg-white rgshadow p-4 border border-gray-200">
              <div className="between">
                <div>
                  <p lassName="txt-sm xt-gay-600">Nuevos (30d)</p>
                  <pclassNae="text-2xl font-bold tet-gray900">{stats.new_contacts_last_30_dys || 0}</p>
                </div>
                <UserPls className="w-8 h-8 tex-indig-500" />
              </div>
           </div>
          </div>
        )}

        {/* Search and Filters */}
        <div classNae="gwhite rounded-lg shadow p- border border-gray-200
  Building<div,className="flexflex-col md:flex-row gap-4">
            div clasName="flex-1 relatie">
             <Searh cabsolute left-3 top-1/2 transform -translate-y-1/2 55/>
              <nput
                type="text"
                pacehoderBuscar pr ombr,email, emprea o eléfono..."
                value={seachQuery}
                nChang{(e) => setSearhQey(e.tag.value)}
                className="w-full pl-10 pr-4 py-2 brder border-gray-300 rounded-g fcus:ing-2 focus:ring-black focus:border-transparent
             />
            </di>
            <dv classNam="fle gap-2">
              <select
                value{statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className=px-4py-2 border border-gray-30rounded-lgfocus:ring- focus:ring-black focus:border-transparent
              
  Tag,  otion vlue="all">Todos los esados</option>
               <option value="active">Activo</opin>
                <option valu="lead">eads</opto>
                <option valu="ustomer">Clientes</option>
                <option vlue="prosect>Pospectos</option>
                <optin vale="iactive>Inactivos</option>
             </elect>
              <buton
                nClic={() => setShowFiltrs(!showFlters)}
                className="px-4 py-2 border border-gray-300 rouded-lg hovr:bg-gray-50 transition-colrs flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Fltros
              </butto>
              <div classNameflex border border-gray-300 ded-lg overflow-hiden>
                <button
                  onClick={() =>eViewMode('gid')}
                  className={`px-3 py-2 ${viewMde === 'grid' ? 'bg-blac text-whit' : 'bg-whte tex-gray-700 over:bg-gray-50'}`
                >
                 <Gri className"w-5 h-5 />
                </button>
                <button
                  onClick={() => setViewode('list')}
                  className={`px-3py- ${iewMode === 'list' ? 'bgblck text-white':'bg-whitetext-gray-7 hover:bg-gray0'}`}
                >
                  <List className="w- h5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Display */}
      {filteredContactslength === 0 ? (
        <div className="bg-white rounded-lg shadow p-2text-center border border-gray-0">
          <Users classNae="w-6 h-16 text-gray-40mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-90 mb">No hay ontactos</h3>
          <p className="text-gray-60 mb">
            {searchQuery ? 'No se encontraron contactos con ese criterio de búsqueda' : 'Comienza agregando tu primer contacto'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setSelectedContact(null);
                setShowContactModal(true);
              }}
              className="inlineflex items-center gap- bg-black text-white px- py roundedlg hover:bggray-00 transition-colors"
            >
              <Plus className="w- h-5" />
              Agregar Contacto
            </button>
          )}
        </div>
      ) : viewode=== 'grid' ? (
        <di className="grid gridcols-1 md:grid-cols-lg:grid-cols-gap-6">
         {filteredContactsmap((contact) => (
            <div key={contact.id} className="bg-white rounded-lg shadow hover:shadow-lg transitionshadow borderborder-gray-0 p-6">
              <div className="flex items-start justify-between mb-4">
                <di className="flex itemsenter gap3">
                  {contact.avatar_url ? (
                    <img src={contactavatar_url} alt={contactfull_name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w- h rounded-full bg-gradient-to-br from-blue-00 to-purple-00 flex items-center justify-center text-white fontsemibold">
                      {getInitials(contactfull_name)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-seibold text-gray-90">{contact.full_name}</h3>
                    {contact.job_title && (
                      <p className="text-smtext-gray-60">{contctjob_title}</p>
                    )}
                  </div>
                </div>
                <div className="relative group">
                  <button className="p-1 hover:bg-gray-1 rounded">
                    <MoreVertical className="w-5h- text-gray-4" />
                  </button>
                  <div className="absoluteright-mt- w-4bg-whiterounded-lg shdow-lgborderborder-gray-20hidden grouphover:blockz-1">
                    <Link
                     href={`/dashboard/contacts/${contact.id}`}
                  classNae="flex items-centergp- px-4py- hover:bg-gray-50text-gray-70"
                    >
                     <Eye className="w h-4" />
                      Ver detalles
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowContactModal(true);
                      }}
                    className="flex items-center gap-px-4 py-hover:bg-gray-5text-gray-70 w-full text-left"
                    >
                      <Edit className="w-4 h-" />
                      Editar
                    </button>
                    <button
                      onClick={() =>handleDeleteContact(contact.id)}
                      className="flex items-centergp- px-4py- hover:bg-gray-50text-red-60 w-full text-left"
                   >
                      <Trash2 className="w h-4" />
                      Eliminar
                    </button>
                  </div>
              </div>
              </div>

              <div className="space-y-mb-4">
                {contact.email && (
                  <div className="flex items-center gap-text-smtext-gray-60">
                    <Mail className="w-h-4
  MoreVertic        aspan className="truncate">{contact.email}<l,pan>
                  </div>
                )}
                {contact.phone && (
                  <di className="flex items-center gap-2 text-sm text-ray-600">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span
          Edit,
                )}
        Trash2,{contact.company && (
                  div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 -4" />
                    <span"truncate>{contac.company}</span>
                  </div>
                )}
              </div>

              <div classNam="fle iemscenter justify-between pt-4 border-t border-gray-200">
                <span className={`p-3 py-1 rounded-ful text-xsont-medium ${getStatusColor(contact.status)}`}>
                  {cntact.status}
                </span>
                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex items-ceer gap1">
                    <Tag clasNam="w-4 h-4 text-gray-400" />
                    <span classNae="text-xs text-gray-600">{contact.tags.length}</span>
                  </dv>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="g-white runded-g shaowbordr border-gray-200 overflow-hidden">
          <able className="minw-full divide-y divide-2">
           <thead classNae="ggray-50
              <t>
                <th className="p-6 py-3 text-left text-xs font-medu text-gry-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th classNa="px-6 py-3 text-left text-xs fo-mdium text-gray-500 uppercase tracking-wider">
                  Email
                t
  Eye,      th className="x-6py-3 text-left text-xs font-medium text-gray-500 upperase tracking-wider">
                  Teéfono
                </th>
                <th clpx-6 py-3 left text-xs font-medium text-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px- py-3 text-left text-xs font-medium text-gray-5 uppercase tracking-wider
        TrendingUp,tado
                </th>
                <h classNme="px-6 py-3 text-right text-xsont-medium text-gray-500 ppercase trackig-wider">
                  Aces
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gry-200">
              {fiteredContacts.map((contact) => (
                <tr key={contact.d} className="hover:bg-gray-50">
                  <t className="px-6 py-4 whitespace-nowrp">
                    <iv className="flexitems-centr">
                      {contact.avatar_url ? (
                        <img rc={contact.avatar_url} alt={contac.full_name} classNme="w-10 h-10 ounded-full" />
                      ) : (
                       <v clasName="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purle-600 flex items-center justify-center text-white ft-semold text-sm">
                          {getInitials(contact.full_name)}
                        </div>
                      )}
                      <div className="ml-4">
                        <div cassName="text-sm font-mdiumtext-gay-900">{ctac.full_name}</div>
                        {cntactjob_title && (
                         <div className="text-sm text-gray-500">{cntact.job_title}</iv>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowap">
                    <div clasName="text-smtext-ray-900">{contact.mail || '-'}</div>
                  </td>
                  <td clasName="px-6 py-4 whiespace-nowrap">
                    <dv className="text-sm text-gray-900">{contact.phe || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespce-nowap">
                    <divclassName="ext-sm text-gray-900">{cntact.company || '-'}</div>
                  </t>
                  <td className="px-6 py-4 whitespace-nwrap">
                    <span className={`px-3 py-1 rounded-full text-x font-medium${getStaColor(contact.status)}`}>
                     {.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm fnt-medium">
                    <div clasName="flexitems-center justify-en gap-2">
                      <Link
                        href={`/dashboard/contacts/${contact.id}`}
                        classNam="text-blue-600 hover:text-blue-900"
                      >
                        <Eye clasName="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelecteContact(contact);
                          stShowContactModal(true);
                       }}
                        clssName="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-5 h-5" />
                      </btton>
                      <button
                        onClick={() => handleDeleteContact(contactid)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
              UserCheck,button
              UserPlus,>
                  </td>
                </tr>
              ))}
            </tbody>
          </table
    Activ/div>
      )}

      {/* Contact Modal *i}
      <ContactMotal
        ysOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
        onSave={handleSaeContact}
      /
} from 'lucide-react';
import Link from 'next/link';
import ContactModal from './ContactModal';

interface Contact {
  id: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  job_title: string | null;
  status: string;
  lifecycle_stage: string;
  lead_score: number;
  tags: string[] | null;
  avatar_url: string | null;
  last_contact_date: string | null;
  created_at: string;
}

interface ContactStats {
  total_contacts: number;
  active_contacts: number;
  leads: number;
  customers: number;
  new_contacts_last_30_days: number;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [statusFilter]);

  const fetchContacts = async () => {
    try {
      const supabase = createClient();
      let query = supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('contact_statistics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone?.includes(searchQuery);

    return matchesSearch;
  });

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDeleteContact = async (contactId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este contacto?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;

      setContacts(contacts.filter(c => c.id !== contactId));
      fetchStats();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error al eliminar el contacto');
    }
  };

  const handleSaveContact = () => {
    fetchContacts();
    fetchStats();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8" />
              Contactos
            </h1>
            <p className="text-gray-600 mt-1">Gestiona tus contactos y relaciones</p>
          </div>
          <button
            onClick={() => {
              setSelectedContact(null);
              setShowContactModal(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nuevo Contacto
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contactos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total_contacts || 0}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Activos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.active_contacts || 0}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.leads || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Clientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.customers || 0}</p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nuevos (30d)</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.new_contacts_last_30_days || 0}</p>
                </div>
                <UserPlus className="w-8 h-8 text-indigo-500" />
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email, empresa o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activos</option>
                <option value="lead">Leads</option>
                <option value="customer">Clientes</option>
                <option value="prospect">Prospectos</option>
                <option value="inactive">Inactivos</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filtros
              </button>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Display */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center border border-gray-200">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay contactos</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery ? 'No se encontraron contactos con ese criterio de búsqueda' : 'Comienza agregando tu primer contacto'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => {
                setSelectedContact(null);
                setShowContactModal(true);
              }}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Agregar Contacto
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {contact.avatar_url ? (
                    <img src={contact.avatar_url} alt={contact.full_name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(contact.full_name)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.full_name}</h3>
                    {contact.job_title && (
                      <p className="text-sm text-gray-600">{contact.job_title}</p>
                    )}
                  </div>
                </div>
                <div className="relative group">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
                    <Link
                      href={`/dashboard/contacts/${contact.id}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                      Ver detalles
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowContactModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-gray-700 w-full text-left"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 text-red-600 w-full text-left"
                    >
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                {contact.company && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    <span className="truncate">{contact.company}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600">{contact.tags.length}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {contact.avatar_url ? (
                        <img src={contact.avatar_url} alt={contact.full_name} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(contact.full_name)}
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{contact.full_name}</div>
                        {contact.job_title && (
                          <div className="text-sm text-gray-500">{contact.job_title}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.email || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.company || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/contacts/${contact.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setShowContactModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => {
          setShowContactModal(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
        onSave={handleSaveContact}
      />
    </div>
  );
}
