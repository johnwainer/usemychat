'use client';

import { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, TrendingUp, MessageSquare, Activity, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Get all users
      const { data: allUsers } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'client')
        .order('created_at', { ascending: false });

      // Calculate stats
      const activeUsers = allUsers?.filter(u => u.status === 'active').length || 0;
      const inactiveUsers = allUsers?.filter(u => u.status === 'inactive').length || 0;
      const newUsersThisMonth = allUsers?.filter(u => {
        const createdDate = new Date(u.created_at);
        const now = new Date();
        return createdDate.getMonth() === now.getMonth() && 
               createdDate.getFullYear() === now.getFullYear();
      }).length || 0;

      // Get total conversations and messages
      const { count: totalConversations } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true });

      const { count: totalMessages } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: allUsers?.length || 0,
        activeUsers,
        inactiveUsers,
        newUsersThisMonth,
        totalConversations: totalConversations || 0,
        totalMessages: totalMessages || 0,
      });

      // Get recent users
      setRecentUsers(allUsers?.slice(0, 5) || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      name: 'Total Usuarios',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: `+${stats?.newUsersThisMonth || 0} este mes`,
    },
    {
      name: 'Usuarios Activos',
      value: stats?.activeUsers || 0,
      icon: UserCheck,
      color: 'bg-green-500',
      change: 'En línea',
    },
    {
      name: 'Usuarios Inactivos',
      value: stats?.inactiveUsers || 0,
      icon: UserX,
      color: 'bg-red-500',
      change: 'Desactivados',
    },
    {
      name: 'Conversaciones',
      value: stats?.totalConversations || 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
      change: 'Total',
    },
    {
      name: 'Mensajes',
      value: stats?.totalMessages || 0,
      icon: Activity,
      color: 'bg-orange-500',
      change: 'Total',
    },
    {
      name: 'Nuevos este mes',
      value: stats?.newUsersThisMonth || 0,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      change: 'Registros',
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-1">Vista general del sistema</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Usuarios Recientes</h2>
            <p className="text-sm text-gray-600 mt-1">Últimos usuarios registrados</p>
          </div>
          <Link 
            href="/admin/users"
            className="text-sm font-semibold text-black hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.full_name || 'Sin nombre'}</div>
                        <div className="text-sm text-gray-500">{user.company || 'Sin empresa'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {user.subscription_plan || 'starter'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 
                       user.status === 'inactive' ? 'Inactivo' : 
                       user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString('es-ES')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/admin/users"
            className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <Users className="w-5 h-5 mr-2" />
            <span className="font-medium">Gestionar Usuarios</span>
          </Link>
          <Link 
            href="/admin/activity"
            className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <Activity className="w-5 h-5 mr-2" />
            <span className="font-medium">Ver Actividad</span>
          </Link>
          <Link 
            href="/admin/stats"
            className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium">Estadísticas</span>
          </Link>
          <Link 
            href="/admin/settings"
            className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors"
          >
            <Settings className="w-5 h-5 mr-2" />
            <span className="font-medium">Configuración</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
