'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Activity, Filter, Calendar, User, FileText, Search } from 'lucide-react';

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details: any;
  created_at: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

export default function AdminActivityPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          *,
          profiles (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesAction = filterAction === 'all' || activity.action === filterAction;
    const matchesSearch = 
      activity.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesAction && matchesSearch;
  });

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      'login': 'Inicio de sesión',
      'logout': 'Cierre de sesión',
      'register': 'Registro',
      'profile_updated': 'Perfil actualizado',
      'status_updated': 'Estado actualizado',
      'password_reset': 'Contraseña restablecida',
      'conversation_created': 'Conversación creada',
      'message_sent': 'Mensaje enviado',
      'contact_added': 'Contacto agregado',
      'bot_created': 'Bot creado'
    };
    return labels[action] || action;
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      'login': 'bg-green-100 text-green-800',
      'logout': 'bg-gray-100 text-gray-800',
      'register': 'bg-blue-100 text-blue-800',
      'profile_updated': 'bg-yellow-100 text-yellow-800',
      'status_updated': 'bg-purple-100 text-purple-800',
      'password_reset': 'bg-orange-100 text-orange-800'
    };
    return colors[action] || 'bg-gray-100 text-gray-800';
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-7 h-7" />
          Registro de Actividad
        </h1>
        <p className="text-gray-600 mt-1">Monitorea todas las acciones realizadas en el sistema</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por usuario o acción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="all">Todas las acciones</option>
            <option value="login">Inicios de sesión</option>
            <option value="register">Registros</option>
            <option value="profile_updated">Actualizaciones de perfil</option>
            <option value="status_updated">Cambios de estado</option>
            <option value="password_reset">Restablecimientos de contraseña</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detalles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha y hora
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {activity.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {activity.profiles?.full_name || 'Usuario desconocido'}
                        </div>
                        <div className="text-sm text-gray-500">{activity.profiles?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionColor(activity.action)}`}>
                      {getActionLabel(activity.action)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {activity.details && typeof activity.details === 'object' ? (
                        <div className="space-y-1">
                          {Object.entries(activity.details).map(([key, value]) => (
                            <div key={key} className="text-xs">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        activity.details || '-'
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(activity.created_at).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay actividad registrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterAction !== 'all'
                ? 'Intenta ajustar los filtros de búsqueda'
                : 'Aún no se han registrado actividades en el sistema'}
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Mostrando {filteredActivities.length} de {activities.length} actividades
      </div>
    </div>
  );
}
