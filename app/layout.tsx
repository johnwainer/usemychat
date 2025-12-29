import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UseMyChat - Plataforma Omnicanal con IA",
  description: "Gestiona todas tus conversaciones de WhatsApp, Instagram, Facebook y más en un solo lugar. CRM integrado, bots con IA y automatización inteligente.",
  keywords: "chat, omnicanal, whatsapp, instagram, facebook, crm, ia, automatización, bots",
  authors: [{ name: "UseMyChat" }],
  openGraph: {
    title: "UseMyChat - Plataforma Omnicanal con IA",
    description: "Gestiona todas tus conversaciones en un solo lugar con IA integrada",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
