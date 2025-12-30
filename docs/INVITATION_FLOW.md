# 🎯 Flujo Completo de Invitaciones de Equipo

## 📊 Diagrama de Flujo

```
┌─────────────────────────────────────────────────────────────────┐
│                    INVITAR MIEMBRO AL EQUIPO                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. Owner/Admin va a /dashboard/team                            │
│  2. Click en "Invitar Miembro"                                  │
│  3. Ingresa: email, rol (admin/supervisor/agent/viewer)         │
│  4. Click en "Enviar Invitación"                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND: /api/team/send-invitation                             │
│  - Crea registro en tabla team_invitations                      │
│  - Genera token único                                            │
│  - Expira en 7 días                                              │
│  - Envía email usando Supabase Auth Admin                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  EMAIL ENVIADO                                                   │
│  - Diseño moderno con branding UseMyChat                        │
│  - Nombre del invitador                                          │
│  - Rol asignado en español                                       │
│  - Botón "Aceptar Invitación"                                   │
│  - Link: https://usemychat.vercel.app/team/join/[token]        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  USUARIO HACE CLICK EN EL ENLACE                                │
│  Abre: /team/join/[token]                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────┴─────────┐
                    │                   │
              ¿Autenticado?             │
                    │                   │
         ┌──────────┴──────────┐        │
         │                     │        │
        SÍ                    NO        │
         │                     │        │
         ▼                     ▼        │
┌─────────────────┐   ┌─────────────────────────────────┐
│ Muestra página  │   │ ⚡ REDIRECCIÓN AUTOMÁTICA       │
│ de invitación   │   │ a /register                     │
│                 │   │ ?redirect=/team/join/[token]    │
│ - Info del      │   │ &email=invitado@email.com       │
│   invitador     │   │                                 │
│ - Rol asignado  │   │ ✨ Sin necesidad de click       │
│ - Botón         │   └─────────────────────────────────┘
│   "Aceptar"     │                 │
│                 │                 ▼
│ Validación:     │   ┌─────────────────────────────────┐
│ ✓ Email match   │   │ PÁGINA DE REGISTRO              │
│ ✓ No expirada   │   │ - Email pre-llenado y bloqueado │
│ ✓ No aceptada   │   │ - Banner azul "Invitación"      │
└─────────────────┘   │ - Título adaptado               │
         │             │ - Link a login preserva params  │
         │             └─────────────────────────────────┘
         │                           │
         │                           ▼
         │              ┌─────────────────────────────────┐
         │              │ Usuario completa registro       │
         │              │ - Nombre completo               │
         │              │ - Email (bloqueado)             │
         │              │ - Contraseña                    │
         │              │ - Empresa (opcional)            │
         │              └─────────────────────────────────┘
         │                           │
         │                           ▼
         │              ┌─────────────────────────────────┐
         │              │ Cuenta creada exitosamente      │
         │              │ Redirige a: /team/join/[token]  │
         │              └─────────────────────────────────┘
         │                           │
         └───────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  ACEPTAR INVITACIÓN                                             │
│  - Click en "Aceptar Invitación"                               │
│  - Crea registro en team_members                               │
│  - Marca invitación como aceptada                              │
│  - Asigna rol al usuario                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  ✅ ÉXITO                                                        │
│  Redirige a: /dashboard?welcome=team                            │
│  Usuario ahora es miembro del equipo                            │
└─────────────────────────────────────────────────────────────────┘
```
│ - Info del      │   └─────────────────────────────────┘
│   invitador     │                 │
│ - Rol asignado  │                 ▼
│ - Botón         │   ┌─────────────────────────────────┐
│   "Aceptar"     │   │ PÁGINA DE REGISTRO              │
│                 │   │ - Email pre-llenado y bloqueado │
│ Validación:     │   │ - Banner azul "Invitación"      │
│ ✓ Email match   │   │ - Título adaptado               │
│ ✓ No expirada   │   │ - Link a login preserva params  │
│ ✓ No aceptada   │   └─────────────────────────────────┘
└─────────────────┘                 │
         │                           ▼
         │              ┌─────────────────────────────────┐
         │              │ Usuario completa registro       │
         │              │ - Nombre completo               │
         │              │ - Email (bloqueado)             │
         │              │ - Contraseña                    │
         │              │ - Empresa (opcional)            │
         │              └─────────────────────────────────┘
         │                           │
         │                           ▼
         │              ┌─────────────────────────────────┐
         │              │ Cuenta creada exitosamente      │
         │              │ Redirige a: /team/join/[token]  │
         │              └─────────────────────────────────┘
         │                           │
         └───────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  ACEPTAR INVITACIÓN                                             │
