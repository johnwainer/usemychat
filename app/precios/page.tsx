import { Metadata } from 'next';
import { Check, X, Zap, ArrowRight, Star, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Precios - UseMyChat | Planes para Todos los Tamaños',
  description: 'Planes flexibles de UseMyChat para empresas de todos los tamaños. Desde startups hasta empresas. Prueba gratis 14 días sin tarjeta de crédito.',
  keywords: 'precios, planes, suscripción, gratis, trial, UseMyChat, pricing, costos',
  openGraph: {
    title: 'Precios - UseMyChat',
    description: 'Encuentra el plan perfecto para tu negocio',
    type: 'website',
  },
};

export default function Precios() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfecto para emprendedores y pequeños negocios',
      price: '29',
      period: 'mes',
      popular: false,
      features: [
        { text: '1 usuario incluido', included: true },
        { text: '2 canales conectados', included: true },
        { text: '1,000 conversaciones/mes', included: true },
        { text: 'Chatbot básico con IA', included: true },
        { text: 'CRM básico', included: true },
        { text: 'Reportes básicos', included: true },
        { text: 'Soporte por email', included: true },
        { text: 'Integraciones básicas', included: true },
        { text: 'Usuarios adicionales', included: false },
        { text: 'API avanzada', included: false },
        { text: 'Soporte prioritario', included: false },
        { text: 'Onboarding personalizado', included: false }
      ],
      cta: 'Comenzar Gratis',
      highlight: false
    },
    {
      name: 'Professional',
      description: 'Para equipos en crecimiento que necesitan más poder',
      price: '99',
      period: 'mes',
      popular: true,
      features: [
        { text: '5 usuarios incluidos', included: true },
        { text: '5 canales conectados', included: true },
        { text: '10,000 conversaciones/mes', included: true },
        { text: 'Chatbot avanzado con IA', included: true },
        { text: 'CRM completo', included: true },
        { text: 'Reportes avanzados', included: true },
        { text: 'Soporte prioritario', included: true },
        { text: 'Todas las integraciones', included: true },
        { text: 'API completa', included: true },
        { text: 'Campañas automatizadas', included: true },
        { text: 'Usuarios adicionales (+$15/usuario)', included: true },
        { text: 'Onboarding personalizado', included: false }
      ],
      cta: 'Comenzar Prueba',
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'Soluciones personalizadas para grandes empresas',
      price: 'Personalizado',
      period: '',
      popular: false,
      features: [
        { text: 'Usuarios ilimitados', included: true },
        { text: 'Canales ilimitados', included: true },
        { text: 'Conversaciones ilimitadas', included: true },
        { text: 'IA personalizada', included: true },
        { text: 'CRM Enterprise', included: true },
        { text: 'Reportes personalizados', included: true },
        { text: 'Soporte 24/7 dedicado', included: true },
        { text: 'Integraciones personalizadas', included: true },
        { text: 'API sin límites', included: true },
        { text: 'Infraestructura dedicada', included: true },
        { text: 'SLA garantizado 99.9%', included: true },
        { text: 'Onboarding y capacitación', included: true }
      ],
      cta: 'Contactar Ventas',
      highlight: false
    }
  ];

  const addons = [
    {
      name: 'Usuarios Adicionales',
      price: '$15',
      period: 'usuario/mes',
      description: 'Agrega más miembros a tu equipo'
    },
    {
      name: 'Conversaciones Extra',
      price: '$0.01',
      period: 'conversación',
      description: 'Paquetes de 1,000 conversaciones adicionales'
    },
    {
      name: 'WhatsApp Business API',
      price: '$49',
      period: 'mes',
      description: 'Acceso oficial a WhatsApp Business API'
    },
    {
      name: 'Número Dedicado',
      price: '$29',
      period: 'mes',
      description: 'Número telefónico exclusivo para tu negocio'
    }
  ];

  const faqs = [
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejan inmediatamente y ajustamos la facturación de forma prorrateada.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito y débito principales (Visa, Mastercard, American Express), PayPal, y transferencias bancarias para planes Enterprise.'
    },
    {
      question: '¿Hay contrato de permanencia?',
      answer: 'No, todos nuestros planes son mensuales sin compromiso. Puedes cancelar en cualquier momento sin penalizaciones.'
    },
    {
      question: '¿Qué incluye la prueba gratuita?',
      answer: 'La prueba gratuita de 14 días incluye acceso completo al plan Professional sin necesidad de tarjeta de crédito. Puedes probar todas las funcionalidades sin restricciones.'
    },
    {
      question: '¿Ofrecen descuentos por pago anual?',
      answer: 'Sí, al pagar anualmente obtienes 2 meses gratis (equivalente a 16% de descuento). Contacta a ventas para planes personalizados.'
    },
    {
      question: '¿Qué sucede si excedo mi límite de conversaciones?',
      answer: 'Te notificaremos cuando alcances el 80% de tu límite. Puedes comprar paquetes adicionales o actualizar tu plan. No interrumpimos el servicio.'
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
              <Link href="/caracteristicas" className="text-gray-600 hover:text-black transition-colors">
                Características
              </Link>
              <Link href="/precios" className="text-black font-semibold">
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
            Precios simples y transparentes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Elige el plan perfecto para tu negocio. Todos los planes incluyen 14 días de prueba gratuita sin tarjeta de crédito.
          </p>
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">Ahorra 20% con pago anual</span>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-2xl p-8 border-2 ${
                  plan.highlight 
                    ? 'border-black bg-gray-50 shadow-xl scale-105' 
                    : 'border-gray-200 bg-white'
                } transition-all hover:shadow-lg relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                  <div className="mb-6">
                    {plan.price === 'Personalizado' ? (
                      <div className="text-4xl font-bold text-black">Personalizado</div>
                    ) : (
                      <>
                        <span className="text-5xl font-bold text-black">${plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </>
                    )}
                  </div>
                  <Link 
                    href={plan.name === 'Enterprise' ? '/contacto' : '/register'}
                    className={`block w-full py-3 rounded-full font-semibold transition-all ${
                      plan.highlight
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-white text-black border-2 border-gray-200 hover:border-black'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Complementos Adicionales</h2>
            <p className="text-xl text-gray-600">
              Personaliza tu plan con estos add-ons opcionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addons.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-black transition-all">
                <h3 className="text-lg font-bold text-black mb-2">{addon.name}</h3>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-black">{addon.price}</span>
                  <span className="text-gray-600 text-sm">/{addon.period}</span>
                </div>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <Users className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">10,000+</h3>
              <p className="text-gray-600">Empresas confían en nosotros</p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">99.9%</h3>
              <p className="text-gray-600">Uptime garantizado</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">50M+</h3>
              <p className="text-gray-600">Mensajes procesados al mes</p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre nuestros precios
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-black mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Prueba UseMyChat gratis durante 14 días. No se requiere tarjeta de crédito.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all inline-flex items-center">
              Comenzar Prueba Gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contacto" className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-black transition-all">
              Hablar con Ventas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
