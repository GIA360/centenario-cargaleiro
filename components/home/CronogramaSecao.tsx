import Link from "next/link";
import { TimelineInterativa } from "@/components/cronograma/TimelineInterativa";
import { Reveal } from "@/components/ui/Reveal";

export function CronogramaSecao() {
  return (
    <section className="bg-nevoaAzul py-20 lg:py-28">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-cobalto/70">2026 — 2028</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-cobalto sm:text-4xl lg:text-5xl">
              Cronograma das comemorações
            </h2>
          </div>
          <Link
            href="/cronograma"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-cobalto transition-colors hover:text-ceramica"
          >
            Página completa
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <TimelineInterativa />
        </Reveal>
      </div>
    </section>
  );
}
