import { Metadata } from 'next';
import { Calendar, User, ArrowRight, TrendingUp, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog - UseMyChat | Noticias, Tendencias y Mejores Prácticas',
  description: 'Descubre las últimas tendencias en comunicación empresarial, IA conversacional, automatización y estrategias para mejorar la experiencia del cliente. Blog oficial de UseMyChat.',
  keywords: 'blog, UseMyChat, IA conversacional, chatbots, WhatsApp Business, automatización, CRM, experiencia del cliente, tendencias tecnológicas',
  openGraph: {
    title: 'Blog UseMyChat - Tendencias y Mejores Prácticas',
    description: 'Artículos sobre IA, automatización y comunicación empresarial',
    type: 'website',
  },
};

const blogPosts = [
  {
    id: 1,
    title: 'El Futuro de la IA Conversacional en 2024',
    excerpt: 'Descubre las tendencias más importantes que están transformando la forma en que las empresas se comunican con sus clientes a través de inteligencia artificial.',
    author: 'María González',
    date: '15 Enero 2024',
    category: 'Inteligencia Artificial',
    readTime: '8 min',
    image: '🤖'
  },
  {
    id: 2,
    title: 'Cómo Aumentar las Ventas con WhatsApp Business',
    excerpt: 'Estrategias probadas para convertir conversaciones en ventas. Aprende a usar WhatsApp Business de manera efectiva para tu negocio.',
    author: 'Carlos Rodríguez',
    date: '12 Enero 2024',
    category: 'Ventas',
    readTime: '6 min',
    image: '💰'
  },
  {
    id: 3,
    title: '10 Mejores Prácticas para Chatbots Efectivos',
    excerpt: 'Guía completa para diseñar chatbots que realmente ayuden a tus clientes y mejoren la experiencia de usuario en tu empresa.',
    author: 'Ana Martínez',
    date: '10 Enero 2024',
    category: 'Automatización',
    readTime: '10 min',
    image: '🤝'
  },
  {
    id: 4,
    title: 'Omnicanalidad: La Clave del Éxito en 2024',
    excerpt: 'Por qué las empresas que adoptan estrategias omnicanales están superando a su competencia y cómo puedes implementarlo.',
    author: 'Luis Fernández',
    date: '8 Enero 2024',
    category: 'Estrategia',
    readTime: '7 min',
    image: '🌐'
  },
  {
    id: 5,
    title: 'Análisis de Sentimiento: Entiende a tus Clientes',
    excerpt: 'Cómo usar IA para analizar las emociones de tus clientes y mejorar tu servicio al cliente de manera proactiva.',
    author: 'Patricia Silva',
    date: '5 Enero 2024',
    category: 'Analytics',
    readTime: '9 min',
    image: '📊'
  },
  {
    id: 6,
    title: 'Automatización sin Perder el Toque Humano',
    excerpt: 'El balance perfecto entre eficiencia y empatía. Aprende a automatizar sin sacrificar la calidad de atención.',
    author: 'Roberto Díaz',
    date: '3 Enero 2024',
    category: 'Experiencia del Cliente',
    readTime: '5 min',
    image: '❤️'
  }
];

const categories = [
  'Todos',
  'Inteligencia Artificial',
  'Ventas',
  'Automatización',
  'Estrategia',
  'Analytics',
  'Experiencia del Cliente'
];

export default function Blog() {
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

      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Blog de UseMyChat
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tendencias y mejores prácticas sobre comunicación empresarial, IA conversacional y automatización
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all group cursor-pointer"
              >
                <div className="bg-gray-100 h-48 flex items-center justify-center text-6xl">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-xs font-medium text-black bg-gray-100 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime} lectura</span>
                  </div>
                  <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.date}</span>
                    </div>
                  </div>
                  <button className="mt-4 flex items-center space-x-2 text-black font-medium group-hover:translate-x-1 transition-transform">
                    <span>Leer más</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all">
              Cargar más artículos
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Temas Destacados</h2>
            <p className="text-xl text-gray-600">Explora nuestros contenidos más populares</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Tendencias 2024',
                description: 'Las últimas innovaciones en IA y comunicación empresarial',
                articles: 12
              },
              {
                icon: Zap,
                title: 'Guías Prácticas',
                description: 'Tutoriales paso a paso para implementar soluciones',
                articles: 24
              },
              {
                icon: Users,
                title: 'Casos de Éxito',
                description: 'Historias reales de empresas que transformaron su comunicación',
                articles: 18
              }
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer"
              >
                <topic.icon className="w-12 h-12 text-black mb-4" />
                <h3 className="text-2xl font-bold text-black mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div className="text-sm text-gray-500">{topic.articles} artículos</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Suscríbete a Nuestro Newsletter</h2>
          <p className="text-xl text-gray-300 mb-8">
            Recibe los mejores artículos, tendencias y novedades directamente en tu correo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
              Suscribirse
            </button>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Sin spam. Cancela cuando quieras.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
