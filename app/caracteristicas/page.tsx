import { Metadata } from 'next';
import { MessageSquare, Zap, BarChart3, Users, Bot, Globe, Shield, Smartphone, Clock, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Características - UseMyChat | Plataforma Omnicanal con IA',
  description: 'Descubre todas las características de UseMyChat: gestión omnicanal, automatización con IA, CRM integrado, análisis en tiempo real y más. Potencia tu comunicación empresarial.',
  keywords: 'características, omnicanal, IA, automatización, CRM, WhatsApp Business, chatbot, análisis, UseMyChat',
  openGraph: {
    title: 'Características - UseMyChat',
    description: 'Todas las herramientas que necesitas para gestionar tu comunicación empresarial',
    type: 'website',
  },
};

export default function Caracteristicas() {
  const mainFeatures = [
    {
      icon: MessageSquare,
      title: 'Gestión Omnicanal',
      description: 'Centraliza todas tus conversaciones de WhatsApp, Instagram, Facebook, Telegram y más en una sola plataforma.',
      benefits: [
        'Bandeja de entrada unificada',
        'Respuestas desde un solo lugar',
        'Historial completo de conversaciones',
        'Sincronización en tiempo real'
      ]
    },
    {
      icon: Bot,
      title: 'Automatización con IA',
      description: 'Chatbots inteligentes que responden automáticamente y aprenden de cada interacción.',
      benefits: [
        'Respuestas automáticas 24/7',
        'Procesamiento de lenguaje natural',
        'Aprendizaje continuo',
        'Personalización por cliente'
      ]
    },
    {
      icon: Users,
      title: 'CRM Integrado',
      description: 'Gestiona tus clientes, leads y oportunidades sin salir de la plataforma.',
      benefits: [
        'Perfiles de cliente completos',
        'Seguimiento de leads',
        'Pipeline de ventas',
        'Etiquetas y segmentación'
      ]
    },
    {
      icon: BarChart3,
      title: 'Análisis en Tiempo Real',
      description: 'Métricas detalladas y reportes para tomar decisiones basadas en datos.',
      benefits: [
        'Dashboard personalizable',
        'Métricas de rendimiento',
        'Reportes exportables',
        'Análisis de sentimiento'
      ]
    },
    {
      icon: Zap,
      title: 'Campañas Automatizadas',
      description: 'Crea y programa campañas de marketing multicanal con facilidad.',
      benefits: [
        'Envíos masivos programados',
        'Segmentación avanzada',
        'A/B testing',
        'Seguimiento de conversiones'
      ]
    },
    {
      icon: Globe,
      title: 'Integraciones',
      description: 'Conecta con tus herramientas favoritas y automatiza flujos de trabajo.',
      benefits: [
        'API REST completa',
        'Webhooks personalizables',
        'Zapier, Make, n8n',
        'Integraciones nativas'
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: 'Seguridad Empresarial',
      description: 'Encriptación end-to-end, cumplimiento GDPR/LGPD, autenticación 2FA'
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Aplicaciones nativas para iOS y Android, responde desde cualquier lugar'
    },
    {
      icon: Clock,
      title: 'Horarios de Atención',
      description: 'Configura horarios, mensajes automáticos fuera de horario, turnos de equipo'
    },
    {
      icon: TrendingUp,
      title: 'Escalabilidad',
      description: 'Crece sin límites, infraestructura cloud, alta disponibilidad 99.9%'
    }
  ];

  const useCases = [
    {
      title: 'E-commerce',
      description: 'Automatiza confirmaciones de pedidos, seguimiento de envíos y atención al cliente.',
      features: ['Catálogo de productos', 'Carrito de compras', 'Pagos integrados', 'Notificaciones de envío']
    },
    {
      title: 'Servicios',
      description: 'Agenda citas, envía recordatorios y gestiona reservas automáticamente.',
      features: ['Calendario integrado', 'Recordatorios automáticos', 'Confirmaciones', 'Reprogramación fácil']
    },
    {
      title: 'Soporte',
      description: 'Resuelve tickets, asigna agentes y mide satisfacción del cliente.',
      features: ['Sistema de tickets', 'Asignación inteligente', 'SLA tracking', 'Encuestas CSAT']
    },
    {
      title: 'Marketing',
      description: 'Lanza campañas, nutre leads y convierte más con automatización.',
      features: ['Drip campaigns', 'Lead scoring', 'Segmentación', 'ROI tracking']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-black">UseMyChat</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/caracteristicas" className="text-black font-semibold">
                Características
              </Link>
              <Link href="/precios" className="text-gray-600 hover:text-black transition-colors">
                Precios
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Todo lo que necesitas para
            <br />
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              gestionar tu comunicación
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Una plataforma completa con todas las herramientas para centralizar, automatizar y optimizar la comunicación con tus clientes.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all inline-flex items-center">
              Comenzar Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contacto" className="bg-white text-black px-8 py-4 rounded-full font-semibold border-2 border-gray-200 hover:border-black transition-all">
              Agendar Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Características Principales</h2>
            <p className="text-xl text-gray-600">
              Herramientas poderosas diseñadas para impulsar tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-black transition-all group">
                <feature.icon className="w-12 h-12 text-black mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Más Características</h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas en una sola plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <feature.icon className="w-10 h-10 text-black mb-4" />
                <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Casos de Uso</h2>
            <p className="text-xl text-gray-600">
              Soluciones adaptadas a tu industria
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-6">{useCase.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {useCase.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-black mr-2 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para transformar tu comunicación?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de empresas que ya confían en UseMyChat
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Comenzar Gratis
            </Link>
            <Link href="/precios" className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-black transition-all">
              Ver Precios
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
