import type { Metadata } from "next";
import { ConditionalNavbar } from "@/components/organisms/ConditionalNavbar/ConditionalNavbar";
import { NavbarWrapper } from "@/components/organisms/ConditionalNavbar/NavbarWrapper";
import { FloatingDolphin } from "@/components/organisms/FloatingDolphin/FloatingDolphin";
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

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ConditionalNavbar links={links} ctaLabel="Contáctanos" ctaHref={whatsappHref} ctaLabel2="Hablar con asesor" ctaHref2="/contacto" />
        <NavbarWrapper>
          {children}
        </NavbarWrapper>
        <FloatingDolphin />
      </body>
    </html>
  );
}
