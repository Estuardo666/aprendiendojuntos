import type { LandingFormPayload } from '@/app/api/landing-form/route'

/* ─── Tokens de diseño ─────────────────────────────────────────────── */
const COLORS = {
  naranja: '#FAB600',
  azul: '#0056A4',
  celeste: '#0080C9',
  crema: '#EFEDE4',
  blanco: '#FFFFFF',
  texto: '#253a44',
  textoClaro: '#4a5c65',
}

const FONTS = {
  heading: "'Montserrat', 'Segoe UI', Helvetica, Arial, sans-serif",
  body: "'Inter', 'Segoe UI', Helvetica, Arial, sans-serif",
}

/* ─── Helper: layout base inline ─────────────────────────────────────── */
function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Centro Aprendiendo Juntos</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.crema};font-family:${FONTS.body};color:${COLORS.texto};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.crema};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${COLORS.blanco};border-radius:24px;overflow:hidden;border:1px solid #e0ddd3;">
          <!-- Header -->
          <tr>
            <td style="background:${COLORS.blanco};padding:36px 32px;text-align:center;border-bottom:1px solid #e0ddd3;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                      <td style="padding-bottom:4px;">
                    <img src="https://adminaj.totemmassmedia.com/wp-content/uploads/2026/05/logoamarillo.png" alt="Aprendiendo Juntos" width="180" height="55" border="0" style="display:block;margin:0 auto;border:0;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;text-align:center;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:${COLORS.crema};padding:20px 32px;text-align:center;border-top:1px solid #e0ddd3;">
              <p style="margin:0 0 8px;font-family:${FONTS.body};font-size:12px;color:${COLORS.textoClaro};">
                Centro Aprendiendo Juntos · Loja, Ecuador
              </p>
              <p style="margin:0;font-family:${FONTS.body};font-size:11px;color:#8a9ba3;">
                Este es un correo automático, por favor no respondas a esta dirección.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/* ─── Email al equipo (admin) ────────────────────────────────────────── */
export function buildAdminHtml(d: LandingFormPayload): string {
  const content = `
    <h1 style="margin:0 0 16px;font-family:${FONTS.heading};font-size:20px;font-weight:700;color:${COLORS.azul};">
      Nuevo lead desde landing page
    </h1>
    <p style="margin:0 0 20px;font-family:${FONTS.body};font-size:14px;color:${COLORS.textoClaro};line-height:1.5;">
      Se recibió un nuevo envío desde la landing <strong style="color:${COLORS.celeste};">${d.landingTitulo ?? d.landingSlug}</strong>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;overflow:hidden;border:1px solid #e0ddd3;background:${COLORS.crema};">
      <tr>
        <td style="padding:20px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #dcd8cc;">
                <span style="font-family:${FONTS.body};font-size:12px;font-weight:600;color:${COLORS.textoClaro};text-transform:uppercase;letter-spacing:0.04em;">Nombre</span>
                <p style="margin:4px 0 0;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${COLORS.azul};">${escapeHtml(d.nombre)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #dcd8cc;">
                <span style="font-family:${FONTS.body};font-size:12px;font-weight:600;color:${COLORS.textoClaro};text-transform:uppercase;letter-spacing:0.04em;">Teléfono</span>
                <p style="margin:4px 0 0;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${COLORS.azul};">${escapeHtml(d.telefono)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #dcd8cc;">
                <span style="font-family:${FONTS.body};font-size:12px;font-weight:600;color:${COLORS.textoClaro};text-transform:uppercase;letter-spacing:0.04em;">Email</span>
                <p style="margin:4px 0 0;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${COLORS.azul};">${escapeHtml(d.email)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;border-bottom:1px solid #dcd8cc;">
                <span style="font-family:${FONTS.body};font-size:12px;font-weight:600;color:${COLORS.textoClaro};text-transform:uppercase;letter-spacing:0.04em;">Landing</span>
                <p style="margin:4px 0 0;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${COLORS.azul};">${escapeHtml(d.landingTitulo ?? d.landingSlug)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0 0;">
                <span style="font-family:${FONTS.body};font-size:12px;font-weight:600;color:${COLORS.textoClaro};text-transform:uppercase;letter-spacing:0.04em;">URL origen</span>
                <p style="margin:4px 0 0;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${COLORS.azul};">${d.landingUrl ? `<a href="${escapeHtml(d.landingUrl)}" style="color:${COLORS.celeste};text-decoration:none;">${escapeHtml(d.landingUrl)}</a>` : '—'}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:20px 0 0;font-family:${FONTS.body};font-size:12px;color:#8a9ba3;">
      Recibido el ${new Date().toLocaleString('es-EC', { dateStyle: 'medium', timeStyle: 'short' })}
    </p>
  `
  return emailWrapper(content.trim())
}

/* ─── Email de confirmación al usuario ───────────────────────────────── */
export function buildConfirmacionHtml(d: LandingFormPayload): string {
  const content = `
    <h1 style="margin:0 0 16px;font-family:${FONTS.heading};font-size:20px;font-weight:700;color:${COLORS.azul};">
      ¡Hola, ${escapeHtml(d.nombre)}!
    </h1>
    <p style="margin:0 0 20px;font-family:${FONTS.body};font-size:15px;color:${COLORS.texto};line-height:1.6;">
      Hemos recibido tu solicitud desde <strong style="color:${COLORS.celeste};">${escapeHtml(d.landingTitulo ?? d.landingSlug)}</strong>. En breve un miembro de nuestro equipo se pondrá en contacto contigo para brindarte toda la información que necesitas.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.crema};border-radius:24px;border:1px solid #e0ddd3;">
      <tr>
        <td style="padding:20px 24px;text-align:center;">
          <p style="margin:0 0 12px;font-family:${FONTS.heading};font-size:14px;font-weight:700;color:${COLORS.azul};">¿Tienes dudas mientras tanto?</p>
          <a href="https://wa.me/593979918871" style="display:inline-block;padding:12px 24px;background:linear-gradient(135deg,${COLORS.naranja} 0%,#ffc42d 100%);color:${COLORS.azul};font-family:${FONTS.body};font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;">
            Escríbenos por WhatsApp
          </a>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0;font-family:${FONTS.body};font-size:14px;color:${COLORS.texto};line-height:1.6;">
      Gracias por confiar en <strong style="color:${COLORS.azul};">Aprendiendo Juntos</strong>.
    </p>
  `
  return emailWrapper(content.trim())
}

/* ─── Escapar HTML para evitar inyección ─────────────────────────────── */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
