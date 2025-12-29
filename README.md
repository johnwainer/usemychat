# UseMyChat - Plataforma de Gestión de Conversaciones y CRM

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

Una plataforma completa de gestión de conversaciones con clientes, CRM integrado y sistema de equipos colaborativos.

## 🚀 Características Principales

### 🔐 Sistema de Autenticación
- Registro e inicio de sesión seguro con Supabase Auth
- Recuperación de contraseña por email
- Roles de usuario (Admin y Cliente)
- Gestión de perfiles con información personalizada
- Estados de cuenta (activo, inactivo, suspendido)

### 👥 Sistema de Equipos (Nuevo)
- **Miembros ilimitados** por workspace
- **5 roles diferentes**:
  - **Owner**: Acceso completo, gestión de facturación
  - **Admin**: Gestión de equipo y configuraciones
  - **Supervisor**: Supervisión de todas las conversaciones
  - **Agent**: Manejo de conversaciones asignadas
  - **Viewer**: Acceso de solo lectura
- Sistema de invitaciones con tokens únicos
- Asignación de contactos a agentes específicos
- Tracking de actividad de miembros
- Permisos granulares por rol

### 📊 CRM Completo
- **Gestión de Contactos**:
  - Información completa (nombre, email, teléfono, empresa, cargo)
  - Redes sociales integradas
  - Etiquetas personalizables
  - Lead scoring automático
  - Lifecycle stages (Lead, MQL, SQL, Customer, etc.)
  - Asignación a agentes del equipo
  
- **Historial de Interacciones**:
  - Registro de llamadas, emails, reuniones, notas
  - Dirección (entrante/saliente)
  - Análisis de sentimiento
  - Resultados y seguimiento
  - Creación por cualquier miembro del equipo

- **Vista Detallada de Contactos**:
  - Hero section con avatar y datos principales
  - Tarjetas de información organizadas
  - Timeline de interacciones
  - Indicadores visuales de estado

### 💬 Gestión de Conversaciones
- Dashboard de conversaciones
- Filtros y búsqueda avanzada
- Asignación a agentes
- Estados de conversación
- Historial completo

### 📈 Panel de Administración
- Dashboard con métricas clave
- Gestión de usuarios
- Estadísticas de actividad
- Registro de actividad del sistema
- Configuración global

### 🎨 Interfaz de Usuario
- Diseño moderno y responsivo
- Tema claro optimizado
- Iconos de Lucide React
- Animaciones suaves
- Experiencia de usuario intuitiva

## 🛠️ Tecnologías

- **Framework**: Next.js 16.1.1 (App Router)
- **Lenguaje**: TypeScript
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Despliegue**: Vercel

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase
- Git

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/johnwainer/usemychat.git
cd usemychat
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Opcional: Para operaciones del lado del servidor
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar Supabase

#### Opción A: Usando Supabase CLI (Recomendado)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar sesión
npx supabase login

# Vincular proyecto
npx supabase link --project-ref tu-project-ref

# Aplicar migraciones
npx supabase db push
```

#### Opción B: Manualmente en Supabase Dashboard

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Navega a **SQL Editor**
3. Ejecuta el archivo `supabase/migrations/COMPLETE_TEAM_SYSTEM.sql`
4. Verifica que todas las tablas y funciones se crearon correctamente

### 5. Configurar Emails (Importante para invitaciones de equipo) ⭐

Para que las invitaciones de equipo se envíen por email:

1. **Lee la guía completa**: [`docs/EMAIL_SETUP.md`](docs/EMAIL_SETUP.md)

2. **Configuración rápida**:
   - Ve a Supabase Dashboard → Settings → Authentication → SMTP Settings
   - Habilita "Enable Custom SMTP"
   - Configura un proveedor SMTP (SendGrid, Resend, AWS SES)
   - Configura la plantilla de email en Authentication → Email Templates

3. **Proveedores recomendados**:
   - **SendGrid**: Gratis hasta 100 emails/día
   - **Resend**: Gratis hasta 3,000 emails/mes
   - **AWS SES**: Muy económico para alto volumen

4. **Sin SMTP configurado**:
   - Las invitaciones se crean correctamente
   - Puedes copiar el enlace manualmente para compartirlo
   - El botón de reenvío seguirá funcionando

> 📧 **Nota**: Sin SMTP configurado, las invitaciones funcionan pero debes copiar el enlace manualmente. Para producción, se recomienda configurar SMTP.

### 6. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
usemychat/
├── app/                          # App Router de Next.js
│   ├── admin/                    # Panel de administración
│   │   ├── dashboard/           # Dashboard admin
│   │   ├── users/               # Gestión de usuarios
│   │   ├── contacts/            # Gestión de contactos
│   │   ├── stats/               # Estadísticas
│   │   ├── activity/            # Registro de actividad
│   │   └── settings/            # Configuración
│   ├── dashboard/               # Panel de cliente
│   │   ├── conversations/       # Conversaciones
│   │   ├── contacts/            # Contactos del cliente
│   │   ├── team/                # Gestión de equipo ⭐
│   │   ├── stats/               # Estadísticas
│   │   └── settings/            # Configuración
│   ├── team/                    # Sistema de equipos
│   │   └── join/[token]/        # Aceptar invitaciones ⭐
│   ├── login/                   # Inicio de sesión
│   ├── register/                # Registro
│   ├── forgot-password/         # Recuperar contraseña
│   ├── reset-password/          # Restablecer contraseña
│   └── ...                      # Páginas públicas
├── components/                   # Componentes reutilizables
├── lib/                         # Utilidades y configuración
│   └── supabase/               # Cliente de Supabase
├── supabase/                    # Configuración de Supabase
│   └── migrations/             # Migraciones SQL
├── docs/                        # Documentación
│   ├── TEAM_MANAGEMENT.md      # Guía del sistema de equipos
│   ├── EMAIL_SETUP.md          # Configuración de emails
│   ├── SECURITY.md             # Seguridad
│   ├── DEPLOYMENT.md           # Despliegue
│   ├── API.md                  # Documentación de API
│   └── QUICK_START.md          # Inicio rápido
└── public/                      # Archivos estáticos
```

