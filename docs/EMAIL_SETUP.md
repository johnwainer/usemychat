# 📧 Configuración de Emails para Invitaciones de Equipo

## Descripción

Este documento explica cómo configurar el envío de emails para las invitaciones de equipo en UseMyChat.

## 🎯 Características

- ✅ Envío automático de emails al invitar miembros
- ✅ Botón de reenvío de invitaciones
- ✅ Plantilla de email personalizada
- ✅ Enlaces de invitación seguros con tokens únicos
- ✅ Expiración automática de invitaciones (7 días)
- ✅ Fallback: copiar enlace manualmente si el email falla

---

## 📋 Configuración Paso a Paso

### 1. Configurar SMTP en Supabase (Recomendado para Producción)

#### Opción A: SendGrid (Recomendado - Gratis hasta 100 emails/día)

1. **Crear cuenta en SendGrid**
   - Ve a [SendGrid](https://sendgrid.com)
   - Crea una cuenta gratuita
   - Verifica tu email

2. **Crear API Key**
   - Ve a Settings → API Keys
   - Clic en "Create API Key"
   - Nombre: "UseMyChat SMTP"
   - Permisos: "Full Access" o "Mail Send"
   - Copia la API Key (solo se muestra una vez)

3. **Verificar dominio (Opcional pero recomendado)**
   - Ve a Settings → Sender Authentication
   - Sigue el proceso de verificación de dominio
   - Agrega los registros DNS requeridos

4. **Configurar en Supabase**
   - Ve a Supabase Dashboard → Settings → Authentication
   - Scroll hasta "SMTP Settings"
   - Habilita "Enable Custom SMTP"
   - Configura:
     ```
     Sender email: noreply@tudominio.com
     Sender name: UseMyChat
     Host: smtp.sendgrid.net
     Port: 587
     Username: apikey
     Password: [tu API key de SendGrid]
     ```

#### Opción B: Resend (Moderno y fácil - Gratis hasta 3,000 emails/mes)

1. **Crear cuenta en Resend**
   - Ve a [Resend](https://resend.com)
   - Crea una cuenta
   - Verifica tu email

2. **Crear API Key**
   - Ve a API Keys
   - Clic en "Create API Key"
   - Copia la API Key

3. **Configurar en Supabase**
   ```
   Sender email: noreply@tudominio.com
   Sender name: UseMyChat
   Host: smtp.resend.com
   Port: 587
   Username: resend
   Password: [tu API key de Resend]
   ```

#### Opción C: AWS SES (Más económico para alto volumen)

1. **Configurar AWS SES**
   - Ve a AWS Console → SES
   - Verifica tu dominio o email
   - Crea credenciales SMTP

2. **Configurar en Supabase**
   ```
   Sender email: noreply@tudominio.com
   Sender name: UseMyChat
   Host: email-smtp.[region].amazonaws.com
   Port: 587
   Username: [SMTP Username de AWS]
   Password: [SMTP Password de AWS]
   ```

### 2. Configurar Plantilla de Email

1. **Ve a Supabase Dashboard**
   - Authentication → Email Templates
   - Selecciona "Invite user"

2. **Reemplaza el contenido con:**

```html
<h2>¡Has sido invitado a unirte a un equipo!</h2>

<p>Hola,</p>

<p><strong>{{ .Data.inviter_name }}</strong> te ha invitado a unirte a su equipo en UseMyChat.</p>

<p><strong>Tu rol será:</strong> {{ .Data.role }}</p>

<p>Para aceptar la invitación, haz clic en el siguiente botón:</p>

<p>
  <a href="{{ .Data.invitation_link }}" 
     style="display: inline-block; padding: 12px 24px; background-color: #3B82F6; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
    Aceptar Invitación
  </a>
</p>

<p>O copia y pega este enlace en tu navegador:</p>
<p style="color: #6B7280; font-size: 14px;">{{ .Data.invitation_link }}</p>

<p style="margin-top: 24px; color: #6B7280; font-size: 14px;">
  Esta invitación expirará en 7 días.
</p>

<p style="margin-top: 24px; color: #6B7280; font-size: 14px;">
  Si no esperabas este email, puedes ignorarlo de forma segura.
</p>

<p style="margin-top: 24px;">
  Saludos,<br>
  El equipo de UseMyChat
</p>
```

3. **Guarda los cambios**

### 3. Verificar Variables de Entorno

Asegúrate de que `.env.local` tenga:

```env
NEXT_PUBLIC_APP_URL=https://tudominio.com
# O para desarrollo local:
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Habilitar Confirmación de Email (Opcional)

En Supabase Dashboard → Settings → Authentication:
- ✅ Enable email confirmations
- ✅ Secure email change (opcional)

---

## 🧪 Testing

### Testing Local (Sin SMTP configurado)

1. **Usar Inbucket (incluido con Supabase local)**
   ```bash
   npx supabase start
   ```
   - Los emails se capturan en: http://localhost:54324

2. **O copiar enlace manualmente**
   - Si el email falla, la app muestra un mensaje
   - Puedes copiar el enlace con el botón de copiar

### Testing en Producción

1. **Invitar a un email de prueba**
   - Ve a Dashboard → Team
   - Invita a tu email personal
   - Verifica que llegue el email

2. **Verificar el enlace**
   - Haz clic en el botón del email
   - Debe redirigir a `/team/join/[token]`
   - Debe mostrar los detalles de la invitación

3. **Probar reenvío**
   - En la lista de invitaciones pendientes
   - Haz clic en el botón de reenvío (🔄)
   - Verifica que llegue el email nuevamente

---

## 🎨 Personalizar Plantilla de Email

### Variables Disponibles

- `{{ .Data.inviter_name }}` - Nombre de quien invita
- `{{ .Data.role }}` - Rol asignado
- `{{ .Data.invitation_link }}` - Enlace de invitación
- `{{ .ConfirmationURL }}` - URL de confirmación (alternativa)

### Ejemplo de Plantilla Avanzada

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitación a UseMyChat</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  
  <!-- Header -->
  <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #3B82F6;">
    <h1 style="color: #3B82F6; margin: 0;">UseMyChat</h1>
  </div>

  <!-- Content -->
  <div style="padding: 30px 0;">
    <h2 style="color: #1F2937; margin-bottom: 20px;">¡Has sido invitado!</h2>
    
    <p style="font-size: 16px; color: #4B5563;">
      <strong style="color: #1F2937;">{{ .Data.inviter_name }}</strong> te ha invitado a unirte a su equipo en UseMyChat.
    </p>

    <!-- Role Badge -->
    <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; color: #1E40AF;">
        <strong>Tu rol:</strong> {{ .Data.role }}
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .Data.invitation_link }}" 
         style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
        Aceptar Invitación →
      </a>
    </div>

    <!-- Alternative Link -->
    <div style="background: #F9FAFB; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: #6B7280;">
        O copia y pega este enlace en tu navegador:
      </p>
      <p style="margin: 0; font-size: 12px; color: #9CA3AF; word-break: break-all;">
        {{ .Data.invitation_link }}
      </p>
    </div>

    <!-- Expiration Notice -->
    <p style="font-size: 14px; color: #6B7280; margin-top: 30px;">
      ⏰ Esta invitación expirará en <strong>7 días</strong>.
    </p>

    <!-- Security Notice -->
    <p style="font-size: 13px; color: #9CA3AF; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
      Si no esperabas este email, puedes ignorarlo de forma segura. No se realizará ninguna acción en tu cuenta.
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding: 20px 0; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 12px;">
    <p style="margin: 0;">
      © 2024 UseMyChat. Todos los derechos reservados.
    </p>
  </div>

</body>
</html>
```

---

## 🔧 Troubleshooting

### Los emails no llegan

**Posibles causas:**

1. **SMTP no configurado**
   - Verifica la configuración en Supabase Dashboard
   - Asegúrate de que las credenciales sean correctas

2. **Dominio no verificado**
   - Verifica tu dominio en el proveedor SMTP
   - Agrega los registros DNS requeridos (SPF, DKIM, DMARC)

3. **Emails en spam**
   - Verifica la carpeta de spam
   - Configura SPF, DKIM y DMARC correctamente
   - Usa un dominio verificado

4. **Rate limits**
   - Verifica los límites de tu plan SMTP
   - SendGrid free: 100 emails/día
   - Resend free: 3,000 emails/mes

### El enlace no funciona

**Posibles causas:**

1. **NEXT_PUBLIC_APP_URL incorrecta**
   - Verifica que apunte a tu dominio correcto
   - No debe tener `/` al final

2. **Token expirado**
   - Las invitaciones expiran en 7 días
   - Reenvía la invitación

3. **Invitación ya aceptada**
   - Verifica en la base de datos si `accepted_at` no es null

### Error al enviar desde la API

**Posibles causas:**

1. **Permisos insuficientes**
   - Verifica que el usuario tenga rol `owner` o `admin`

2. **RLS policies**
   - Verifica que las políticas RLS permitan insertar en `team_invitations`

3. **Supabase Auth Admin**
   - La función `inviteUserByEmail` requiere permisos admin
   - Verifica que estés usando el cliente correcto

---

## 📊 Monitoreo

### Ver logs de emails en Supabase

1. Ve a Supabase Dashboard → Logs
2. Filtra por "auth"
3. Busca eventos de "invite_user"

### Métricas recomendadas

- Tasa de entrega de emails
- Tasa de apertura (si usas tracking)
- Tasa de aceptación de invitaciones
- Tiempo promedio de aceptación

---

## 🚀 Mejoras Futuras

### Funcionalidades adicionales que puedes implementar:

1. **Recordatorios automáticos**
   - Enviar recordatorio 2 días antes de expirar
   - Usar Supabase Edge Functions con cron

2. **Tracking de emails**
   - Saber si el email fue abierto
   - Usar servicios como SendGrid con tracking

3. **Personalización por rol**
   - Diferentes plantillas según el rol
   - Información específica de permisos

4. **Notificaciones in-app**
   - Además del email, notificar en la app
   - Usar Supabase Realtime

5. **Invitaciones masivas**
   - Invitar múltiples usuarios a la vez
   - Importar desde CSV

6. **Estadísticas de invitaciones**
   - Dashboard con métricas
   - Tasa de conversión por rol

---

## 📚 Recursos Adicionales

### Documentación

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Resend Docs](https://resend.com/docs)

### Herramientas útiles

- [Email Template Builder](https://beefree.io/)
- [Email Testing](https://www.mail-tester.com/)
- [SPF/DKIM Checker](https://mxtoolbox.com/)

---

## ✅ Checklist de Configuración

- [ ] SMTP configurado en Supabase
- [ ] Dominio verificado (si aplica)
- [ ] Plantilla de email personalizada
- [ ] NEXT_PUBLIC_APP_URL configurada
- [ ] Email confirmations habilitadas
- [ ] Testing realizado con email real
- [ ] Verificado que los enlaces funcionan
- [ ] Probado el botón de reenvío
- [ ] Verificado que los emails no van a spam
- [ ] Documentación actualizada para el equipo

---

**¡Listo!** Ahora tu sistema de invitaciones de equipo está completamente funcional con envío de emails. 🎉
