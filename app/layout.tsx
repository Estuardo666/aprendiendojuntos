import type { Metadata } from "next";
import { Navbar } from "@/components/organisms/Navbar";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [links, opciones] = await Promise.all([getGlobalNavbarLinks(), getOpciones()]);
  const whatsappNumber = sanitizeWhatsappPhone(opciones.ctaWhatsappNumero);
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "/contacto";

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <Navbar links={links} ctaLabel="Contáctanos" ctaHref={whatsappHref} ctaLabel2="Hablar con asesor" ctaHref2="/contacto" />
        <div className="pt-14 md:pt-16">
          {children}
        </div>
        <FloatingDolphin />
      </body>
    </html>
  );
}
