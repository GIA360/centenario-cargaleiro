import type { ReactNode } from "react";
import "../globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageTransition } from "@/components/site/PageTransition";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { ProjetoModalProvider } from "@/components/projetos/ProjetoModalProvider";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-cobalto focus:px-4 focus:py-2 focus:text-white"
      >
        Saltar para o conteúdo
      </a>
      <ScrollProgress />
      <ProjetoModalProvider>
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </ProjetoModalProvider>
    </>
  );
}
