'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Mail, User, Building, Phone, MessageCircle, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/Footer';

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
        <div className="max-w-6xl mx-auto">
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
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Información de Contacto
                </h2>
                <p className="text-gray-600 mb-8">
                  Nuestro equipo está disponible 24/7 para atender tus consultas
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black font-semibold mb-1">Email</h3>
                      <p className="text-gray-600">contacto@usemychat.com</p>
                      <p className="text-gray-600">soporte@usemychat.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black font-semibold mb-1">Teléfono</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black font-semibold mb-1">Chat en Vivo</h3>
                      <p className="text-gray-600">Disponible 24/7</p>
                      <p className="text-gray-600">Respuesta inmediata</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black font-semibold mb-1">Oficina</h3>
                      <p className="text-gray-600">123 Tech Street</p>
                      <p className="text-gray-600">San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-black font-semibold mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                    {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 hover:border-gray-300 transition-all"
                      >
                        <span className="text-black capitalize">{social[0]}</span>
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
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-black mb-6">
                  Envíanos un Mensaje
                </h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">¡Mensaje Enviado!</h3>
                    <p className="text-gray-600">Te responderemos pronto</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                          placeholder="Juan Pérez"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                          placeholder="tu@empresa.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                            placeholder="Mi Empresa"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                            placeholder="+1 234 567"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-black transition-colors"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
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
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="text-4xl font-bold text-black mb-2">
                &lt; 2min
              </div>
              <p className="text-gray-600">Tiempo de respuesta promedio</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="text-4xl font-bold text-black mb-2">
                24/7
              </div>
              <p className="text-gray-600">Soporte disponible</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="text-4xl font-bold text-black mb-2">
                98%
              </div>
              <p className="text-gray-600">Satisfacción del cliente</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}