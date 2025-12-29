'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Zap, Users, BarChart3, Bot, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

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

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ opacity }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50" />
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
            style={{ scale }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <motion.span
                className="bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  🚀
                </motion.span>
                <span>La Revolución en Gestión de Conversaciones</span>
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Gestiona todas tus
              <motion.span
                className="text-gray-600"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {" "}conversaciones{" "}
              </motion.span>
              en un solo lugar
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Plataforma omnicanal con IA integrada para WhatsApp, Instagram, Facebook y más.
              Automatiza, analiza y convierte con el poder de la inteligencia artificial.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/register" className="group bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all flex items-center space-x-2">
                  <span>Comenzar Gratis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contacto" className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all border border-gray-200">
                  Ver Demo
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-20"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
              whileHover={{ boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "99.9%", label: "Uptime" },
                  { value: "10K+", label: "Usuarios" },
                  { value: "50M+", label: "Mensajes" },
                  { value: "24/7", label: "Soporte" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  >
                    <motion.div
                      className="text-4xl font-bold text-black"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Funcionalidades Potentes
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Todo lo que necesitas para gestionar tus conversaciones
            </motion.p>
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all cursor-pointer"
              >
                <motion.div
                  className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
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
              {
                title: "Fácil de usar",
                description: "Interfaz intuitiva que no requiere capacitación técnica",
                benefits: ["Setup en minutos", "Onboarding guiado", "Soporte 24/7"]
              },
              {
                title: "Escalable",
                description: "Crece con tu negocio sin límites",
                benefits: ["Usuarios ilimitados", "Mensajes ilimitados", "Integraciones infinitas"]
              },
              {
                title: "Seguro",
                description: "Tus datos protegidos con los más altos estándares",
                benefits: ["Encriptación E2E", "Cumplimiento GDPR", "Backups automáticos"]
              },
              {
                title: "Inteligente",
                description: "IA que aprende de tus conversaciones",
                benefits: ["Respuestas automáticas", "Análisis de sentimiento", "Predicciones de ventas"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-black mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-6">{item.description}</p>
                <ul className="space-y-3">
                  {item.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-black flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              Comienza hoy mismo
            </motion.h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a miles de empresas que ya confían en UseMyChat
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/register" className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all">
                <span>Prueba gratis por 14 días</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <p className="text-gray-400 mt-4 text-sm">
              No requiere tarjeta de crédito • Cancela cuando quieras
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}