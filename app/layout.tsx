import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConditionalNavbar } from "@/components/organisms/ConditionalNavbar/ConditionalNavbar";
import { NavbarWrapper } from "@/components/organisms/ConditionalNavbar/NavbarWrapper";
import { FloatingDolphin } from "@/components/organisms/FloatingDolphin/FloatingDolphin";
import { Footer } from "@/components/organisms/Footer/Footer";
import { getOpciones } from "@/lib/api/opciones";
import { getServicios } from "@/lib/api/servicios";
import { getProgramas } from "@/lib/api/programas";
import { getGlobalNavbarLinks } from "@/lib/navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Centro Aprendiendo Juntos",
  description: "Centro de desarrollo infantil Aprendiendo Juntos",
  other: {
    preconnect: "https://fonts.gstatic.com",
  },
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

async function getServiciosSafe() {
  try {
    return await getServicios();
  } catch {
    return [];
  }
}

async function getProgramasSafe() {
  try {
    return await getProgramas();
  } catch {
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [links, opciones, servicios, programas] = await Promise.all([
    getGlobalNavbarLinksSafe(),
    getOpcionesSafe(),
    getServiciosSafe(),
    getProgramasSafe(),
  ]);
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
      <body className={`${inter.variable} antialiased`}>
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
            {
              type: 'telefono' as const,
              label: 'Teléfono',
              value: opciones?.contactoTelefono ?? '(07) 261-3255',
              href: `tel:${opciones?.contactoTelefono ?? '072613255'}`,
            },
            {
              type: 'direccion' as const,
              label: 'Dirección',
              value: opciones?.contactoDireccion ?? 'Bilbao entre Valencia y Lérida, Loja',
              href: opciones?.contactoMapsUrl ?? undefined,
            },
            {
              type: 'whatsapp' as const,
              label: 'WhatsApp',
              value: whatsappNumber ? `+${whatsappNumber}` : '098 578 8925',
              href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : 'https://wa.me/593985788925',
            },
          ]}
          socialLinks={[
            {
              platform: 'instagram' as const,
              href: opciones?.redesInstagram ?? 'https://www.instagram.com/aprendiendojuntosec/',
            },
            {
              platform: 'facebook' as const,
              href: opciones?.redesFacebook ?? 'https://www.facebook.com/aprendiendojuntosec/',
            },
          ]}
          serviciosDestacados={servicios.slice(0, 5).map(s => ({
            label: s.title,
            href: `/servicios/${s.slug}`,
          }))}
          programasDestacados={programas.slice(0, 5).map(p => ({
            label: p.title,
            href: `/programas/${p.slug}`,
          }))}
        />
        <FloatingDolphin />
      </body>
    </html>
  );
}
