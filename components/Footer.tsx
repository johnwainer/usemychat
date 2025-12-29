import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-6 h-6 text-black" />
              <span className="text-xl font-bold text-black">UseMyChat</span>
            </Link>
            <p className="text-sm text-gray-600">
              La plataforma de chat inteligente para tu negocio
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/caracteristicas" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-gray-600 hover:text-black transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacidad" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} UseMyChat. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
