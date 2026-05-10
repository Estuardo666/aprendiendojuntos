import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? ''
const FROM_EMAIL = 'formulario@aprendiendojuntos.ec'

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

function buildAdminHtml(d: LandingFormPayload): string {
  return `
    <h2>Nuevo lead desde la landing: ${d.landingTitulo ?? d.landingSlug}</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td><strong>Nombre</strong></td><td>${d.nombre}</td></tr>
      <tr><td><strong>Teléfono</strong></td><td>${d.telefono}</td></tr>
      <tr><td><strong>Email</strong></td><td>${d.email}</td></tr>
      <tr><td><strong>Landing</strong></td><td>${d.landingTitulo ?? d.landingSlug}</td></tr>
      <tr><td><strong>URL origen</strong></td><td>${d.landingUrl ?? '-'}</td></tr>
    </table>
  `
}

function buildConfirmacionHtml(d: LandingFormPayload): string {
  return `
    <p>Hola <strong>${d.nombre}</strong>,</p>
    <p>Hemos recibido tu solicitud. Nos pondremos en contacto contigo a la brevedad.</p>
    <p style="margin-top:24px;">— Centro Aprendiendo Juntos</p>
  `
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

  if (!ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Configuración de email incompleta' }, { status: 500 })
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `Nuevo lead: ${nombre} — ${body.landingTitulo ?? landingSlug}`,
        html: buildAdminHtml(body),
      }),
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
