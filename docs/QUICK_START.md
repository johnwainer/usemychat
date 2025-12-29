# 🚀 Inicio Rápido - UseMyChat

## Para Desarrolladores Nuevos

### 1. Clonar el Repositorio

```bash
git clone https://github.com/johnwainer/usemychat.git
cd usemychat
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**¿Dónde obtener las credenciales?**
1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings → API**
4. Copia **Project URL** y **anon/public key**

### 4. Configurar Base de Datos

#### Opción A: SQL Editor (Más fácil)

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Abre **SQL Editor**
3. Copia todo el contenido de `supabase/migrations/COMPLETE_TEAM_SYSTEM.sql`
4. Pega en el editor y haz clic en **Run**

#### Opción B: Supabase CLI

```bash
# Instalar CLI
npm install -g supabase

# Login
npx supabase login

# Vincular proyecto
npx supabase link --project-ref tu-project-ref

# Aplicar migraciones
npx supabase db push
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 6. Crear Primera Cuenta

1. Ve a `/register`
2. Crea una cuenta
3. Verifica tu email (si está habilitado en Supabase)
4. Inicia sesión

### 7. Crear Usuario Admin (Opcional)

Para tener acceso al panel de administración:

```sql
-- Ejecuta en Supabase SQL Editor
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'tu-email@ejemplo.com';
```

Luego cierra sesión y vuelve a iniciar sesión.

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción local
npm start

# Linting
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit
```

---

## Estructura Rápida

```
usemychat/
├── app/                    # Páginas y rutas
│   ├── admin/             # Panel de administración
│   ├── dashboard/         # Panel de cliente
│   ├── team/              # Sistema de equipos
│   └── ...                # Páginas públicas
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuración
│   └── supabase/         # Cliente de Supabase
├── docs/                  # Documentación
│   ├── TEAM_MANAGEMENT.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   └── CLEANUP_SUMMARY.md
└── supabase/
    └── migrations/        # Migraciones SQL
```

---

## Rutas Principales

### Públicas
- `/` - Landing page
- `/login` - Inicio de sesión
- `/register` - Registro
- `/forgot-password` - Recuperar contraseña

### Cliente
- `/dashboard` - Dashboard principal
- `/dashboard/contacts` - Gestión de contactos
- `/dashboard/team` - Gestión de equipo ⭐
- `/dashboard/conversations` - Conversaciones
- `/dashboard/stats` - Estadísticas
- `/dashboard/settings` - Configuración

### Admin
- `/admin/dashboard` - Dashboard admin
- `/admin/users` - Gestión de usuarios
- `/admin/contacts` - Todos los contactos
- `/admin/stats` - Estadísticas globales
- `/admin/activity` - Registro de actividad

### Equipos
- `/team/join/[token]` - Aceptar invitación

---

## Características Principales

### ✅ Sistema de Autenticación
- Login/Registro con Supabase Auth
- Recuperación de contraseña
- Roles (Admin/Client)

### ✅ Sistema de Equipos ⭐
- 5 roles: Owner, Admin, Supervisor, Agent, Viewer
- Invitaciones con tokens únicos
- Asignación de contactos a agentes
- Permisos granulares

### ✅ CRM Completo
- Gestión de contactos
- Historial de interacciones
- Lead scoring
- Lifecycle stages
- Etiquetas y notas

### ✅ Panel de Administración
- Gestión de usuarios
- Estadísticas globales
- Registro de actividad

---

## Solución de Problemas Comunes

### Error: "Invalid API Key"
**Solución:** Verifica que las variables de entorno en `.env.local` sean correctas.

### Error: "Database connection failed"
**Solución:** Asegúrate de haber ejecutado las migraciones SQL en Supabase.

### Error: "Module not found"
**Solución:** Ejecuta `npm install` nuevamente.

### La página no carga
**Solución:** 
1. Verifica que el servidor esté corriendo (`npm run dev`)
2. Revisa la consola del navegador para errores
3. Verifica que las variables de entorno estén configuradas

### No puedo crear contactos
**Solución:** Verifica que las migraciones SQL se hayan ejecutado correctamente en Supabase.

---

## Próximos Pasos

1. **Lee la documentación completa**
   - [README.md](../README.md) - Documentación principal
   - [TEAM_MANAGEMENT.md](TEAM_MANAGEMENT.md) - Sistema de equipos
   - [API.md](API.md) - Funciones y API

2. **Explora el código**
   - Revisa la estructura de carpetas
   - Lee los componentes principales
   - Entiende el flujo de autenticación

3. **Prueba las funcionalidades**
   - Crea contactos
   - Invita miembros al equipo
   - Prueba diferentes roles
   - Registra interacciones

4. **Para producción**
   - Lee [DEPLOYMENT.md](DEPLOYMENT.md)
   - Revisa [SECURITY.md](SECURITY.md)
   - Sigue el checklist de despliegue

---

## Recursos Adicionales

### Documentación
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Comunidad
- [Next.js Discord](https://discord.gg/nextjs)
- [Supabase Discord](https://discord.supabase.com)

---

## ¿Necesitas Ayuda?

1. Revisa la documentación en `/docs`
2. Busca en los issues del repositorio
3. Contacta al equipo de desarrollo

---

**¡Bienvenido a UseMyChat!** 🎉

Ahora estás listo para empezar a desarrollar. Si tienes alguna pregunta, consulta la documentación completa en la carpeta `/docs`.
