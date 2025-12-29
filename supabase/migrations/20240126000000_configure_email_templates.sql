-- =====================================================
-- CONFIGURACIÓN DE EMAILS PARA INVITACIONES DE EQUIPO
-- =====================================================
-- Este archivo contiene las instrucciones para configurar
-- los emails de invitación en Supabase Dashboard

/*
INSTRUCCIONES PARA CONFIGURAR EMAILS EN SUPABASE:

1. Ve a Supabase Dashboard → Authentication → Email Templates

2. Selecciona "Invite user" template

3. Reemplaza el contenido con el siguiente HTML:

------- COPIAR DESDE AQUÍ -------

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

------- HASTA AQUÍ -------

4. Guarda los cambios

5. IMPORTANTE: Verifica que en Settings → Authentication → Email Auth
   - "Enable email confirmations" esté habilitado
   - "Secure email change" esté habilitado (opcional)

6. Para testing local, puedes usar:
   - Inbucket (incluido con Supabase local)
   - O configurar un SMTP provider en Settings → Authentication → SMTP Settings

SMTP PROVIDERS RECOMENDADOS:
- SendGrid (gratis hasta 100 emails/día)
- Resend (gratis hasta 3,000 emails/mes)
- AWS SES (muy económico)
- Mailgun (gratis hasta 5,000 emails/mes)

CONFIGURACIÓN SMTP (Ejemplo con SendGrid):
1. Ve a Settings → Authentication → SMTP Settings
2. Enable Custom SMTP
3. Configura:
   - Sender email: noreply@tudominio.com
   - Sender name: UseMyChat
   - Host: smtp.sendgrid.net
   - Port: 587
   - Username: apikey
   - Password: [tu API key de SendGrid]

TESTING:
1. Después de configurar, prueba enviando una invitación
2. Verifica que el email llegue correctamente
3. Verifica que los enlaces funcionen
4. Verifica que el diseño se vea bien en diferentes clientes de email

TROUBLESHOOTING:
- Si los emails no llegan, verifica la configuración SMTP
- Revisa los logs en Supabase Dashboard → Logs
- Verifica que el dominio esté verificado (si usas dominio personalizado)
- Asegúrate de que NEXT_PUBLIC_APP_URL esté configurado correctamente
*/

-- Esta migración no ejecuta SQL, solo proporciona instrucciones
-- para configurar los emails en Supabase Dashboard

-- Verificar que la función de invitación existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'invite_user_by_email'
  ) THEN
    RAISE NOTICE 'NOTA: Asegúrate de configurar los emails en Supabase Dashboard';
  END IF;
END $$;
