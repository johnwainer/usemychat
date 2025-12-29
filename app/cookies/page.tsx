import { Metadata } from 'next';
import { Cookie, Settings, Eye, Shield, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Cookies - UseMyChat | Uso de Cookies',
  description: 'Conoce cómo UseMyChat utiliza cookies y tecnologías similares. Información completa sobre tipos de cookies, propósitos y cómo gestionarlas en tu navegador.',
  keywords: 'política de cookies, cookies, rastreo, privacidad, UseMyChat, tecnologías de seguimiento',
  openGraph: {
    title: 'Política de Cookies - UseMyChat',
    description: 'Información sobre el uso de cookies en UseMyChat',
    type: 'website',
  },
};

export default function Cookies() {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Cookie className="w-16 h-16 text-black mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Política de Cookies
            </h1>
            <p className="text-xl text-gray-600">
              Última actualización: 15 de enero de 2024
            </p>
            <p className="text-gray-600 mt-4">
              Esta política explica qué son las cookies, cómo las usamos, y cómo puedes controlarlas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Eye,
                title: 'Transparencia',
                description: 'Te informamos sobre todas las cookies que usamos'
              },
              {
                icon: Settings,
                title: 'Control',
                description: 'Tú decides qué cookies aceptar'
              },
              {
                icon: Shield,
                title: 'Seguridad',
                description: 'Protegemos tu privacidad siempre'
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                <item.icon className="w-10 h-10 text-black mx-auto mb-3" />
                <h3 className="font-bold text-black mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">1. ¿Qué son las Cookies?</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (computadora, tablet o móvil) cuando visitas un sitio web. Las cookies permiten que el sitio web reconozca tu dispositivo y recuerde información sobre tu visita.
                </p>
                <p>
                  Las cookies son ampliamente utilizadas para hacer que los sitios web funcionen de manera más eficiente, así como para proporcionar información a los propietarios del sitio.
                </p>
                <p>
                  Además de cookies, también utilizamos tecnologías similares como:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Web beacons (píxeles):</strong> Pequeñas imágenes invisibles en páginas web o correos electrónicos</li>
                  <li><strong>Local storage:</strong> Almacenamiento local en tu navegador</li>
                  <li><strong>Session storage:</strong> Almacenamiento temporal durante tu sesión</li>
                  <li><strong>SDKs:</strong> Kits de desarrollo de software en aplicaciones móviles</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">2. Tipos de Cookies que Utilizamos</h2>
              <div className="space-y-6 text-gray-600">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-black mb-3">2.1 Cookies Estrictamente Necesarias</h3>
                      <p className="mb-3">
                        Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden desactivar en nuestros sistemas.
                      </p>
                      <p className="font-bold text-black mb-2">Propósito:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Autenticación de usuario</li>
                        <li>Seguridad y prevención de fraudes</li>
                        <li>Recordar preferencias de privacidad</li>
                        <li>Mantener tu sesión activa</li>
                        <li>Balanceo de carga del servidor</li>
                      </ul>
                      <p className="mt-3 text-sm">
                        <strong>Duración:</strong> Sesión o hasta 1 año
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <Settings className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-black mb-3">2.2 Cookies de Funcionalidad</h3>
                      <p className="mb-3">
                        Estas cookies permiten que el sitio web proporcione funcionalidad mejorada y personalización.
                      </p>
                      <p className="font-bold text-black mb-2">Propósito:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Recordar tus preferencias (idioma, zona horaria)</li>
                        <li>Personalizar la interfaz según tus configuraciones</li>
                        <li>Recordar información que has ingresado en formularios</li>
                        <li>Proporcionar características mejoradas como chat en vivo</li>
                      </ul>
                      <p className="mt-3 text-sm">
                        <strong>Duración:</strong> Hasta 2 años
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Puedes desactivarlas:</strong> Sí, pero algunas funciones pueden no estar disponibles
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-black mb-3">2.3 Cookies de Rendimiento y Análisis</h3>
                      <p className="mb-3">
                        Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web.
                      </p>
                      <p className="font-bold text-black mb-2">Propósito:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Contar visitas y fuentes de tráfico</li>
                        <li>Medir el rendimiento del sitio</li>
                        <li>Entender qué páginas son más populares</li>
                        <li>Identificar errores y problemas técnicos</li>
                        <li>Mejorar la experiencia del usuario</li>
                      </ul>
                      <p className="mt-3 text-sm">
                        <strong>Proveedores:</strong> Google Analytics, Mixpanel, Hotjar
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Duración:</strong> Hasta 2 años
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Puedes desactivarlas:</strong> Sí
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <XCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold text-black mb-3">2.4 Cookies de Publicidad y Marketing</h3>
                      <p className="mb-3">
                        Estas cookies se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas publicitarias.
                      </p>
                      <p className="font-bold text-black mb-2">Propósito:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Mostrar anuncios relevantes basados en tus intereses</li>
                        <li>Limitar la cantidad de veces que ves un anuncio</li>
                        <li>Medir la efectividad de campañas publicitarias</li>
                        <li>Rastrear conversiones de anuncios</li>
                        <li>Crear perfiles de audiencia para remarketing</li>
                      </ul>
                      <p className="mt-3 text-sm">
                        <strong>Proveedores:</strong> Google Ads, Facebook Pixel, LinkedIn Insight Tag
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Duración:</strong> Hasta 2 años
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Puedes desactivarlas:</strong> Sí
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">3. Cookies de Terceros</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Además de nuestras propias cookies, también utilizamos cookies de terceros para diversos propósitos:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-black">Proveedor</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-black">Propósito</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-bold text-black">Más Información</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Google Analytics</td>
                        <td className="border border-gray-200 px-4 py-3">Análisis de tráfico y comportamiento</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-black underline">
                            Política de Privacidad
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Google Ads</td>
                        <td className="border border-gray-200 px-4 py-3">Publicidad y remarketing</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-black underline">
                            Política de Anuncios
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Facebook Pixel</td>
                        <td className="border border-gray-200 px-4 py-3">Seguimiento de conversiones</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-black underline">
                            Política de Datos
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Hotjar</td>
                        <td className="border border-gray-200 px-4 py-3">Mapas de calor y grabaciones</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-black underline">
                            Política de Privacidad
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-3">Intercom</td>
                        <td className="border border-gray-200 px-4 py-3">Chat de soporte en vivo</td>
                        <td className="border border-gray-200 px-4 py-3">
                          <a href="https://www.intercom.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-black underline">
                            Política de Privacidad
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <Settings className="w-8 h-8 mr-3" />
                4. Cómo Gestionar las Cookies
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Tienes varias opciones para controlar y gestionar las cookies:
                </p>

                <h3 className="text-xl font-bold text-black mt-6">4.1 Panel de Preferencias de Cookies</h3>
                <p>
                  Cuando visitas UseMyChat por primera vez, te mostramos un banner de cookies donde puedes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Aceptar todas las cookies</li>
                  <li>Rechazar cookies no esenciales</li>
                  <li>Personalizar tus preferencias por categoría</li>
                </ul>
                <p className="mt-4">
                  Puedes cambiar tus preferencias en cualquier momento haciendo clic en el enlace "Configuración de Cookies" en el pie de página.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">4.2 Configuración del Navegador</h3>
                <p>
                  La mayoría de los navegadores te permiten controlar las cookies a través de su configuración:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
                  <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                  <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
                  <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio → Cookies y datos del sitio</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">4.3 Herramientas de Exclusión</h3>
                <p>
                  Puedes optar por no participar en el seguimiento de terceros:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-black underline">
                      Complemento de exclusión de Google Analytics
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-black underline">
                      Your Online Choices (Europa)
                    </a>
                  </li>
                  <li>
                    <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-black underline">
                      Digital Advertising Alliance (EE.UU.)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-black underline">
                      Network Advertising Initiative
                    </a>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">4.4 Señales "Do Not Track"</h3>
                <p>
                  Algunos navegadores incluyen una función "Do Not Track" (DNT). Actualmente, no existe un estándar de la industria sobre cómo responder a las señales DNT. UseMyChat no responde actualmente a señales DNT, pero respetamos tus elecciones de cookies a través de nuestro panel de preferencias.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">5. Consecuencias de Desactivar Cookies</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Si decides desactivar o rechazar cookies, ten en cuenta que:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Algunas funciones del sitio web pueden no funcionar correctamente</li>
                  <li>Es posible que no puedas acceder a ciertas áreas del sitio</li>
                  <li>Tu experiencia de usuario puede verse afectada negativamente</li>
                  <li>Tendrás que volver a iniciar sesión cada vez que visites el sitio</li>
                  <li>Tus preferencias no se guardarán entre sesiones</li>
                </ul>
                <p className="mt-4">
                  Las cookies estrictamente necesarias no se pueden desactivar ya que son esenciales para el funcionamiento del sitio.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">6. Actualizaciones de esta Política</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en las cookies que utilizamos o por razones operativas, legales o regulatorias.
                </p>
                <p>
                  Te recomendamos revisar esta página regularmente para estar informado sobre nuestro uso de cookies. La fecha de "Última actualización" en la parte superior indica cuándo se revisó esta política por última vez.
                </p>
                <p>
                  Si realizamos cambios materiales, te notificaremos mediante un aviso destacado en nuestro sitio web o por correo electrónico.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-black mb-4">7. Más Información</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Si tienes preguntas sobre nuestra Política de Cookies o cómo usamos las cookies, puedes contactarnos:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p><strong>UseMyChat Inc.</strong></p>
                  <p>Email: <a href="mailto:privacy@usemychat.com" className="text-black underline">privacy@usemychat.com</a></p>
                  <p>Dirección: Av. Paulista 1000, São Paulo, SP, Brasil</p>
                  <p>Teléfono: +55 11 1234-5678</p>
                </div>
                <p className="mt-4">
                  Para más información sobre cómo protegemos tu privacidad, consulta nuestra <Link href="/privacidad" className="text-black underline">Política de Privacidad</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Gestiona tus Preferencias</h2>
          <p className="text-xl text-gray-600 mb-8">
            Controla qué cookies aceptas en cualquier momento
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all">
            Configuración de Cookies
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
