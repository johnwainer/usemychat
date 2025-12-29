'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "¿Qué es UseMyChat?",
        a: "UseMyChat es una plataforma omnicanal con IA integrada que te permite gestionar todas tus conversaciones de WhatsApp, Instagram, Facebook, Telegram y más canales desde un solo lugar. Incluye CRM, automatización, bots con IA y analytics avanzado."
      },
      {
        q: "¿Necesito conocimientos técnicos para usar UseMyChat?",
        a: "No, UseMyChat está diseñado para ser intuitivo y fácil de usar. No necesitas conocimientos técnicos. Nuestra interfaz es amigable y ofrecemos tutoriales y soporte 24/7 para ayudarte en todo momento."
      },
      {
        q: "¿Cuánto tiempo toma implementar UseMyChat?",
        a: "La implementación básica toma solo minutos. Puedes conectar tus canales y comenzar a recibir mensajes inmediatamente. La configuración avanzada de bots y flujos puede tomar más tiempo según tus necesidades."
      }
    ]
  },
  {
    category: "Precios y Planes",
    questions: [
      {
        q: "¿Tienen plan gratuito?",
        a: "Sí, ofrecemos un plan gratuito con funcionalidades básicas para que puedas probar la plataforma. Incluye hasta 100 conversaciones mensuales y acceso a las funciones principales."
      },
      {
        q: "¿Puedo cambiar de plan en cualquier momento?",
        a: "Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejan inmediatamente y solo pagas la diferencia prorrateada."
      },
      {
        q: "¿Ofrecen descuentos por pago anual?",
        a: "Sí, ofrecemos hasta 20% de descuento en planes anuales. Contacta a nuestro equipo de ventas para conocer las ofertas especiales disponibles."
      }
    ]
  },
  {
    category: "Integraciones",
    questions: [
      {
        q: "¿Qué canales puedo integrar?",
        a: "Puedes integrar WhatsApp Business API, Instagram Direct, Facebook Messenger, Telegram, Email, SMS, y más. Constantemente agregamos nuevos canales según la demanda de nuestros usuarios."
      },
      {
        q: "¿Se integra con mi CRM actual?",
        a: "UseMyChat incluye un CRM integrado, pero también ofrecemos integraciones con los principales CRMs del mercado como Salesforce, HubSpot, Zoho, y más a través de API y webhooks."
      },
      {
        q: "¿Puedo conectar múltiples números de WhatsApp?",
        a: "Sí, puedes conectar múltiples números de WhatsApp Business API según tu plan. Cada número puede tener su propia configuración y equipo asignado."
      }
    ]
  },
  {
    category: "IA y Automatización",
    questions: [
      {
        q: "¿Cómo funciona la IA en UseMyChat?",
        a: "Nuestra IA utiliza modelos de lenguaje avanzados para entender el contexto de las conversaciones, responder automáticamente, clasificar mensajes, detectar intenciones y aprender de cada interacción para mejorar continuamente."
      },
      {
        q: "¿Puedo entrenar la IA con mi información?",
        a: "Sí, puedes entrenar la IA con tu base de conocimientos, FAQs, documentos y conversaciones previas. La IA aprenderá el tono y estilo de tu marca para responder de manera coherente."
      },
      {
        q: "¿Los bots pueden transferir a un agente humano?",
        a: "Absolutamente. Los bots pueden detectar cuando una conversación requiere intervención humana y transferirla automáticamente al agente disponible más adecuado."
      }
    ]
  },
  {
    category: "Seguridad y Privacidad",
    questions: [
      {
        q: "¿Mis datos están seguros?",
        a: "Sí, utilizamos encriptación de extremo a extremo, cumplimos con GDPR, LGPD y otras regulaciones internacionales. Tus datos están almacenados en servidores seguros con backups automáticos."
      },
      {
        q: "¿Quién tiene acceso a mis conversaciones?",
        a: "Solo tu equipo tiene acceso a tus conversaciones. Nosotros no accedemos a tus datos sin tu autorización explícita. Puedes configurar permisos granulares para cada miembro de tu equipo."
      },
      {
        q: "¿Realizan backups de mis datos?",
        a: "Sí, realizamos backups automáticos diarios de todos tus datos. Puedes exportar tu información en cualquier momento en formatos estándar."
      }
    ]
  },
  {
    category: "Soporte",
    questions: [
      {
        q: "¿Qué tipo de soporte ofrecen?",
        a: "Ofrecemos soporte 24/7 por chat, email y teléfono. También tenemos una base de conocimientos completa, tutoriales en video y webinars regulares."
      },
      {
        q: "¿El soporte está en español?",
        a: "Sí, nuestro equipo de soporte habla español nativamente. También ofrecemos soporte en inglés, portugués y otros idiomas."
      },
      {
        q: "¿Ofrecen capacitación para mi equipo?",
        a: "Sí, ofrecemos sesiones de capacitación personalizadas para tu equipo. Incluye onboarding, mejores prácticas y configuración avanzada según tus necesidades."
      }
    ]
  }
];

export default function FAQs() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-black" />
              <span className="text-2xl font-bold text-black">
                UseMyChat
              </span>
            </Link>
            <div className="flex items-center space-x-4">
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

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-black mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al inicio</span>
            </Link>

            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-gray-600">
              Encuentra respuestas a las preguntas más comunes sobre UseMyChat
            </p>
          </motion.div>

          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center">
                  <span className="w-2 h-8 bg-black rounded-full mr-3"></span>
                  {category.category}
                </h2>

                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const itemId = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openItems[itemId];

                    return (
                      <motion.div
                        key={faqIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (categoryIndex * 0.1) + (faqIndex * 0.05) }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-lg font-semibold text-black pr-4">
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center"
          >
            <h3 className="text-2xl font-bold text-black mb-4">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-gray-600 mb-6">
              Nuestro equipo está listo para ayudarte con cualquier pregunta
            </p>
            <Link href="/contacto" className="inline-flex items-center space-x-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all">
              <span>Contáctanos</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>© 2024 UseMyChat. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