│  - Click en "Aceptar Invitación"                               │
│  - Crea registro en team_members                               │
│  - Marca invitación como aceptada                              │
│  - Asigna rol al usuario                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  ✅ ÉXITO                                                        │
│  Redirige a: /dashboard?welcome=team                            │
│  Usuario ahora es miembro del equipo                            │
└─────────────────────────────────────────────────────────────────┘
```

## 🔑 Componentes Clave

### 1. Página de Gestión de Equipo
**Ruta:** `/dashboard/team`
**Archivo:** `app/dashboard/team/page.tsx`

**Funcionalidades:**
- Listar miembros del equipo
- Invitar nuevos miembros
- Reenviar invitaciones pendientes
- Cambiar roles
- Desactivar miembros

### 2. API de Envío de Invitaciones
**Ruta:** `/api/team/send-invitation`
**Archivo:** `app/api/team/send-invitation/route.ts`

**Proceso:**
1. Valida autenticación (requiere SERVICE_ROLE_KEY)
2. Crea invitación en base de datos
3. Genera token único
4. Envía email usando `supabase.auth.admin.inviteUserByEmail()`
5. Retorna link de invitación (fallback si email falla)

**Datos enviados al email:**
```typescript
{
  invitation_type: 'team_member',
  role: 'Agente', // En español
  invited_by: user.id,
  inviter_name: 'Juan Pérez',
  invitation_link: 'https://usemychat.vercel.app/team/join/abc123'
}
```

### 3. Página de Aceptación de Invitación
**Ruta:** `/team/join/[token]`
**Archivo:** `app/team/join/[token]/page.tsx`

**Flujo automático:**
1. **Carga la invitación** desde la base de datos
2. **Verifica autenticación** del usuario
3. **⚡ Si NO está autenticado:** Redirige automáticamente a `/register` con email pre-llenado
4. **Si está autenticado:** Muestra página de confirmación

**Estados:**
- **Loading:** Verificando invitación
- **Auto-redirect:** Si no hay usuario, redirige a registro (sin mostrar botones)
- **Error:** Invitación inválida/expirada/ya aceptada
- **Email no coincide:** Mensaje de error
- **Listo para aceptar:** Botón "Aceptar Invitación"

**Código clave:**
```typescript
// Redirección automática para usuarios no autenticados
useEffect(() => {
  if (!loading && invitation && !currentUser) {
    router.push(`/register?redirect=/team/join/${token}&email=${encodeURIComponent(invitation.email)}`);
  }
}, [loading, invitation, currentUser, token, router]);
```

### 4. Página de Registro
**Ruta:** `/register`
**Archivo:** `app/register/page.tsx`

**Detección de invitación:**
```typescript
const redirect = searchParams.get('redirect');
const invitationEmail = searchParams.get('email');
const isInvitation = redirect?.includes('/team/join/');
```

**Comportamiento especial:**
- Email pre-llenado desde query param
- Email bloqueado (readonly) si viene de invitación
- Banner azul indicando contexto de invitación
- Título adaptado: "Crea tu cuenta para unirte"
- Redirige a invitación después de registro

### 5. Página de Login
**Ruta:** `/login`
**Archivo:** `app/login/page.tsx`

**Comportamiento especial:**
- Email pre-llenado desde query param
- Banner azul indicando contexto de invitación
- Título adaptado: "Inicia sesión para unirte"
- Redirige a invitación después de login

## 📧 Plantilla de Email

**Ubicación:** Supabase Dashboard → Authentication → Email Templates → Invite user

**Características:**
- ✅ Diseño moderno y responsive
- ✅ Branding UseMyChat (colores azul #3B82F6)
- ✅ Información del invitador
- ✅ Rol asignado en español
- ✅ Botón CTA destacado
- ✅ Link alternativo para copiar
- ✅ Indicadores de expiración y seguridad
- ✅ Compatible con todos los clientes de email

**Variables dinámicas:**
- `{{ .Data.inviter_name }}` - Nombre del invitador
- `{{ .Data.role }}` - Rol en español
- `{{ .Data.invitation_link }}` - Link único de invitación

## 🗄️ Estructura de Base de Datos

### Tabla: `team_invitations`
```sql
CREATE TABLE team_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_owner_id UUID REFERENCES profiles(id),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'supervisor', 'agent', 'viewer')),
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  accepted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: `team_members`
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  workspace_owner_id UUID REFERENCES profiles(id),
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  joined_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Seguridad

### Validaciones en el Backend
1. **Autenticación requerida** para enviar invitaciones
2. **SERVICE_ROLE_KEY** para usar `admin.inviteUserByEmail()`
3. **Token único** generado con UUID
4. **Expiración** de 7 días
5. **Email match** al aceptar invitación
6. **Una sola aceptación** por invitación

### Validaciones en el Frontend
1. **Usuario autenticado** para aceptar
2. **Email coincide** con invitación
3. **Invitación no expirada**
4. **Invitación no aceptada previamente**

