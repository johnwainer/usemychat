# UseMyChat - Plataforma Omnicanal con IA

Plataforma omnicanal con IA integrada para gestionar todas tus conversaciones de WhatsApp, Instagram, Facebook, Telegram y más canales desde un solo lugar.

## 🚀 Características

- **Omnicanal**: WhatsApp, Instagram, Facebook, Telegram y más
- **IA Generativa**: Bots inteligentes que aprenden y responden como humanos
- **CRM Integrado**: Gestión completa de clientes y leads
- **Automatización**: Flujos de trabajo inteligentes
- **Analytics Avanzado**: Reportes en tiempo real
- **Campañas con IA**: Optimización automática de campañas

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Deployment**: Vercel
- **Iconos**: Lucide React

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/johnwainer/usemychat.git
cd usemychat
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Configuración de Supabase

### 1. Crea un proyecto en Supabase

Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto.

### 2. Obtén tus credenciales

En tu proyecto de Supabase:
- Ve a **Settings** > **API**
- Copia tu **Project URL** y **anon/public key**

### 3. Configura la autenticación

En Supabase Dashboard:
- Ve a **Authentication** > **Providers**
- Habilita **Email** provider
- (Opcional) Configura **Google** y **GitHub** OAuth

### 4. Ejecuta las migraciones

Las tablas se crearán automáticamente al iniciar la aplicación.

## 🚀 Deployment en Vercel

### Opción 1: Deploy con un click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/johnwainer/usemychat)

### Opción 2: Deploy manual

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configura las variables de entorno en Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Estructura del Proyecto

```
usemychat/
├── app/
│   ├── contacto/          # Página de contacto
│   ├── faqs/              # Preguntas frecuentes
│   ├── login/             # Inicio de sesión
│   ├── register/          # Registro
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Landing page
│   └── globals.css        # Estilos globales
├── lib/
│   └── supabase/          # Configuración de Supabase
├── public/                # Archivos estáticos
├── .env.example           # Ejemplo de variables de entorno
└── package.json
```

## 🔐 Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Opcional: Para producción
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta el linter
npm run type-check   # Verifica los tipos de TypeScript
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📧 Contacto

- Website: [usemychat.com](https://usemychat.com)
- Email: contacto@usemychat.com
- GitHub: [@johnwainer](https://github.com/johnwainer)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Hecho con ❤️ por el equipo de UseMyChat
```
