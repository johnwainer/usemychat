'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { BarChart3, TrendingUp, Users, MessageSquare, Calendar, Activity } from 'lucide-react';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalConversations: number;
  totalMessages: number;
  newUsersThisMonth: number;
  messagesThisMonth: number;
  conversationsThisMonth: number;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalConversations: 0,
    totalMessages: 0,
    newUsersThisMonth: 0,
    messagesThisMonth: 0,
    conversationsThisMonth: 0
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

      const [
        { count: totalUsers },
        { count: activeUsers },
        { count: totalConversations },
        { count: totalMessages },
        { count: newUsersThisMonth },
        { count: messagesThisMonth },
        { count: conversationsThisMonth }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('conversations').select('*', { count: 'exact', head: true }),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', firstDayOfMonth),
        supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', firstDayOfMonth),
        supabase.from('conversations').select('*', { count: 'exact', head: true }).gte('created_at', firstDayOfMonth)
      ]);

      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalConversations: totalConversations || 0,
        totalMessages: totalMessages || 0,
        newUsersThisMonth: newUsersThisMonth || 0,
        messagesThisMonth: messagesThisMonth || 0,
        conversationsThisMonth: conversationsThisMonth || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue,
    color = 'blue' 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    trend?: 'up' | 'down'; 
    trendValue?: string;
    color?: string;
  }) => {
    const colorClasses = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      pink: 'from-pink-500 to-pink-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value.toLocaleString()}</p>
            {trendValue && (
              <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-7 h-7" />
          Estadísticas del Sistema
        </h1>
        <p className="text-gray-600 mt-1">Análisis detallado del rendimiento y uso de la plataforma</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Generales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total de Usuarios"
            value={stats.totalUsers}
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Usuarios Activos"
            value={stats.activeUsers}
            icon={Activity}
            color="green"
          />
          <StatCard
            title="Total de Conversaciones"
            value={stats.totalConversations}
            icon={MessageSquare}
            color="purple"
          />
          <StatCard
            title="Total de Mensajes"
            value={stats.totalMessages}
            icon={MessageSquare}
            color="orange"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Estadísticas del Mes Actual
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Nuevos Usuarios"
            value={stats.newUsersThisMonth}
            icon={Users}
            trend="up"
            trendValue={`${stats.totalUsers > 0 ? ((stats.newUsersThisMonth / stats.totalUsers) * 100).toFixed(1) : 0}% del total`}
            color="indigo"
          />
          <StatCard
            title="Conversaciones Creadas"
            value={stats.conversationsThisMonth}
            icon={MessageSquare}
            trend="up"
            trendValue={`${stats.totalConversations > 0 ? ((stats.conversationsThisMonth / stats.totalConversations) * 100).toFixed(1) : 0}% del total`}
            color="pink"
          />
          <StatCard
            title="Mensajes Enviados"
            value={stats.messagesThisMonth}
            icon={MessageSquare}
            trend="up"
            trendValue={`${stats.totalMessages > 0 ? ((stats.messagesThisMonth / stats.totalMessages) * 100).toFixed(1) : 0}% del total`}
            color="purple"
          />
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Actividad</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Tasa de usuarios activos</span>
            <span className="font-semibold text-gray-900">
              {stats.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Promedio de mensajes por conversación</span>
            <span className="font-semibold text-gray-900">
              {stats.totalConversations > 0 ? (stats.totalMessages / stats.totalConversations).toFixed(1) : 0}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Promedio de conversaciones por usuario</span>
            <span className="font-semibold text-gray-900">
              {stats.totalUsers > 0 ? (stats.totalConversations / stats.totalUsers).toFixed(1) : 0}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">Crecimiento de usuarios este mes</span>
            <span className="font-semibold text-green-600">
              +{stats.newUsersThisMonth} usuarios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
