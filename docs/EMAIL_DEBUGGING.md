un red# 🔍 Guía de Depuración - Email de Invitaciones

## ✅ Problema Resuelto

**Causa principal:** El API route estaba usando `createClient()` (con ANON_KEY) en lugar de `createAdminClient()` (con SERVICE_ROLE_KEY).

El método `supabase.auth.admin.inviteUserByEmail()` requiere permisos de administrador.

## 🎯 Flujo de Invitación Mejorado

### Cómo funciona ahora:

1. **Usuario invita a un miembro** desde `/dashboard/team`
2. **Email se envía** con enlace: `https://usemychat.vercel.app/team/join/[token]`
3. **Usuario hace click** en el enlace del email
4. **Sistema detecta** si el usuario está autenticado:
   - ✅ **Si está autenticado:** Muestra botón "Aceptar Invitación"
   - ❌ **Si NO está autenticado:** Redirige a `/register` con:
     - Email pre-llenado (del parámetro `?email=`)
     - Email bloqueado (no se puede cambiar)
     - Banner azul indicando "Invitación de equipo"
5. **Después de registrarse/login:** Redirige automáticamente a aceptar la invitación
6. **Invitación aceptada:** Usuario se une al equipo

### Validaciones importantes:

- ✅ El email del usuario debe coincidir con el email de la invitación
- ✅ La invitación no debe estar expirada (7 días)
- ✅ La invitación no debe haber sido aceptada previamente

## 📋 Checklist de Verificación

### 1️⃣ Verificar Service Role Key en Vercel

**CRÍTICO:** Esta es la causa más común del error.

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `usemychat`
3. Ve a **Settings → Environment Variables**
4. Verifica que exista:
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

**Si NO existe:**

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings → API**
4. Copia el **service_role** key (⚠️ NO el anon key)
5. En Vercel, agrega nueva variable:
   - **Name:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Environment:** Production, Preview, Development
6. **IMPORTANTE:** Haz un **Redeploy** del proyecto

### 2️⃣ Verificar Configuración SMTP en Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings → Authentication → SMTP Settings**

**Configuración para Resend:**

```
✅ Enable Custom SMTP: ACTIVADO

Sender email: onboarding@resend.dev  (o tu dominio verificado)
Sender name: UseMyChat

Host: smtp.resend.com
Port: 587
Username: resend
Password: re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ Errores comunes:**
- ❌ Puerto 465 (debe ser **587**)
- ❌ "Enable Custom SMTP" desactivado
- ❌ API Key incorrecta o expirada
- ❌ Email del remitente no verificado

### 3️⃣ Verificar API Key de Resend

1. Ve a [Resend Dashboard](https://resend.com/api-keys)
2. Verifica que tu API Key:
   - ✅ Esté activa (no revocada)
   - ✅ Tenga permisos de "Send emails"
   - ✅ Empiece con `re_`

**Si necesitas crear una nueva:**

```bash
1. Click en "Create API Key"
2. Nombre: "UseMyChat Production"
3. Permisos: "Sending access"
4. Copia la key completa
5. Pégala en Supabase SMTP Settings (campo Password)
6. Guarda los cambios
```

### 4️⃣ Verificar Dominio del Remitente

**Opción A: Usar dominio de Resend (más fácil, para testing)**
```
Sender email: onboarding@resend.dev
```
✅ No requiere verificación
✅ Funciona inmediatamente

**Opción B: Usar tu dominio (recomendado para producción)**

1. Ve a [Resend Domains](https://resend.com/domains)
2. Click en "Add Domain"
3. Ingresa tu dominio (ej: `usemychat.com`)
4. Agrega los registros DNS que te proporciona Resend:
   - **SPF:** `v=spf1 include:_spf.resend.com ~all`
   - **DKIM:** Registro TXT proporcionado por Resend
   - **DMARC:** `v=DMARC1; p=none;`
5. Espera verificación (puede tardar hasta 48h)
6. Una vez verificado, usa: `noreply@tudominio.com`

### 5️⃣ Verificar Variables de Entorno en Vercel

**Variables requeridas:**

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App
NEXT_PUBLIC_APP_URL=https://usemychat.vercel.app
```

