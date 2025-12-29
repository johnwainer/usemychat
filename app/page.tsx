'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Zap, Users, BarChart3, Bot, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <MessageSquare className="w-8 h-8 text-black" />
              <span className="text-2xl font-bold text-black">
                UseMyChat
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all">
                Registrarse
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-4"
            >
              <span className="bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                🚀 La Revolución en Gestión de Conversaciones
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              Gestiona todas tus
              <span className="text-gray-600"> conversaciones </span>
              en un solo lugar
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plataforma omnicanal con IA integrada para WhatsApp, Instagram, Facebook y más.
              Automatiza, analiza y convierte con el poder de la inteligencia artificial.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/register" className="group bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all flex items-center space-x-2">
                <span>Comenzar Gratis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contacto" className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all border border-gray-200">
                Ver Demo
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20"
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-black">99.9%</div>
                  <div className="text-gray-600 mt-2">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black">10K+</div>
                  <div className="text-gray-600 mt-2">Usuarios</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black">50M+</div>
                  <div className="text-gray-600 mt-2">Mensajes</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black">24/7</div>
                  <div className="text-gray-600 mt-2">Soporte</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Funcionalidades Potentes
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas para gestionar tus conversaciones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Omnicanal",
                description: "WhatsApp, Instagram, Facebook, Telegram y más en una sola plataforma"
              },
              {
                icon: Bot,
                title: "IA Generativa",
                description: "Bots inteligentes que aprenden y responden como humanos"
              },
              {
                icon: Users,
                title: "CRM Integrado",
                description: "Gestiona clientes, leads y oportunidades en tiempo real"
              },
              {
                icon: Zap,
                title: "Automatización",
                description: "Flujos de trabajo inteligentes que ahorran tiempo"
              },
              {
                icon: BarChart3,
                title: "Analytics Avanzado",
                description: "Reportes en tiempo real con insights accionables"
              },
              {
                icon: Sparkles,
                title: "Campañas con IA",
                description: "Crea y optimiza campañas automáticamente"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              ¿Por qué UseMyChat?
            </h2>
            <p className="text-xl text-gray-600">
              La solución completa para tu negocio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Integración en minutos, no días",
              "IA que aprende de tu negocio",
              "Escalable para cualquier tamaño",
              "Seguridad de nivel empresarial",
              "Soporte 24/7 en español",
              "Actualizaciones constantes"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0" />
                <span className="text-lg text-black">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black rounded-3xl p-12 shadow-xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a miles de empresas que ya confían en UseMyChat
            </p>
            <Link href="/register" className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all">
              <span>Comenzar Ahora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-6 h-6 text-black" />
                <span className="text-xl font-bold text-black">UseMyChat</span>
              </div>
              <p className="text-gray-600">
                La plataforma omnicanal con IA para gestionar todas tus conversaciones.
              </p>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><Link href="/faqs" className="text-gray-600 hover:text-black transition-colors">FAQs</Link></li>
                <li><Link href="/contacto" className="text-gray-600 hover:text-black transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-black font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>© 2024 UseMyChat. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
