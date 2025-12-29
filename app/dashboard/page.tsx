'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Users, TrendingUp, Bot, ArrowUp, ArrowDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profileData);

      // Get or create statistics
      let { data: statsData } = await supabase
        .from('user_statistics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!statsData) {
        // Create initial statistics
        const { data: newStats } = await supabase
          .from('user_statistics')
          .insert({ user_id: user.id })
          .select()
          .single();
        
        statsData = newStats;
      }

      // Update statistics
      await supabase.rpc('update_user_statistics', { p_user_id: user.id });

      // Fetch updated statistics
      const { data: updatedStats } = await supabase
        .from('user_statistics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setStats(updatedStats);
      setLoading(false);
    };

    fetchData();
  }, []);

  const statCards = [
    {
      name: 'Conversaciones',
      value: stats?.total_conversations || 0,
      change: '+12%',
      changeType: 'increase',
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      name: 'Mensajes',
      value: stats?.total_messages || 0,
      change: '+23%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Contactos',
      value: stats?.total_contacts || 0,
      change: '+8%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Bots Activos',
      value: stats?.active_bots || 0,
      change: '0%',
      changeType: 'neutral',
      icon: Bot,
      color: 'bg-orange-500',
    },
  ];

  const recentActivity = [
    {
      action: 'Nueva conversación',
      description: 'Conversación iniciada con cliente',
      time: 'Hace 5 minutos',
      icon: MessageSquare,
    },
    {
      action: 'Contacto agregado',
      description: 'Nuevo contacto en CRM',
      time: 'Hace 1 hora',
      icon: Users,
    },
    {
      action: 'Bot activado',
      description: 'Bot de bienvenida activado',
      time: 'Hace 2 horas',
      icon: Bot,
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Trial Banner */}
      {profile?.subscription_status === 'trial' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-blue-900">
                Período de prueba activo
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Te quedan {Math.ceil((new Date(profile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} días de prueba gratuita
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
              Actualizar Plan
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                  ) : stat.changeType === 'decrease' ? (
                    <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
                  ) : null}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Stats */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas del Mes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Conversaciones</p>
                  <p className="text-xs text-gray-500">Este mes</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {stats?.conversations_this_month || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Mensajes</p>
                  <p className="text-xs text-gray-500">Este mes</p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {stats?.messages_this_month || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors">
            <MessageSquare className="w-5 h-5 mr-2" />
            <span className="font-medium">Nueva Conversación</span>
          </button>
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-medium">Agregar Contacto</span>
          </button>
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors">
            <Bot className="w-5 h-5 mr-2" />
            <span className="font-medium">Crear Bot</span>
          </button>
          <button className="flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-black transition-colors">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium">Ver Reportes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
