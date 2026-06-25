import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { site } from "@/content/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.urlBase),
  title: {
    default: "Centenário Manuel Cargaleiro · 1927–2027",
    template: "%s · Centenário Manuel Cargaleiro",
  },
  description: site.descricao,
  keywords: [
    "Manuel Cargaleiro",
    "Centenário",
    "Fundação Manuel Cargaleiro",
    "arte portuguesa",
    "cerâmica",
    "azulejo",
    "Museu Cargaleiro",
  ],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Centenário Manuel Cargaleiro",
    title: "Centenário Manuel Cargaleiro · 1927–2027",
    description: site.descricao,
    url: site.urlBase,
  },
  twitter: {
    card: "summary_large_image",
    title: "Centenário Manuel Cargaleiro · 1927–2027",
    description: site.descricao,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white font-sans text-tinta antialiased">{children}</body>
    </html>
  );
}
