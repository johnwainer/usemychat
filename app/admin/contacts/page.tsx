'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Building, 
  Mail, 
  Phone,
  TrendingUp,
  Download,
  Loader2
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
  status: string;
  lifecycle_stage: string;
  lead_score: number;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
    company: string | null;
  };
}

interface Stats {
  total_contacts: number;
  active_contacts: number;
  total_users_with_contacts: number;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userFilter, setUserFilter] = useState<string>('all');
  const [users, setUsers] = useState<Array<{ id: string; full_name: string; email: string }>>([]);

  useEffect(() => {
    fetchData();
  }, [statusFilter, userFilter]);

  const fetchData = async () => {
    try {
      const supabase = createClient();
      
      // Fetch stats
      const { data: statsData } = await supabase
        .from('contacts')
        .select('id, status, user_id');
      
      if (statsData) {
        const uniqueUsers = new Set(statsData.map(c => c.user_id));
        setStats({
          total_contacts: statsData.length,
          active_contacts: statsData.filter(c => c.status === 'active').length,
          total_users_with_contacts: uniqueUsers.size
        });
      }

      // Fetch users for filter
      const { data: usersData } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .eq('role', 'client')
        .order('full_name');
      
      if (usersData) {
        setUsers(usersData);
      }

      // Fetch contacts with user info
      let query = supabase
        .from('contacts')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            company
          )
        `)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (userFilter !== 'all') {
        query = query.eq('user_id', userFilter);
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
      alert('Contacto eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error al eliminar el contacto');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.full_name?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.company?.toLowerCase().includes(searchLower) ||
      contact.profiles?.full_name?.toLowerCase().includes(searchLower) ||
      contact.profiles?.email?.toLowerCase().includes(searchLower)
    );
  });

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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Gestión de Contactos</h1>
        <p className="text-gray-400 mt-1">Administra todos los contactos de los clientes</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Contactos</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.total_contacts}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contactos Activos</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.active_contacts}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Clientes con Contactos</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.total_users_with_contacts}</p>
              </div>
              <Building className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contactos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="lead">Lead</option>
            <option value="customer">Cliente</option>
            <option value="prospect">Prospecto</option>
            <option value="blocked">Bloqueado</option>
          </select>

          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos los clientes</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name || user.email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    No se encontraron contactos
                  </td>
                </tr>
              ) : (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {contact.first_name?.[0]}{contact.last_name?.[0]}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{contact.full_name}</div>
                          <div className="text-sm text-gray-400">{contact.lifecycle_stage}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{contact.profiles?.full_name}</div>
                      <div className="text-sm text-gray-400">{contact.profiles?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{contact.email || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{contact.phone || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{contact.company || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-300">{contact.lead_score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/contacts/${contact.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <div className="text-center text-gray-400 text-sm">
        Mostrando {filteredContacts.length} de {contacts.length} contactos
      </div>
    </div>
  );
}