## 🗄️ Esquema de Base de Datos

### Tablas Principales

#### `profiles`
Perfiles de usuario con información extendida
- Roles: admin, client
- Estados: active, inactive, suspended
- Información de contacto y empresa

#### `contacts`
Sistema CRM de contactos
- Información completa del contacto
- Lead scoring y lifecycle stages
- Asignación a agentes (`assigned_to`)
- Etiquetas y redes sociales

#### `contact_interactions`
Historial de interacciones con contactos
- Tipos: call, email, meeting, note, message
- Dirección, sentimiento, resultado
- Creador de la interacción (`created_by`)

#### `team_members` ⭐
Miembros del equipo por workspace
- Roles: owner, admin, supervisor, agent, viewer
- Estado activo/inactivo
- Tracking de actividad

#### `team_invitations` ⭐
Invitaciones pendientes al equipo
- Token único de invitación
- Expiración automática (7 días)
- Estado de aceptación

#### `team_permissions` ⭐
Permisos granulares por miembro
- Personalización de permisos
- Sistema extensible

### Funciones de Base de Datos

- `is_admin()`: Verifica si un usuario es administrador
- `is_team_member()`: Verifica membresía en equipo
- `has_team_role()`: Verifica rol específico
- `can_manage_team()`: Verifica permisos de gestión
- `get_team_role()`: Obtiene rol del usuario

### Seguridad (RLS)

Todas las tablas tienen Row Level Security (RLS) habilitado con políticas específicas:
- Los usuarios solo ven sus propios datos
- Los miembros del equipo tienen acceso compartido
- Los administradores tienen acceso completo
- Los agentes solo ven datos asignados

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

```bash
npm run build
```

### Variables de Entorno en Producción

Asegúrate de configurar en Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

## 📖 Guías de Uso

### Para Administradores

1. **Gestión de Usuarios**
   - Aprobar/rechazar nuevos registros
   - Suspender cuentas
   - Ver actividad del sistema

2. **Gestión de Contactos**
   - Ver todos los contactos del sistema
   - Crear interacciones en nombre de clientes
   - Exportar datos

### Para Clientes (Owners)

1. **Gestión de Equipo**
   - Invitar miembros desde `/dashboard/team`
   - Asignar roles apropiados
   - Gestionar permisos

2. **Gestión de Contactos**
   - Crear y editar contactos
   - Asignar contactos a agentes
   - Registrar interacciones
   - Ver estadísticas

### Para Miembros del Equipo

1. **Agentes**
   - Ver contactos asignados
   - Registrar interacciones
   - Actualizar información de contactos

2. **Supervisores**
   - Ver todas las conversaciones
   - Supervisar actividad de agentes
   - Acceso a reportes completos

3. **Viewers**
   - Acceso de solo lectura
   - Ver conversaciones y contactos
   - Consultar reportes

## 🔒 Seguridad

### Mejores Prácticas Implementadas

- ✅ Variables de entorno para credenciales
- ✅ Row Level Security (RLS) en todas las tablas
- ✅ Validación de permisos por rol
- ✅ Tokens únicos para invitaciones
- ✅ Expiración automática de invitaciones
- ✅ Sanitización de inputs
- ✅ HTTPS en producción
- ✅ Autenticación segura con Supabase

### Archivos Protegidos

El `.gitignore` está configurado para excluir:
- Archivos `.env*`
- `node_modules/`
- `.next/`
- `.supabase/`
- Archivos temporales y logs

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm test

# Build de producción
npm run build

# Verificar tipos de TypeScript
npm run type-check
```

## 📚 Documentación Adicional

- [Guía del Sistema de Equipos](docs/TEAM_MANAGEMENT.md)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

### Próximas Características

- [ ] Sistema de notificaciones en tiempo real
- [ ] Integración con WhatsApp Business API
- [ ] Chatbot con IA
- [ ] Reportes avanzados y analytics
- [ ] Exportación de datos (CSV, Excel)
- [ ] Integración con calendarios (Google, Outlook)
- [ ] Sistema de tickets
- [ ] Automatizaciones y workflows
- [ ] API pública para integraciones
- [ ] Aplicación móvil

### Mejoras del Sistema de Equipos

- [ ] Notificaciones por email en invitaciones
- [ ] Dashboard de actividad del equipo
- [ ] Permisos granulares personalizables
- [ ] Límites de miembros según plan
- [ ] Historial de cambios de roles
- [ ] Reportes de productividad por agente
- [ ] Asignación automática de conversaciones

## 📄 Licencia

Este proyecto es privado y propietario.

## 👨‍💻 Autor

**John Wainer**
- GitHub: [@johnwainer](https://github.com/johnwainer)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Nota**: Este README se actualiza constantemente. Para la versión más reciente, consulta el repositorio.

## 📞 Soporte

Para soporte técnico o preguntas:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo

---

Hecho con ❤️ por el equipo de UseMyChat
