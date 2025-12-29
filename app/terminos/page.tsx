import { Metadata } from 'next';
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - UseMyChat | Condiciones de Uso',
  description: 'Lee los términos y condiciones de uso de UseMyChat. Conoce tus derechos, obligaciones y las reglas que rigen el uso de nuestra plataforma omnicanal con IA.',
  keywords: 'términos y condiciones, condiciones de uso, términos de servicio, UseMyChat, acuerdo legal, contrato',
  openGraph: {
    title: 'Términos y Condiciones - UseMyChat',
    description: 'Condiciones de uso de la plataforma UseMyChat',
    type: 'website',
  },
};

export default function Terminos() {
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
            <Scale className="w-16 h-16 text-black mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-gray-600">
              Última actualización: 15 de enero de 2024
            </p>
            <p className="text-gray-600 mt-4">
              Por favor, lee estos términos cuidadosamente antes de usar UseMyChat. Al acceder o usar nuestro servicio, aceptas estar sujeto a estos términos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-12">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-black mb-2">Importante</h3>
                <p className="text-gray-700">
                  Estos términos constituyen un acuerdo legal vinculante entre tú y UseMyChat Inc. Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">1. Aceptación de los Términos</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Al crear una cuenta, acceder o usar UseMyChat (el "Servicio"), aceptas estar legalmente vinculado por estos Términos y Condiciones ("Términos"), nuestra <Link href="/privacidad" className="text-black underline">Política de Privacidad</Link> y nuestra <Link href="/cookies" className="text-black underline">Política de Cookies</Link>.
                </p>
                <p>
                  Si estás usando el Servicio en nombre de una organización, aceptas estos Términos en nombre de esa organización y declaras que tienes la autoridad para hacerlo.
                </p>
                <p>
                  Nos reservamos el derecho de modificar estos Términos en cualquier momento. Te notificaremos sobre cambios materiales por correo electrónico o mediante un aviso en el Servicio. Tu uso continuado después de dichos cambios constituye tu aceptación de los nuevos Términos.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">2. Descripción del Servicio</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  UseMyChat es una plataforma SaaS (Software as a Service) que proporciona:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestión omnicanal de conversaciones (WhatsApp, Instagram, Facebook, Telegram, etc.)</li>
                  <li>Automatización de respuestas con inteligencia artificial</li>
                  <li>CRM integrado para gestión de clientes y leads</li>
                  <li>Análisis y reportes en tiempo real</li>
                  <li>Campañas de marketing automatizadas</li>
                  <li>Integraciones con herramientas de terceros</li>
                </ul>
                <p className="mt-4">
                  El Servicio se proporciona "tal cual" y "según disponibilidad". Nos esforzamos por mantener el Servicio disponible 24/7, pero no garantizamos que estará libre de interrupciones o errores.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">3. Elegibilidad y Registro de Cuenta</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">3.1 Requisitos de Elegibilidad</h3>
                <p>Para usar UseMyChat, debes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tener al menos 18 años de edad</li>
                  <li>Tener capacidad legal para celebrar contratos vinculantes</li>
                  <li>No estar prohibido de usar el Servicio bajo las leyes aplicables</li>
                  <li>No haber sido previamente suspendido o eliminado del Servicio</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">3.2 Información de Cuenta</h3>
                <p>Al crear una cuenta, te comprometes a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar información precisa, actual y completa</li>
                  <li>Mantener y actualizar tu información de cuenta</li>
                  <li>Mantener la seguridad de tu contraseña</li>
                  <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta</li>
                  <li>Ser responsable de todas las actividades que ocurran bajo tu cuenta</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">3.3 Cuentas Corporativas</h3>
                <p>
                  Si creas una cuenta para una organización, declaras y garantizas que tienes autoridad para vincular a esa organización a estos Términos.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">4. Planes y Pagos</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">4.1 Planes de Suscripción</h3>
                <p>
                  Ofrecemos diferentes planes de suscripción con características y límites variables. Los detalles de cada plan están disponibles en nuestra página de precios.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">4.2 Facturación</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Las suscripciones se facturan por adelantado mensual o anualmente</li>
                  <li>Los pagos se procesan automáticamente en la fecha de renovación</li>
                  <li>Todos los precios están en USD (dólares estadounidenses) salvo que se indique lo contrario</li>
                  <li>Los precios no incluyen impuestos aplicables (IVA, GST, etc.)</li>
                  <li>Eres responsable de proporcionar información de pago válida y actualizada</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">4.3 Renovación Automática</h3>
                <p>
                  Tu suscripción se renovará automáticamente al final de cada período de facturación, a menos que la canceles antes de la fecha de renovación. Te enviaremos un recordatorio por correo electrónico antes de cada renovación.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">4.4 Cambios de Precio</h3>
                <p>
                  Nos reservamos el derecho de modificar nuestros precios. Te notificaremos con al menos 30 días de anticipación sobre cualquier aumento de precio. Si no estás de acuerdo con el nuevo precio, puedes cancelar tu suscripción antes de que entre en vigor.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">4.5 Reembolsos</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Prueba gratuita:</strong> Puedes cancelar durante el período de prueba sin cargo</li>
                  <li><strong>Suscripciones mensuales:</strong> No ofrecemos reembolsos prorrateados para cancelaciones anticipadas</li>
                  <li><strong>Suscripciones anuales:</strong> Reembolso prorrateado disponible dentro de los primeros 30 días</li>
                  <li><strong>Excepciones:</strong> Podemos ofrecer reembolsos a nuestra discreción en casos excepcionales</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">4.6 Pagos Atrasados</h3>
                <p>
                  Si un pago falla, intentaremos procesarlo nuevamente. Si el pago no se completa dentro de 7 días, podemos suspender o cancelar tu cuenta. Eres responsable de cualquier cargo por pago rechazado impuesto por tu banco.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <CheckCircle className="w-8 h-8 mr-3 text-green-600" />
                5. Uso Aceptable
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>Al usar UseMyChat, aceptas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cumplir con todas las leyes y regulaciones aplicables</li>
                  <li>Respetar los derechos de propiedad intelectual de terceros</li>
                  <li>No usar el Servicio para actividades ilegales o fraudulentas</li>
                  <li>No enviar spam, malware o contenido malicioso</li>
                  <li>No intentar acceder a cuentas de otros usuarios</li>
                  <li>No realizar ingeniería inversa del Servicio</li>
                  <li>No sobrecargar o interferir con la infraestructura del Servicio</li>
                  <li>Cumplir con las políticas de las plataformas de terceros (WhatsApp, Instagram, etc.)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <XCircle className="w-8 h-8 mr-3 text-red-600" />
                6. Uso Prohibido
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>Está estrictamente prohibido usar UseMyChat para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Enviar mensajes no solicitados (spam) o realizar marketing abusivo</li>
                  <li>Distribuir malware, virus o código malicioso</li>
                  <li>Realizar phishing, fraude o estafas</li>
                  <li>Acosar, amenazar o intimidar a otros usuarios</li>
                  <li>Compartir contenido ilegal, ofensivo, difamatorio o que incite al odio</li>
                  <li>Violar derechos de privacidad o propiedad intelectual</li>
                  <li>Realizar actividades que violen las leyes de protección de datos (GDPR, LGPD, etc.)</li>
                  <li>Revender o redistribuir el Servicio sin autorización</li>
                  <li>Crear múltiples cuentas para evadir límites o restricciones</li>
                </ul>
                <p className="mt-4 font-bold text-black">
                  La violación de estas prohibiciones puede resultar en la suspensión o terminación inmediata de tu cuenta sin reembolso.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">7. Propiedad Intelectual</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">7.1 Propiedad de UseMyChat</h3>
                <p>
                  UseMyChat y todo su contenido, características y funcionalidades (incluyendo pero no limitado a software, texto, diseños, gráficos, logos, iconos, imágenes, clips de audio, descargas, interfaces, código y datos) son propiedad de UseMyChat Inc., sus licenciantes o proveedores de contenido y están protegidos por derechos de autor, marcas registradas, patentes y otras leyes de propiedad intelectual.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">7.2 Tu Contenido</h3>
                <p>
                  Conservas todos los derechos sobre el contenido que subes, envías o almacenas en UseMyChat ("Tu Contenido"). Al usar el Servicio, nos otorgas una licencia mundial, no exclusiva, libre de regalías para:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Almacenar, procesar y transmitir Tu Contenido según sea necesario para proporcionar el Servicio</li>
                  <li>Crear copias de respaldo de Tu Contenido</li>
                  <li>Usar Tu Contenido de forma agregada y anonimizada para mejorar el Servicio</li>
                </ul>
                <p className="mt-4">
                  Declaras y garantizas que tienes todos los derechos necesarios sobre Tu Contenido y que su uso no viola derechos de terceros.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">7.3 Feedback</h3>
                <p>
                  Si nos proporcionas sugerencias, ideas o feedback sobre el Servicio, nos otorgas el derecho de usar ese feedback sin compensación u obligación hacia ti.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">8. Privacidad y Protección de Datos</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Tu privacidad es importante para nosotros. Nuestra <Link href="/privacidad" className="text-black underline">Política de Privacidad</Link> explica cómo recopilamos, usamos, protegemos y compartimos tu información personal.
                </p>
                <p>
                  Al usar UseMyChat, aceptas que podemos procesar tus datos personales de acuerdo con nuestra Política de Privacidad y las leyes aplicables de protección de datos.
                </p>
                <p>
                  Si procesas datos personales de terceros usando nuestro Servicio, eres responsable de:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Obtener los consentimientos necesarios</li>
                  <li>Cumplir con las leyes de protección de datos aplicables (GDPR, LGPD, etc.)</li>
                  <li>Implementar medidas de seguridad apropiadas</li>
                  <li>Responder a solicitudes de derechos de los interesados</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                9. Limitación de Responsabilidad
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="font-bold text-black">
                  EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>UseMyChat se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD" sin garantías de ningún tipo</li>
                  <li>No garantizamos que el Servicio será ininterrumpido, seguro o libre de errores</li>
                  <li>No somos responsables de pérdidas de datos, ingresos, ganancias o daños indirectos</li>
                  <li>Nuestra responsabilidad total no excederá el monto pagado por ti en los últimos 12 meses</li>
                  <li>No somos responsables de acciones de plataformas de terceros (WhatsApp, Instagram, etc.)</li>
                </ul>
                <p className="mt-4">
                  Algunas jurisdicciones no permiten la exclusión de ciertas garantías o limitaciones de responsabilidad. En tales casos, estas limitaciones se aplicarán en la máxima medida permitida por la ley.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">10. Indemnización</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Aceptas indemnizar, defender y mantener indemne a UseMyChat Inc., sus directores, empleados, agentes y afiliados de cualquier reclamo, daño, obligación, pérdida, responsabilidad, costo o deuda, y gasto (incluyendo honorarios de abogados) que surja de:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tu uso o mal uso del Servicio</li>
                  <li>Tu violación de estos Términos</li>
                  <li>Tu violación de derechos de terceros</li>
                  <li>Tu Contenido</li>
                  <li>Tu violación de leyes aplicables</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">11. Terminación</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">11.1 Terminación por tu Parte</h3>
                <p>
                  Puedes cancelar tu cuenta en cualquier momento desde la configuración de tu cuenta o contactándonos. La cancelación será efectiva al final de tu período de facturación actual.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">11.2 Terminación por Nuestra Parte</h3>
                <p>
                  Podemos suspender o terminar tu acceso al Servicio inmediatamente, sin previo aviso, si:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violas estos Términos</li>
                  <li>Tu cuenta está involucrada en actividades fraudulentas o ilegales</li>
                  <li>No pagas las tarifas adeudadas</li>
                  <li>Tu uso del Servicio representa un riesgo de seguridad</li>
                  <li>Estamos obligados a hacerlo por ley</li>
                </ul>

                <h3 className="text-xl font-bold text-black mt-6">11.3 Efectos de la Terminación</h3>
                <p>
                  Tras la terminación:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tu derecho a usar el Servicio cesará inmediatamente</li>
                  <li>Podemos eliminar Tu Contenido después de 30 días</li>
                  <li>No se proporcionarán reembolsos por períodos no utilizados (salvo lo indicado en la sección de Reembolsos)</li>
                  <li>Las secciones de estos Términos que por su naturaleza deben sobrevivir, continuarán vigentes</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-black mb-4">12. Resolución de Disputas</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">12.1 Ley Aplicable</h3>
                <p>
                  Estos Términos se regirán e interpretarán de acuerdo con las leyes de Brasil, sin dar efecto a ningún principio de conflicto de leyes.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">12.2 Arbitraje</h3>
                <p>
                  Cualquier disputa que surja de o relacionada con estos Términos será resuelta mediante arbitraje vinculante de acuerdo con las reglas de la Cámara de Comercio Internacional (ICC), excepto que cada parte conserva el derecho de buscar medidas cautelares en un tribunal de jurisdicción competente.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">12.3 Jurisdicción</h3>
                <p>
                  Para disputas que no estén sujetas a arbitraje, las partes se someten a la jurisdicción exclusiva de los tribunales de São Paulo, Brasil.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-black mb-4">13. Disposiciones Generales</h2>
              <div className="space-y-4 text-gray-600">
                <h3 className="text-xl font-bold text-black mt-6">13.1 Acuerdo Completo</h3>
                <p>
                  Estos Términos, junto con nuestra Política de Privacidad y Política de Cookies, constituyen el acuerdo completo entre tú y UseMyChat.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">13.2 Divisibilidad</h3>
                <p>
                  Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes continuarán en pleno vigor y efecto.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">13.3 Renuncia</h3>
                <p>
                  Ninguna renuncia a cualquier término de estos Términos se considerará una renuncia adicional o continua de dicho término o de cualquier otro término.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">13.4 Cesión</h3>
                <p>
                  No puedes ceder o transferir estos Términos sin nuestro consentimiento previo por escrito. Podemos ceder estos Términos sin restricciones.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">13.5 Notificaciones</h3>
                <p>
                  Las notificaciones se enviarán por correo electrónico a la dirección asociada con tu cuenta o mediante aviso en el Servicio.
                </p>

                <h3 className="text-xl font-bold text-black mt-6">13.6 Contacto</h3>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p><strong>UseMyChat Inc.</strong></p>
                  <p>Email: <a href="mailto:legal@usemychat.com" className="text-black underline">legal@usemychat.com</a></p>
                  <p>Dirección: Av. Paulista 1000, São Paulo, SP, Brasil</p>
                  <p>Teléfono: +55 11 1234-5678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">¿Preguntas sobre los Términos?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Nuestro equipo legal está disponible para aclarar cualquier duda
          </p>
          <Link href="/contacto" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all">
            Contactar Equipo Legal
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
