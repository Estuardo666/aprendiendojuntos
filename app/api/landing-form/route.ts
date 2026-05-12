import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildAdminHtml, buildConfirmacionHtml } from '@/lib/email/templates'

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? '').split(',').map((e) => e.trim()).filter(Boolean)
const FROM_EMAIL = 'Aprendiendo Juntos <hola@aprendiendojuntos.ec>'

export interface LandingFormPayload {
  nombre: string
  telefono: string
  email: string
  landingSlug: string
  landingTitulo?: string
  landingUrl?: string
}

// Stub CRM — reemplazar con implementación real (HubSpot, Brevo, etc.)
async function sendToCRM(_data: LandingFormPayload): Promise<void> {
  // TODO: implementar integración CRM
}

export async function POST(req: NextRequest) {
  let body: LandingFormPayload

  try {
    body = (await req.json()) as LandingFormPayload
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud inválido' }, { status: 400 })
  }

  const { nombre, telefono, email, landingSlug } = body

  if (!nombre?.trim() || !telefono?.trim() || !email?.trim() || !landingSlug?.trim()) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 422 })
  }

  if (ADMIN_EMAILS.length === 0) {
    return NextResponse.json({ error: 'Configuración de email incompleta' }, { status: 500 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    return NextResponse.json({ error: 'Configuración de email incompleta' }, { status: 500 })
  }
  const resend = new Resend(resendApiKey)

  try {
    const adminPromises = ADMIN_EMAILS.map((adminEmail) =>
      resend.emails.send({
        from: FROM_EMAIL,
        to: adminEmail,
        subject: `Nuevo lead: ${nombre} — ${body.landingTitulo ?? landingSlug}`,
        html: buildAdminHtml(body),
      })
    )

    await Promise.all([
      ...adminPromises,
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Recibimos tu solicitud — Centro Aprendiendo Juntos',
        html: buildConfirmacionHtml(body),
      }),
      sendToCRM(body),
    ])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[landing-form] Error al enviar email:', err)
    return NextResponse.json({ error: 'Error al enviar el formulario' }, { status: 500 })
  }
}
