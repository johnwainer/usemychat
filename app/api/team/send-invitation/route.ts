import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, role, token, inviterName } = await request.json();

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Get app URL from environment
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const invitationLink = `${appUrl}/team/join/${token}`;

    // Role descriptions in Spanish
    const roleDescriptions: Record<string, string> = {
      owner: 'Propietario - Control total del workspace',
      admin: 'Administrador - Gestión completa del equipo',
      supervisor: 'Supervisor - Supervisión de agentes',
      agent: 'Agente - Gestión de contactos asignados',
      viewer: 'Visualizador - Solo lectura'
    };

    const roleDescription = roleDescriptions[role] || role;

    // Send email using Supabase Auth
    const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: {
        invitation_type: 'team_member',
        role: role,
        invited_by: user.id,
        inviter_name: inviterName,
        invitation_link: invitationLink
      },
      redirectTo: invitationLink
    });

    if (emailError) {
      // If Supabase email fails, we can still return success
      // since the invitation is created and link can be copied
      console.error('Error sending email:', emailError);
      
      return NextResponse.json({ 
        success: true,
        emailSent: false,
        message: 'Invitación creada. Copia el enlace para compartirlo manualmente.',
        link: invitationLink
      });
    }

    return NextResponse.json({ 
      success: true,
      emailSent: true,
      message: 'Invitación enviada por email exitosamente',
      link: invitationLink
    });

  } catch (error) {
    console.error('Error in send-invitation:', error);
    return NextResponse.json(
      { error: 'Error al enviar invitación' },
      { status: 500 }
    );
  }
}
