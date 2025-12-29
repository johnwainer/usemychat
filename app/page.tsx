'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Zap, Users, BarChart3, Bot, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <MessageSquare className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UseMyChat
              </span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all">
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
              <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30">
                🚀 La Revolución en Gestión de Conversaciones
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Gestiona todas tus
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"> conversaciones </span>
              en un solo lugar
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Plataforma omnicanal con IA integrada para WhatsApp, Instagram, Facebook y más. 
              Automatiza, analiza y convierte con el poder de la inteligencia artificial.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/register" className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all flex items-center space-x-2">
                <span>Comenzar Gratis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contacto" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                Ver Demo
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl"></div>
            <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-purple-400">99.9%</div>
                  <div className="text-gray-400 mt-2">Uptime</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-400">10K+</div>
                  <div className="text-gray-400 mt-2">Usuarios</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400">50M+</div>
                  <div className="text-gray-400 mt-2">Mensajes</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-400">24/7</div>
                  <div className="text-gray-400 mt-2">Soporte</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Funcionalidades Potentes
            </h2>
            <p className="text-xl text-gray-400">
              Todo lo que necesitas para gestionar tus conversaciones
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Omnicanal",
                description: "WhatsApp, Instagram, Facebook, Telegram y más en una sola plataforma",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Bot,
                title: "IA Generativa",
                description: "Bots inteligentes que aprenden y responden como humanos",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: Users,
                title: "CRM Integrado",
                description: "Gestiona clientes, leads y oportunidades en tiempo real",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Zap,
                title: "Automatización",
                description: "Flujos de trabajo inteligentes que ahorran tiempo",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: BarChart3,
                title: "Analytics Avanzado",
                description: "Reportes en tiempo real con insights accionables",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Sparkles,
                title: "Campañas con IA",
                description: "Crea y optimiza campañas automáticamente",
                color: "from-cyan-500 to-teal-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¿Por qué UseMyChat?
            </h2>
            <p className="text-xl text-gray-300">
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
                className="flex items-center space-x-4 bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
              >
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-lg text-white">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Únete a miles de empresas que ya confían en UseMyChat
            </p>
            <Link href="/register" className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all">
              <span>Comenzar Ahora</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="bg-slate-900 border-t border-purple-500/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">UseMyChat</span>
              </div>
              <p className="text-gray-400">
                La plataforma omnicanal con IA para gestionar todas tus conversaciones.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><Link href="/faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link href="/contacto" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 pt-8 text-center text-gray-400">
            <p>© 2024 UseMyChat. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