## 🎨 Experiencia de Usuario

### Indicadores Visuales
- 🔵 **Banner azul** en login/register cuando viene de invitación
- 📧 **Email bloqueado** con mensaje explicativo
- ✉️ **Ícono de sobre** en página de invitación
- 👤 **Avatar del invitador** con inicial
- 🏢 **Empresa del invitador** (si disponible)
- 🎯 **Rol asignado** con ícono y descripción
- ⏰ **Fecha de expiración** visible
- 🔒 **Indicador de seguridad**

### Mensajes Adaptativos
- Títulos cambian según contexto (invitación vs registro normal)
- Mensajes de éxito personalizados
- Links entre login/register preservan parámetros
- Redirecciones inteligentes después de autenticación

## 🚀 Flujo de Desarrollo

### Testing Local
```bash
# 1. Iniciar servidor
npm run dev

# 2. Ir a dashboard de equipo
http://localhost:3000/dashboard/team

# 3. Invitar a un email de prueba
# 4. Copiar el link de invitación
# 5. Abrir en navegador incógnito
# 6. Verificar flujo completo

## 🎨 Experiencia de Usuario

### Flujo Optimizado
1. **Usuario recibe email** → Click en enlace
2. **⚡ Redirección automática** a registro (sin pasos intermedios)
3. **Email pre-llenado y bloqueado** (no puede cambiarlo)
4. **Banner azul** indica que es una invitación
5. **Completa registro** → Automáticamente vuelve a aceptar invitación
6. **¡Listo!** Ya es miembro del equipo

### Indicadores Visuales
- 🔵 **Banner azul** en login/register cuando viene de invitación
- 📧 **Email bloqueado** con mensaje explicativo
- ✉️ **Ícono de sobre** en página de invitación
- 👤 **Avatar del invitador** con inicial
- 🏢 **Empresa del invitador** (si disponible)
- 🎯 **Rol asignado** con ícono y descripción
- ⏰ **Fecha de expiración** visible
- 🔒 **Indicador de seguridad**
- ⚡ **Sin botones innecesarios** - redirección automática

### Mensajes Adaptativos
- Títulos cambian según contexto (invitación vs registro normal)
- Mensajes de éxito personalizados
- Links entre login/register preservan parámetros
- Redirecciones inteligentes después de autenticación
```

### Testing en Producción
```bash
# 1. Verificar variables de entorno en Vercel
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_APP_URL=https://usemychat.vercel.app

# 2. Verificar SMTP en Supabase
# 3. Enviar invitación de prueba
# 4. Verificar email recibido
# 5. Probar flujo completo
```

## 📝 Checklist de Implementación

- [x] Tabla `team_invitations` creada
- [x] Tabla `team_members` creada
- [x] API route `/api/team/send-invitation` implementada
- [x] Página `/dashboard/team` con UI de invitaciones
- [x] Página `/team/join/[token]` implementada
- [x] Registro con soporte de invitaciones
- [x] Login con soporte de invitaciones
- [x] Plantilla de email diseñada
- [x] SMTP configurado (Resend)
- [x] Variables de entorno configuradas
- [x] Testing completo
- [x] Documentación creada

## 🐛 Troubleshooting

### Email no se envía
- ✅ Verificar `SUPABASE_SERVICE_ROLE_KEY` en Vercel
- ✅ Verificar SMTP configurado en Supabase
- ✅ Verificar API Key de Resend válida
- ✅ Revisar logs en Vercel

### Invitación no se acepta
- ✅ Verificar que email coincida
- ✅ Verificar que no esté expirada
- ✅ Verificar que no esté ya aceptada
- ✅ Revisar permisos de base de datos

### Redirect no funciona
- ✅ Verificar `NEXT_PUBLIC_APP_URL` en Vercel
- ✅ Verificar Site URL en Supabase
- ✅ Verificar Redirect URLs en Supabase

## 📚 Documentación Relacionada

- [EMAIL_SETUP.md](EMAIL_SETUP.md) - Configuración de SMTP y plantillas
- [EMAIL_DEBUGGING.md](EMAIL_DEBUGGING.md) - Guía de depuración
- [TEAM_MANAGEMENT.md](TEAM_MANAGEMENT.md) - Gestión de equipos
- [DEPLOYMENT.md](DEPLOYMENT.md) - Despliegue en producción

## ✅ Resultado Final

El sistema de invitaciones ahora proporciona:
- ✅ Envío automático de emails profesionales
- ✅ Flujo de registro optimizado para invitaciones
- ✅ Email pre-llenado y bloqueado
- ✅ Indicadores visuales claros
- ✅ Validaciones de seguridad robustas
- ✅ Experiencia de usuario fluida
- ✅ Fallback si SMTP no está configurado
- ✅ Documentación completa

¡El sistema está listo para producción! 🎉
