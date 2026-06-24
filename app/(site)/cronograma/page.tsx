import type { Metadata } from "next";
import { TimelineInterativa } from "@/components/cronograma/TimelineInterativa";
import { cronograma } from "@/content/cronograma";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Cronograma 2026 — 2028",
  description:
    "Linha do tempo interativa das Comemorações do Centenário de Manuel Cargaleiro, de 2026 a 2028.",
  alternates: { canonical: "/cronograma" },
};

export default function CronogramaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": cronograma
      .filter((e) => !e.porDefinir)
      .map((e) => ({
        "@type": "Event",
        name: e.titulo,
        startDate: e.dataOrdenacao,
        eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "Place", name: e.local },
        organizer: { "@type": "Organization", name: "Fundação Manuel Cargaleiro" },
        url: e.projetoSlug ? `${site.urlBase}/projetos/${e.projetoSlug}` : site.urlBase,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-cobalto/10 bg-nevoaAzul py-16 lg:py-24">
        <div className="shell">
          <p className="eyebrow text-cobalto/70">Comemorações do Centenário</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.05] text-cobalto sm:text-5xl lg:text-6xl">
            Cronograma 2026 — 2028
          </h1>
          <p className="mt-6 max-w-prosa text-pretty text-lg leading-relaxed text-tinta/80">
            Um programa plurianual, organizado em duas missões. Filtre por ano ou
            por missão e percorra a linha do tempo.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="shell">
          <TimelineInterativa />
        </div>
      </section>
    </>
  );
}
