# Guía de Despliegue - UseMyChat

Esta guía te ayudará a desplegar UseMyChat en producción usando Vercel y Supabase.

## 📋 Pre-requisitos

- Cuenta de [Vercel](https://vercel.com)
- Cuenta de [Supabase](https://supabase.com)
- Repositorio de GitHub con el código
- Node.js 18+ instalado localmente

## 🗄️ Paso 1: Configurar Supabase

### 1.1 Crear Proyecto en Supabase

1. Ve a [Supabase Dashboard](https://app.supabase.com)
2. Haz clic en "New Project"
3. Completa la información:
   - **Name**: usemychat-production
   - **Database Password**: Genera una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana a tus usuarios
   - **Pricing Plan**: Selecciona según tus necesidades

4. Espera a que el proyecto se cree (2-3 minutos)

### 1.2 Obtener Credenciales

1. Ve a **Settings → API**
2. Copia y guarda:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...`
   - **service_role key**: `eyJhbGc...` (solo si es necesario)

### 1.3 Ejecutar Migraciones

#### Opción A: Usando SQL Editor (Recomendado para primera vez)

1. Ve a **SQL Editor** en Supabase Dashboard
2. Crea una nueva query
3. Copia todo el contenido de `supabase/migrations/COMPLETE_TEAM_SYSTEM.sql`
4. Pega en el editor
5. Haz clic en **Run**
6. Verifica que no haya errores

#### Opción B: Usando Supabase CLI

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

### 1.4 Configurar Autenticación

1. Ve a **Authentication → Settings**
2. Configura:
   - **Site URL**: `https://tu-dominio.com`
   - **Redirect URLs**: 
     - `https://tu-dominio.com/auth/callback`
     - `https://tu-dominio.com/reset-password`
   - **Email Templates**: Personaliza los emails
   - **Email Confirmations**: Habilitar (recomendado)

3. En **Auth Providers**:
   - Habilita Email/Password
   - Configura otros providers si es necesario (Google, GitHub, etc.)

### 1.5 Configurar Políticas de Seguridad

1. Ve a **Authentication → Policies**
2. Configura:
   - **Password Requirements**: Mínimo 8 caracteres
   - **Rate Limiting**: Habilitar
   - **CAPTCHA**: Habilitar para registro (opcional)

## 🚀 Paso 2: Desplegar en Vercel

### 2.1 Conectar Repositorio

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **Add New → Project**
3. Importa tu repositorio de GitHub
4. Selecciona el repositorio `usemychat`

### 2.2 Configurar Proyecto

1. **Framework Preset**: Next.js (detectado automáticamente)
2. **Root Directory**: `./` (raíz del proyecto)
3. **Build Command**: `npm run build` (por defecto)
4. **Output Directory**: `.next` (por defecto)

### 2.3 Configurar Variables de Entorno

En la sección **Environment Variables**, agrega:

```env
# Supabase (REQUERIDO)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# App URL (REQUERIDO)
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app

# Service Role (OPCIONAL - Solo si es necesario)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Importante**: 
- Usa las credenciales de tu proyecto de Supabase
- `NEXT_PUBLIC_APP_URL` debe ser tu dominio de Vercel o dominio personalizado
- El `service_role_key` solo si tienes operaciones del lado del servidor que lo requieran

### 2.4 Desplegar

1. Haz clic en **Deploy**
2. Espera a que el build termine (2-5 minutos)
3. Una vez completado, obtendrás una URL: `https://tu-proyecto.vercel.app`

## 🌐 Paso 3: Configurar Dominio Personalizado (Opcional)

### 3.1 En Vercel

1. Ve a tu proyecto en Vercel
2. Ve a **Settings → Domains**
3. Agrega tu dominio: `usemychat.com`
4. Sigue las instrucciones para configurar DNS

### 3.2 Configurar DNS

En tu proveedor de dominio (GoDaddy, Namecheap, etc.):

**Para dominio raíz (usemychat.com)**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**Para subdominio (www.usemychat.com)**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 Actualizar Variables de Entorno

1. Ve a **Settings → Environment Variables** en Vercel
2. Actualiza `NEXT_PUBLIC_APP_URL` a tu dominio personalizado
3. Redeploy el proyecto

### 3.4 Actualizar Supabase

1. Ve a Supabase Dashboard
2. **Authentication → Settings**
3. Actualiza:
   - **Site URL**: `https://usemychat.com`
   - **Redirect URLs**: Agrega tu dominio personalizado

## 📧 Paso 4: Configurar Emails (Importante) ⭐

### 4.1 ¿Por qué configurar emails?

El sistema de invitaciones de equipo envía emails automáticamente. Sin configuración SMTP:
- ✅ Las invitaciones se crean correctamente
- ⚠️ Los emails NO se envían
- 📋 Debes copiar el enlace manualmente

### 4.2 Configuración Rápida

**Lee la guía completa**: [`EMAIL_SETUP.md`](EMAIL_SETUP.md)

**Pasos básicos**:

1. **Elegir proveedor SMTP** (recomendados):
   - **SendGrid**: Gratis hasta 100 emails/día
   - **Resend**: Gratis hasta 3,000 emails/mes
   - **AWS SES**: Muy económico para alto volumen

2. **Configurar en Supabase**:
   - Ve a **Settings → Authentication → SMTP Settings**
   - Habilita "Enable Custom SMTP"
   - Configura las credenciales del proveedor

3. **Configurar plantilla de email**:
   - Ve a **Authentication → Email Templates**
   - Selecciona "Invite user"
   - Copia la plantilla de `EMAIL_SETUP.md`

### 4.3 Ejemplo con SendGrid

```
Sender email: noreply@tudominio.com
Sender name: UseMyChat
Host: smtp.sendgrid.net
Port: 587
Username: apikey
Password: [tu API key de SendGrid]
```

### 4.4 Verificar configuración

1. Invita a un miembro de prueba
2. Verifica que llegue el email
3. Prueba el botón de reenvío
4. Verifica que no vaya a spam

> 📧 **Importante**: Para producción, es altamente recomendado configurar SMTP para una mejor experiencia de usuario.

## 🔐 Paso 5: Seguridad Post-Despliegue

### 5.1 Verificar HTTPS

1. Visita tu sitio: `https://tu-dominio.com`
2. Verifica el candado de seguridad en el navegador
3. Vercel proporciona SSL automáticamente

### 5.2 Configurar Headers de Seguridad

Actualiza `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

Commit y push para redesplegar.

### 5.3 Habilitar Protecciones en Vercel

1. Ve a **Settings → Security**
2. Habilita:
   - **Deployment Protection**: Para prevenir acceso no autorizado
   - **DDoS Protection**: Incluido automáticamente

## 📊 Paso 6: Monitoreo y Mantenimiento

### 6.1 Configurar Analytics

**Vercel Analytics**:
1. Ve a tu proyecto en Vercel
2. Ve a **Analytics**
3. Habilita **Web Analytics**
4. Instala el paquete:
   ```bash
   npm install @vercel/analytics
   ```
5. Agrega en `app/layout.tsx`:
   ```typescript
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

**Supabase Analytics**:
- Ve a Supabase Dashboard → Reports
- Monitorea queries, performance, y uso de recursos

### 6.2 Configurar Logging

**Vercel Logs**:
- Ve a tu proyecto → Logs
- Filtra por errores, warnings, etc.

**Supabase Logs**:
- Ve a Supabase Dashboard → Logs
- Monitorea auth, database, y API logs

### 6.3 Backups de Base de Datos

**Supabase automático**:
- Backups diarios automáticos (plan Pro)
- Retención de 7 días

**Manual**:
```bash
npx supabase db dump -f backup.sql
```

### 6.4 Monitoreo de Uptime

## 🔄 Paso 7: Actualizaciones y CI/CD

### 6.1 Despliegue Automático

Vercel despliega automáticamente cuando haces push a GitHub:

- **main/master branch** → Producción
- **otras branches** → Preview deployments

### 6.2 Workflow de Desarrollo

```bash
# Desarrollo local
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios ...
git add .
git commit -m "Add nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
# Vercel creará un preview deployment automáticamente

# Después de revisar, merge a main
# Vercel desplegará a producción automáticamente
```

### 6.3 Rollback

Si algo sale mal:

1. Ve a **Deployments** en Vercel
2. Encuentra el deployment anterior que funcionaba
3. Haz clic en los tres puntos → **Promote to Production**

## ✅ Checklist Final

Antes de considerar el despliegue completo:

### Supabase
- [ ] Proyecto creado y configurado
- [ ] Migraciones ejecutadas correctamente
- [ ] Autenticación configurada
- [ ] Site URL y Redirect URLs actualizados
- [ ] Email templates personalizados
- [ ] RLS policies verificadas

### Vercel
- [ ] Proyecto desplegado exitosamente
- [ ] Variables de entorno configuradas
- [ ] Dominio personalizado configurado (si aplica)
- [ ] SSL/HTTPS funcionando
- [ ] Headers de seguridad configurados

### Funcionalidad
- [ ] Login/Registro funcionando
- [ ] Recuperación de contraseña funcionando
- [ ] Dashboard cargando correctamente
- [ ] Sistema de equipos funcionando
- [ ] CRM de contactos funcionando
- [ ] Permisos por rol funcionando correctamente

### Seguridad
- [ ] No hay credenciales expuestas
- [ ] HTTPS habilitado
- [ ] Rate limiting configurado
- [ ] Backups configurados
- [ ] Monitoreo configurado

### Testing
- [ ] Crear cuenta de prueba
- [ ] Probar flujo completo de usuario
- [ ] Probar invitaciones de equipo
- [ ] Probar permisos por rol
- [ ] Verificar emails de autenticación

## 🆘 Troubleshooting

### Error: "Invalid API Key"
- Verifica que las variables de entorno estén correctas
- Asegúrate de usar las credenciales del proyecto correcto
- Redeploy después de cambiar variables

### Error: "Database connection failed"
- Verifica que las migraciones se ejecutaron correctamente
- Revisa los logs en Supabase Dashboard
- Verifica que el proyecto de Supabase esté activo

### Error: "Redirect URL not allowed"
- Ve a Supabase → Authentication → Settings
- Agrega todas las URLs necesarias en Redirect URLs
- Incluye tanto localhost (desarrollo) como producción

### Build Fails en Vercel
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el código compile localmente: `npm run build`

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs en Vercel Dashboard
2. Revisa los logs en Supabase Dashboard
3. Consulta la documentación:
   - [Vercel Docs](https://vercel.com/docs)
   - [Supabase Docs](https://supabase.com/docs)
4. Abre un issue en el repositorio

---

**¡Felicidades!** 🎉 Tu aplicación está ahora en producción.

Recuerda mantener las dependencias actualizadas y revisar regularmente los logs y métricas.
