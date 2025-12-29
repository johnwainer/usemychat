import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, role, token, inviterName } = await request.json();

    console.log('📧 Starting invitation process:', { email, role, token, inviterName });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('❌ No user authenticated');
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    console.log('✅ User authenticated:', user.id);

    // Get app URL from environment
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const invitationLink = `${appUrl}/team/join/${token}`;

    console.log('🔗 Invitation link:', invitationLink);

    // Role names in Spanish for email
    const roleNames: Record<string, string> = {
      owner: 'Propietario',
      admin: 'Administrador',
      supervisor: 'Supervisor',
      agent: 'Agente',
      viewer: 'Observador'
    };

    const roleName = roleNames[role] || role;

    console.log('📝 Preparing email data:', {
      invitation_type: 'team_member',
      role: roleName,
      invited_by: user.id,
      inviter_name: inviterName || 'Un miembro del equipo',
      invitation_link: invitationLink
    });

    // Send email using Supabase Auth
    const { data: inviteData, error: emailError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: {
        invitation_type: 'team_member',
        role: roleName,
        invited_by: user.id,
        inviter_name: inviterName || 'Un miembro del equipo',
        invitation_link: invitationLink
      },
      redirectTo: invitationLink
    });

    if (emailError) {
      console.error('❌ Email error details:', {
        message: emailError.message,
        status: emailError.status,
        code: emailError.code,
        details: emailError
      });

      return NextResponse.json({
        success: true,
        emailSent: false,
        message: 'Invitación creada. El email no pudo ser enviado, pero puedes copiar el enlace para compartirlo manualmente.',
        link: invitationLink,
        errorDetails: {
          message: emailError.message,
          code: emailError.code
        }
      });
    }

    console.log('✅ Email sent successfully:', inviteData);

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: 'Invitación enviada por email exitosamente',
      link: invitationLink
    });

  } catch (error) {
    console.error('❌ Error in send-invitation:', error);
    return NextResponse.json(
      {
        error: 'Error al enviar invitación',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
