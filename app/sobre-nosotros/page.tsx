import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Award, Heart, Globe, TrendingUp, Shield } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - UseMyChat | Plataforma Omnicanal con IA',
  description: 'Conoce la historia de UseMyChat, la plataforma líder en gestión omnicanal de conversaciones con inteligencia artificial. Nuestra misión es revolucionar la comunicación empresarial.',
  keywords: 'sobre nosotros, UseMyChat, plataforma omnicanal, IA conversacional, equipo, misión, visión, valores empresariales',
  openGraph: {
    title: 'Sobre Nosotros - UseMyChat',
    description: 'Descubre cómo UseMyChat está transformando la comunicación empresarial con IA',
    type: 'website',
  },
};

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-black">UseMyChat</span>
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

      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Transformando la Comunicación Empresarial
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En UseMyChat, creemos que cada conversación es una oportunidad. Nuestra misión es empoderar a las empresas con tecnología de IA para crear conexiones significativas con sus clientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  UseMyChat nació en 2020 con una visión clara: simplificar la gestión de conversaciones empresariales en un mundo cada vez más digital y fragmentado. Fundada por un equipo de expertos en tecnología, IA y experiencia del cliente, nuestra plataforma surgió de la necesidad real de unificar múltiples canales de comunicación en una sola solución inteligente.
                </p>
                <p>
                  Lo que comenzó como una herramienta para gestionar WhatsApp Business, rápidamente evolucionó hacia una plataforma omnicanal completa que integra Instagram, Facebook Messenger, Telegram, y más. Hoy, más de 10,000 empresas en América Latina confían en UseMyChat para gestionar millones de conversaciones diarias.
                </p>
                <p>
                  Nuestra innovación constante nos ha llevado a integrar inteligencia artificial generativa, permitiendo a las empresas automatizar respuestas, analizar sentimientos, y predecir comportamientos de clientes con una precisión sin precedentes.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">2020</div>
                  <div className="text-gray-600">Año de fundación</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">10K+</div>
                  <div className="text-gray-600">Empresas activas</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">50M+</div>
                  <div className="text-gray-600">Mensajes procesados</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">15+</div>
                  <div className="text-gray-600">Países presentes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Misión, Visión y Valores</h2>
            <p className="text-xl text-gray-600">Los pilares que guían nuestro trabajo diario</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <Target className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">Nuestra Misión</h3>
              <p className="text-gray-600">
                Democratizar el acceso a tecnología de comunicación empresarial de clase mundial, permitiendo que empresas de todos los tamaños puedan ofrecer experiencias excepcionales a sus clientes a través de conversaciones inteligentes y automatizadas.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <Lightbulb className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">Nuestra Visión</h3>
              <p className="text-gray-600">
                Ser la plataforma líder en América Latina para la gestión omnicanal de conversaciones con IA, reconocida por nuestra innovación constante, facilidad de uso y el impacto positivo que generamos en los negocios de nuestros clientes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <Heart className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">Nuestros Valores</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Innovación constante</li>
                <li>• Orientación al cliente</li>
                <li>• Transparencia total</li>
                <li>• Excelencia operativa</li>
                <li>• Trabajo en equipo</li>
                <li>• Responsabilidad social</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Equipo Diverso',
                description: 'Más de 100 profesionales de 12 países trabajando juntos'
              },
              {
                icon: Globe,
                title: 'Alcance Global',
                description: 'Presencia en 15 países de América Latina y expansión continua'
              },
              {
                icon: TrendingUp,
                title: 'Crecimiento Sostenido',
                description: '300% de crecimiento anual en los últimos 3 años'
              },
              {
                icon: Shield,
                title: 'Seguridad Certificada',
                description: 'Cumplimiento con ISO 27001, SOC 2 y GDPR'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all">
                <item.icon className="w-10 h-10 text-black mb-4" />
                <h4 className="text-lg font-bold text-black mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Nuestro Compromiso</h2>
            <p className="text-xl text-gray-600">Con nuestros clientes, equipo y comunidad</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <Award className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">Innovación Responsable</h3>
              <p className="text-gray-600 mb-4">
                Desarrollamos tecnología de IA con ética y responsabilidad. Cada funcionalidad que lanzamos pasa por rigurosos controles de calidad, privacidad y seguridad. Creemos en la transparencia algorítmica y en dar control total a nuestros usuarios sobre sus datos.
              </p>
              <p className="text-gray-600">
                Nuestro equipo de investigación trabaja constantemente en mejorar la precisión, reducir sesgos y garantizar que nuestra IA sea justa, inclusiva y beneficiosa para todos.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <Globe className="w-12 h-12 text-black mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">Impacto Social</h3>
              <p className="text-gray-600 mb-4">
                Creemos que la tecnología debe ser accesible para todos. Por eso, ofrecemos planes especiales para ONGs, instituciones educativas y emprendimientos sociales. Además, destinamos el 1% de nuestros ingresos a programas de educación tecnológica en comunidades vulnerables.
              </p>
              <p className="text-gray-600">
                Nuestro programa "UseMyChat para el Bien" ha ayudado a más de 500 organizaciones sin fines de lucro a mejorar su comunicación con beneficiarios y donantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Únete a Nuestra Historia</h2>
          <p className="text-xl text-gray-300 mb-8">
            Forma parte de la revolución en comunicación empresarial. Miles de empresas ya confían en nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Comenzar Gratis
            </Link>
            <Link href="/contacto" className="bg-transparent text-white px-8 py-4 rounded-full font-semibold border border-white hover:bg-white hover:text-black transition-all">
              Contactar Ventas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