**Después de agregar/modificar variables:**
1. Ve a **Deployments**
2. Click en los 3 puntos del último deployment
3. Click en **Redeploy**
4. Selecciona **Use existing Build Cache** (más rápido)

### 6️⃣ Verificar Logs en Vercel

1. Ve a tu proyecto en Vercel
2. Click en **Logs** o **Functions**
3. Filtra por `/api/team/send-invitation`
4. Busca los logs:

**Logs exitosos:**
```
📧 Starting invitation process: {...}
✅ User authenticated: ...
🔗 Invitation link: ...
📝 Preparing email data: {...}
✅ Email sent successfully: {...}
```

**Logs con error:**
```
❌ Email error details: {
  message: "...",
  code: "...",
  status: ...
}
```

**Errores comunes y soluciones:**

| Error | Causa | Solución |
|-------|-------|----------|
| `Invalid API key` | API Key incorrecta | Verifica en Resend Dashboard |
| `Unauthorized` | Falta SERVICE_ROLE_KEY | Agrega variable en Vercel |
| `SMTP connection failed` | Puerto incorrecto | Usa puerto 587 |
| `Sender not verified` | Dominio no verificado | Usa `onboarding@resend.dev` |
| `Rate limit exceeded` | Demasiados emails | Espera o upgrade plan |

### 7️⃣ Probar el Sistema

**Después de hacer los cambios:**

1. **Redeploy** en Vercel
2. Espera a que termine el deployment
3. Ve a `https://usemychat.vercel.app/dashboard/team`
4. Invita a un email de prueba
5. Verifica:
   - ✅ El email llega
   - ✅ El diseño se ve bien
   - ✅ El botón funciona
   - ✅ El enlace redirecciona correctamente

### 8️⃣ Verificar Plantilla de Email

1. Ve a Supabase Dashboard
2. **Authentication → Email Templates**
3. Selecciona **"Invite user"**
4. Verifica que la plantilla esté configurada
5. Si no está, copia la plantilla de `docs/EMAIL_SETUP.md`

## 🔧 Comandos Útiles

**Ver logs en tiempo real (local):**
```bash
vercel logs --follow
```

**Probar localmente:**
```bash
npm run dev
# Ve a http://localhost:3000/dashboard/team
```

**Verificar variables de entorno:**
```bash
vercel env ls
```

## 📞 Soporte

Si después de seguir todos los pasos el problema persiste:

1. **Revisa los logs en Vercel** y copia el error exacto
2. **Verifica en Resend Dashboard** si hay errores en el log de emails
3. **Prueba con `onboarding@resend.dev`** para descartar problemas de dominio
4. **Verifica que el SERVICE_ROLE_KEY** esté correctamente configurado

## ✅ Checklist Final

- [ ] `SUPABASE_SERVICE_ROLE_KEY` agregada en Vercel
- [ ] Proyecto redeployado después de agregar la variable
- [ ] SMTP configurado en Supabase con puerto 587
- [ ] API Key de Resend válida y activa
- [ ] "Enable Custom SMTP" activado en Supabase
- [ ] Sender email configurado (usar `onboarding@resend.dev` para testing)
- [ ] Plantilla de email configurada en Supabase
- [ ] `NEXT_PUBLIC_APP_URL` apunta a `https://usemychat.vercel.app`
- [ ] Logs verificados en Vercel
- [ ] Email de prueba enviado y recibido

## 🎯 Resultado Esperado

Después de seguir esta guía, deberías ver:

```
✅ Invitación enviada por email exitosamente
```

Y el usuario invitado debería recibir un email con el diseño moderno de UseMyChat.
