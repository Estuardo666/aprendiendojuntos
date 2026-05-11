import type { Metadata } from "next";
import { ConditionalNavbar } from "@/components/organisms/ConditionalNavbar/ConditionalNavbar";
import { NavbarWrapper } from "@/components/organisms/ConditionalNavbar/NavbarWrapper";
import { FloatingDolphin } from "@/components/organisms/FloatingDolphin/FloatingDolphin";
import { Footer } from "@/components/organisms/Footer/Footer";
import { getOpciones } from "@/lib/api/opciones";
import { getGlobalNavbarLinks } from "@/lib/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centro Aprendiendo Juntos",
  description: "Centro de desarrollo infantil Aprendiendo Juntos",
};

function sanitizeWhatsappPhone(value: string | null | undefined) {
  return (value ?? "").replace(/\D/g, "");
}

async function getOpcionesSafe() {
  try {
    return await getOpciones();
  } catch {
    return null;
  }
}

async function getGlobalNavbarLinksSafe() {
  try {
    return await getGlobalNavbarLinks();
  } catch {
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [links, opciones] = await Promise.all([getGlobalNavbarLinksSafe(), getOpcionesSafe()]);
  const whatsappNumber = sanitizeWhatsappPhone(opciones?.ctaWhatsappNumero);
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "/contacto";

  const enc = opciones?.encabezado;
  const logoNode = enc?.logoHeader?.node;
  const logoUrl = logoNode?.sourceUrl ?? null;
  const logoAlt = logoNode?.altText ?? "Aprendiendo Juntos";
  const logoWidth = logoNode?.mediaDetails?.width ?? 262;
  const logoHeight = logoNode?.mediaDetails?.height ?? 83;

  const ctaLabel = enc?.boton1Texto ?? "Contáctanos";
  const ctaHref = enc?.boton1Url ?? whatsappHref;
  const ctaLabel2 = enc?.boton2Texto ?? "Hablar con asesor";
  const ctaHref2 = enc?.boton2Url ?? "/contacto";

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ConditionalNavbar
          links={links}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          logoWidth={logoWidth}
          logoHeight={logoHeight}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          ctaLabel2={ctaLabel2}
          ctaHref2={ctaHref2}
        />
        <NavbarWrapper>
          {children}
        </NavbarWrapper>
        <Footer
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          description={opciones?.mensajeBienvenida ?? undefined}
          links={links}
          contactItems={[
            ...(opciones?.contactoDireccion
              ? [{ type: 'direccion' as const, label: 'Dirección', value: opciones.contactoDireccion, href: opciones?.contactoMapsUrl ?? undefined }]
              : []),
            ...(opciones?.contactoTelefono
              ? [{ type: 'telefono' as const, label: 'Teléfono', value: opciones.contactoTelefono, href: `tel:${opciones.contactoTelefono}` }]
              : []),
            ...(whatsappNumber
              ? [{ type: 'whatsapp' as const, label: 'WhatsApp', value: `+${whatsappNumber}`, href: `https://wa.me/${whatsappNumber}` }]
              : []),
          ]}
          socialLinks={[
            ...(opciones?.redesInstagram ? [{ platform: 'instagram' as const, href: opciones.redesInstagram }] : []),
            ...(opciones?.redesFacebook ? [{ platform: 'facebook' as const, href: opciones.redesFacebook }] : []),
          ]}
        />
        <FloatingDolphin />
      </body>
    </html>
  );
}
