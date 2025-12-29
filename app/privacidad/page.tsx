import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad - UseMyChat | Protección de Datos',
  description: 'Conoce cómo UseMyChat protege tu información personal. Política de privacidad completa, transparente y conforme con GDPR, LGPD y regulaciones internacionales.',
  keywords: 'política de privacidad, protección de datos, GDPR, LGPD, seguridad, datos personales, UseMyChat',
  openGraph: {
    title: 'Política de Privacidad - UseMyChat',
    description: 'Transparencia total en el manejo de tus datos personales',
    type: 'website',
  },
};

export default function Privacidad() {
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
            <Shield className="w-16 h-16 text-black mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600">
              Última actualización: 15 de enero de 2024
            </p>
            <p className="text-gray-600 mt-4">
              En UseMyChat, tu privacidad es nuestra prioridad. Esta política explica cómo recopilamos, usamos, protegemos y compartimos tu información personal.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Lock,
                title: 'Seguridad',
                description: 'Encriptación de extremo a extremo'
              },
              {
                icon: Eye,
                title: 'Transparencia',
                description: 'Control total sobre tus datos'
              },
              {
                icon: UserCheck,
                title: 'Cumplimiento',
                description: 'GDPR, LGPD y más'
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
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <Database className="w-8 h-8 mr-3" />
                1. Información que Recopilamos
              </h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">1.1 Información que Proporcionas Directamente</h3>
                <p>
                  Cuando te registras en UseMyChat, recopilamos información que nos proporcionas voluntariamente, incluyendo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de cuenta:</strong> Nombre completo, dirección de correo electrónico, número de teléfono, nombre de empresa, cargo.</li>
                  <li><strong>Información de perfil:</strong> Foto de perfil, preferencias de idioma, zona horaria.</li>
                  <li><strong>Información de pago:</strong> Datos de tarjeta de crédito o débito (procesados de forma segura por nuestros proveedores de pago certificados PCI-DSS).</li>
                  <li><strong>Contenido de comunicaciones:</strong> Mensajes, archivos, imágenes y otros contenidos que compartes a través de nuestra plataforma.</li>
                  <li><strong>Información de soporte:</strong> Cuando contactas a nuestro equipo de soporte, guardamos el historial de comunicaciones.</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">1.2 Información Recopilada Automáticamente</h3>
                <p>
                  Cuando usas UseMyChat, recopilamos automáticamente cierta información técnica:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de uso:</strong> Páginas visitadas, funciones utilizadas, tiempo de sesión, clics, interacciones.</li>
                  <li><strong>Información del dispositivo:</strong> Tipo de dispositivo, sistema operativo, navegador, dirección IP, identificadores únicos.</li>
                  <li><strong>Datos de ubicación:</strong> Ubicación aproximada basada en dirección IP (no recopilamos ubicación GPS precisa).</li>
                  <li><strong>Cookies y tecnologías similares:</strong> Utilizamos cookies para mejorar tu experiencia. Consulta nuestra <Link href="/cookies" className="text-black underline">Política de Cookies</Link>.</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">1.3 Información de Terceros</h3>
                <p>
                  Podemos recibir información sobre ti de terceros, como:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Plataformas de redes sociales (si conectas tu cuenta de WhatsApp, Instagram, Facebook, etc.)</li>
                  <li>Proveedores de servicios de análisis y marketing</li>
                  <li>Socios comerciales con los que colaboramos</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <FileText className="w-8 h-8 mr-3" />
                2. Cómo Usamos tu Información
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Utilizamos la información recopilada para los siguientes propósitos:
                </p>

                <h3 className="text-xl font-bold text-black mt-6">2.1 Provisión del Servicio</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Crear y gestionar tu cuenta</li>
                  <li>Procesar transacciones y pagos</li>
                  <li>Proporcionar funcionalidades de la plataforma (mensajería, automatización, análisis)</li>
                  <li>Ofrecer soporte técnico y atención al cliente</li>
                  <li>Enviar notificaciones importantes sobre el servicio</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">2.2 Mejora y Personalización</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analizar el uso de la plataforma para mejorar funcionalidades</li>
                  <li>Personalizar tu experiencia según tus preferencias</li>
                  <li>Desarrollar nuevas características y servicios</li>
                  <li>Realizar investigación y análisis de datos agregados</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">2.3 Comunicación y Marketing</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Enviar actualizaciones de producto, newsletters y contenido educativo (con tu consentimiento)</li>
                  <li>Informarte sobre nuevas funcionalidades y promociones</li>
                  <li>Solicitar feedback y opiniones sobre nuestros servicios</li>
                  <li>Puedes cancelar la suscripción a comunicaciones de marketing en cualquier momento</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">2.4 Seguridad y Cumplimiento Legal</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Detectar, prevenir y responder a fraudes, abusos y actividades ilegales</li>
                  <li>Proteger la seguridad de nuestros usuarios y de la plataforma</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                  <li>Resolver disputas y hacer cumplir nuestros términos de servicio</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <Lock className="w-8 h-8 mr-3" />
                3. Cómo Protegemos tu Información
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encriptación:</strong> Todos los datos en tránsito están protegidos con TLS 1.3. Los datos en reposo están encriptados con AES-256.</li>
                  <li><strong>Controles de acceso:</strong> Acceso restringido a información personal solo para empleados autorizados que necesitan acceder a ella.</li>
                  <li><strong>Autenticación multifactor:</strong> Disponible para todas las cuentas para mayor seguridad.</li>
                  <li><strong>Monitoreo continuo:</strong> Sistemas de detección de intrusiones y monitoreo 24/7.</li>
                  <li><strong>Auditorías regulares:</strong> Evaluaciones de seguridad y pruebas de penetración periódicas.</li>
                  <li><strong>Certificaciones:</strong> Cumplimos con ISO 27001, SOC 2 Type II y estándares PCI-DSS.</li>
                </ul>
                <p className="mt-4">
                  <strong>Importante:</strong> Ningún sistema es 100% seguro. Si detectas actividad sospechosa en tu cuenta, contáctanos inmediatamente en <a href="mailto:security@usemychat.com" className="text-black underline">security@usemychat.com</a>.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <UserCheck className="w-8 h-8 mr-3" />
                4. Tus Derechos y Opciones
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Dependiendo de tu ubicación, tienes los siguientes derechos sobre tu información personal:
                </p>

                <h3 className="text-xl font-bold text-black mt-6">4.1 Derechos GDPR (Unión Europea)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
                  <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información ("derecho al olvido")</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado y legible</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos para ciertos fines</li>
                  <li><strong>Restricción:</strong> Limitar cómo usamos tu información</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">4.2 Derechos LGPD (Brasil)</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Confirmación de existencia de tratamiento de datos</li>
                  <li>Acceso a los datos personales</li>
                  <li>Corrección de datos incompletos, inexactos o desactualizados</li>
                  <li>Anonimización, bloqueo o eliminación de datos innecesarios</li>
                  <li>Portabilidad de datos a otro proveedor</li>
                  <li>Información sobre compartición de datos con terceros</li>
                  <li>Revocación del consentimiento</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">4.3 Cómo Ejercer tus Derechos</h3>
                <p>
                  Para ejercer cualquiera de estos derechos, puedes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acceder a la configuración de tu cuenta en la plataforma</li>
                  <li>Enviar un correo a <a href="mailto:privacy@usemychat.com" className="text-black underline">privacy@usemychat.com</a></li>
                  <li>Contactar a nuestro Oficial de Protección de Datos (DPO)</li>
                </ul>
                <p className="mt-4">
                  Responderemos a tu solicitud dentro de 30 días. Podemos solicitar verificación de identidad antes de procesar tu solicitud.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">5. Compartición de Información</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  No vendemos tu información personal. Compartimos información solo en las siguientes circunstancias:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar (hosting, procesamiento de pagos, análisis). Todos están sujetos a acuerdos de confidencialidad.</li>
                  <li><strong>Socios comerciales:</strong> Con tu consentimiento explícito para integraciones específicas.</li>
                  <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley, orden judicial o proceso legal.</li>
                  <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos, propiedad o seguridad, o los de nuestros usuarios.</li>
                  <li><strong>Transacciones corporativas:</strong> En caso de fusión, adquisición o venta de activos (te notificaremos previamente).</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">6. Retención de Datos</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de cuenta activa:</strong> Mientras tu cuenta esté activa</li>
                  <li><strong>Datos de cuenta cerrada:</strong> Hasta 90 días después del cierre (para permitir reactivación)</li>
                  <li><strong>Datos de facturación:</strong> 7 años (requisito legal contable)</li>
                  <li><strong>Datos de marketing:</strong> Hasta que retires tu consentimiento</li>
                  <li><strong>Logs de seguridad:</strong> 12 meses</li>
                </ul>
                <p className="mt-4">
                  Después de estos períodos, eliminamos o anonimizamos tu información de forma segura.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">7. Transferencias Internacionales</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  UseMyChat opera globalmente. Tu información puede ser transferida y procesada en países fuera de tu país de residencia, incluyendo Estados Unidos y otros países donde operamos.
                </p>
                <p>
                  Cuando transferimos datos fuera del Espacio Económico Europeo (EEE), implementamos salvaguardas apropiadas:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cláusulas Contractuales Estándar aprobadas por la Comisión Europea</li>
                  <li>Certificaciones de Privacy Shield (cuando aplique)</li>
                  <li>Acuerdos de procesamiento de datos con todos los proveedores</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">8. Privacidad de Menores</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  UseMyChat no está dirigido a menores de 18 años. No recopilamos intencionalmente información personal de menores de edad.
                </p>
                <p>
                  Si descubrimos que hemos recopilado información de un menor sin el consentimiento parental verificable, eliminaremos esa información inmediatamente.
                </p>
                <p>
                  Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal, contáctanos en <a href="mailto:privacy@usemychat.com" className="text-black underline">privacy@usemychat.com</a>.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">9. Cambios a esta Política</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por razones legales.
                </p>
                <p>
                  Cuando realicemos cambios materiales:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Actualizaremos la fecha de "Última actualización" en la parte superior</li>
                  <li>Te notificaremos por correo electrónico o mediante aviso destacado en la plataforma</li>
                  <li>Para cambios significativos, solicitaremos tu consentimiento renovado cuando sea requerido por ley</li>
                </ul>
                <p className="mt-4">
                  Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu información.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-black mb-4">10. Contacto</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Política de Privacidad o el manejo de tu información personal, puedes contactarnos:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p><strong>UseMyChat Inc.</strong></p>
                  <p>Oficial de Protección de Datos (DPO)</p>
                  <p>Email: <a href="mailto:privacy@usemychat.com" className="text-black underline">privacy@usemychat.com</a></p>
                  <p>Email DPO: <a href="mailto:dpo@usemychat.com" className="text-black underline">dpo@usemychat.com</a></p>
                  <p>Dirección: Av. Paulista 1000, São Paulo, SP, Brasil</p>
                  <p>Teléfono: +55 11 1234-5678</p>
                </div>
                <p className="mt-4">
                  <strong>Autoridades de Protección de Datos:</strong> Si no estás satisfecho con nuestra respuesta, tienes derecho a presentar una queja ante tu autoridad local de protección de datos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">¿Tienes Preguntas?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Nuestro equipo está aquí para ayudarte con cualquier duda sobre privacidad
          </p>
          <Link href="/contacto" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all">
            Contactar Soporte
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
