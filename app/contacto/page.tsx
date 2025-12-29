'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Mail, User, Building, Phone, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'El mensaje es requerido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Contact form:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                UseMyChat
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                Iniciar Sesión
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Volver al inicio</span>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-300">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 h-full">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-300 mb-8">
                  Nuestro equipo está disponible 24/7 para atender tus consultas
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <p className="text-gray-400">contacto@usemychat.com</p>
                      <p className="text-gray-400">soporte@usemychat.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Teléfono</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Chat en Vivo</h3>
                      <p className="text-gray-400">Disponible 24/7</p>
                      <p className="text-gray-400">Respuesta inmediata</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Oficina</h3>
                      <p className="text-gray-400">123 Tech Street</p>
                      <p className="text-gray-400">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-purple-500/20">
                  <h3 className="text-white font-semibold mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                    {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-slate-900/50 border border-purple-500/20 flex items-center justify-center hover:bg-slate-900 hover:border-purple-500/40 transition-all"
                      >
                        <span className="text-purple-400 capitalize">{social[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Envíanos un Mensaje
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-gray-300">Te responderemos pronto</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nombre completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          placeholder="Juan Pérez"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                          placeholder="tu@empresa.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Empresa
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Mi Empresa"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="+1 234 567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Asunto
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="ventas">Ventas</option>
                        <option value="soporte">Soporte Técnico</option>
                        <option value="demo">Solicitar Demo</option>
                        <option value="partnership">Partnership</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-slate-900/50 border border-purple-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Enviar Mensaje</span>
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                &lt; 2min
              </div>
              <p className="text-gray-300">Tiempo de respuesta promedio</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-300">Soporte disponible</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20 text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <p className="text-gray-300">Satisfacción del cliente</p>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="bg-slate-900 border-t border-purple-500/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 UseMyChat. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
