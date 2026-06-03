import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConditionalNavbar } from "@/components/organisms/ConditionalNavbar/ConditionalNavbar";
import { NavbarWrapper } from "@/components/organisms/ConditionalNavbar/NavbarWrapper";
import { FloatingDolphin } from "@/components/organisms/FloatingDolphin/FloatingDolphin";
import { ConditionalFooter } from "@/components/organisms/ConditionalFooter/ConditionalFooter";
import { getOpciones } from "@/lib/api/opciones";
import { getPopup } from "@/lib/api/popup";
import { getServicios } from "@/lib/api/servicios";
import { getProgramas } from "@/lib/api/programas";
import { getGlobalNavbarLinks } from "@/lib/navigation";
import { buildOrganizationSchema } from "@/lib/seo/organization-schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aprendiendojuntos.ec"),
  title: {
    default: "Centro Neuropsicopedagógico Aprendiendo Juntos",
    template: "%s | Aprendiendo Juntos",
  },
  description:
    "Centro neuropsicopedagógico en Loja especializado en evaluación, neuropsicología, psicopedagogía, terapia de lenguaje y acompañamiento integral para niños, adolescentes y familias.",
  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: "Centro Aprendiendo Juntos",
    title: "Centro Neuropsicopedagógico Aprendiendo Juntos",
    description:
      "Centro neuropsicopedagógico en Loja especializado en evaluación, neuropsicología, psicopedagogía, terapia de lenguaje y acompañamiento integral para niños, adolescentes y familias.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Centro Aprendiendo Juntos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favico.png",
    apple: "/favico.png",
  },
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

async function getPopupSafe() {
  try {
    return await getPopup();
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [links, opciones, servicios, programas, popupData] = await Promise.all([
    getGlobalNavbarLinksSafe(),
    getOpcionesSafe(),
    getServiciosSafe(),
    getProgramasSafe(),
    getPopupSafe(),
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

  const organizationJsonLd = buildOrganizationSchema(opciones);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
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
        <ConditionalFooter
          footerProps={{
            logoUrl,
            logoAlt,
            description: opciones?.mensajeBienvenida ?? undefined,
            links,
            contactItems: [
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
            ],
            socialLinks: [
              {
                platform: 'instagram' as const,
                href: opciones?.redesInstagram ?? 'https://www.instagram.com/aprendiendojuntosec/',
              },
              {
                platform: 'facebook' as const,
                href: opciones?.redesFacebook ?? 'https://www.facebook.com/aprendiendojuntosec/',
              },
            ],
            serviciosDestacados: servicios.slice(0, 5).map(s => ({
              label: s.title,
              href: `/servicios/${s.slug}`,
            })),
            programasDestacados: programas.slice(0, 5).map(p => ({
              label: p.title,
              href: `/programas/${p.slug}`,
            })),
          }}
          popupData={popupData}
        />
        <FloatingDolphin />
      </body>
    </html>
  );
}
