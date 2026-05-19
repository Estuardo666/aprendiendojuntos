import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const ADMIN_EMAILS = (process.env.ADMIN_EMAIL ?? '').split(',').map((e) => e.trim()).filter(Boolean)
const FROM_EMAIL = 'Aprendiendo Juntos <hola@aprendiendojuntos.ec>'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface RecursoDescargaPayload {
  email: string
  recursoTitulo: string
  recursoUrl: string
}

function buildRecursoNotificacionHtml(payload: RecursoDescargaPayload): string {
  const { email, recursoTitulo, recursoUrl } = payload
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><title>Descarga de recurso</title></head>
<body style="margin:0;padding:0;background:#EFEDE4;font-family:'Inter','Segoe UI',Helvetica,Arial,sans-serif;color:#253a44;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EFEDE4;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:24px;overflow:hidden;border:1px solid #e0ddd3;">
          <tr>
            <td style="background:#FFFFFF;padding:36px 32px;text-align:center;border-bottom:1px solid #e0ddd3;">
              <img src="https://adminaj.totemmassmedia.com/wp-content/uploads/2026/05/logoamarillo.png" alt="Aprendiendo Juntos" width="180" height="55" border="0" style="display:block;margin:0 auto;" />
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px;">
              <h2 style="margin:0 0 16px;font-family:'Montserrat','Segoe UI',Helvetica,Arial,sans-serif;font-size:20px;color:#0056A4;">Nuevo descargante de recurso</h2>
              <p style="margin:0 0 8px;">Un usuario ha descargado un recurso desde el sitio web.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e0ddd3;font-weight:600;width:160px;">Email del usuario</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e0ddd3;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #e0ddd3;font-weight:600;">Recurso</td>
                  <td style="padding:10px 0;border-bottom:1px solid #e0ddd3;">${recursoTitulo}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-weight:600;">Archivo</td>
                  <td style="padding:10px 0;"><a href="${recursoUrl}" style="color:#0080C9;">${recursoUrl}</a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#EFEDE4;text-align:center;font-size:12px;color:#4a5c65;border-top:1px solid #e0ddd3;">
              Centro Neuropsicopedagógico Aprendiendo Juntos &mdash; Loja, Ecuador
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export async function POST(req: NextRequest) {
  let body: RecursoDescargaPayload

  try {
    body = (await req.json()) as RecursoDescargaPayload
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la solicitud inválido' }, { status: 400 })
  }

  const { email, recursoTitulo, recursoUrl } = body

  if (!email?.trim() || !recursoTitulo?.trim() || !recursoUrl?.trim()) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 422 })
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Formato de email inválido' }, { status: 422 })
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
        subject: `Recurso descargado: ${recursoTitulo} — ${email}`,
        html: buildRecursoNotificacionHtml(body),
      }),
    )

    await Promise.all(adminPromises)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[recurso-descarga] Error al enviar email:', err)
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}
