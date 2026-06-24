"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cronograma, type EventoCronograma } from "@/content/cronograma";
import { obterProjeto } from "@/content/projetos";
import { eixos, listaEixos, type EixoId } from "@/content/eixos";
import { useProjetoModal } from "@/components/projetos/ProjetoModalProvider";
import { ManagedImage } from "@/components/ManagedImage";
import { cn } from "@/lib/utils";

const ANOS = [2026, 2027, 2028] as const;

export function TimelineInterativa() {
  const reduzir = useReducedMotion();
  const [ano, setAno] = useState<number | null>(null);
  const [eixo, setEixo] = useState<EixoId | null>(null);
  const [progresso, setProgresso] = useState(0);
  const [proximoId, setProximoId] = useState<string | null>(null);

  const scrollerRef = useRef<HTMLDivElement>(null);

  // Próxima inauguração (calculada no cliente para evitar divergência SSR).
  useEffect(() => {
    const agora = Date.now();
    const futuros = cronograma
      .filter((e) => !e.porDefinir && new Date(e.dataOrdenacao).getTime() >= agora)
      .sort(
        (a, b) =>
          new Date(a.dataOrdenacao).getTime() - new Date(b.dataOrdenacao).getTime(),
      );
    setProximoId(futuros[0]?.id ?? null);
  }, []);

  const eventos = useMemo(
    () =>
      cronograma.filter((e) => {
        const okAno = ano === null || Number(e.dataOrdenacao.slice(0, 4)) === ano;
        const okEixo = eixo === null || e.eixo === eixo;
        return okAno && okEixo;
      }),
    [ano, eixo],
  );

  function aoRolar() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgresso(max > 0 ? el.scrollLeft / max : 0);
  }

  function deslizar(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  }

  // Reinicia a posição ao mudar de filtro.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    setProgresso(0);
  }, [ano, eixo]);

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Chip ativo={ano === null && eixo === null} onClick={() => { setAno(null); setEixo(null); }}>
            Tudo
          </Chip>
          {ANOS.map((a) => (
            <Chip key={a} ativo={ano === a} onClick={() => setAno(ano === a ? null : a)}>
              {a}
            </Chip>
          ))}
          <span aria-hidden className="mx-1 h-5 w-px bg-cobalto/15" />
          {listaEixos.map((e) => (
            <Chip
              key={e.id}
              ativo={eixo === e.id}
              cor={e.cor}
              onClick={() => setEixo(eixo === e.id ? null : e.id)}
            >
              {e.etiqueta}
            </Chip>
          ))}
        </div>

        <span className="font-sans text-sm text-cinza">
          {eventos.length} {eventos.length === 1 ? "marco" : "marcos"}
        </span>
      </div>

      {/* Linha do tempo horizontal, com setas a ladear os cards */}
      <div className="relative mt-10">
        <SetaBtn
          dir={-1}
          onClick={() => deslizar(-1)}
          className="absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 sm:flex lg:-left-5"
        />
        <SetaBtn
          dir={1}
          onClick={() => deslizar(1)}
          className="absolute -right-3 top-1/2 z-20 hidden -translate-y-1/2 sm:flex lg:-right-5"
        />
        <div
          ref={scrollerRef}
          onScroll={aoRolar}
          className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ol className="flex min-w-max gap-5 px-0.5">
            {eventos.map((ev, i) => (
              <EventoCard
                key={ev.id}
                ev={ev}
                indice={i}
                proximo={ev.id === proximoId}
                reduzir={!!reduzir}
              />
            ))}
          </ol>
        </div>
      </div>

      {/* Barra de progresso da linha */}
      <div className="mt-2 h-1 w-full overflow-hidden bg-cobalto/10">
        <div
          className="h-full bg-gradient-to-r from-cobalto to-ceramica transition-[width] duration-150"
          style={{ width: `${Math.max(6, progresso * 100)}%` }}
        />
      </div>
    </div>
  );
}

function EventoCard({
  ev,
  indice,
  proximo,
  reduzir,
}: {
  ev: EventoCronograma;
  indice: number;
  proximo: boolean;
  reduzir: boolean;
}) {
  const { abrir } = useProjetoModal();
  const projeto = ev.projetoSlug ? obterProjeto(ev.projetoSlug) : undefined;
  const cor = ev.eixo ? eixos[ev.eixo].cor : "#6B6B6B";
  const corTexto = ev.eixo ? eixos[ev.eixo].corTexto : "#6B6B6B";
  const imagemSrc = ev.imagem ?? projeto?.imagemDestaque ?? null;

  const corpo = (
    <>
      <span
        aria-hidden
        className="mb-4 block h-3 w-3 rounded-full"
        style={{ backgroundColor: cor }}
      />
      {proximo && (
        <span
          className="mb-2 inline-flex w-fit items-center gap-1.5 bg-rosa px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-white"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          Próxima
        </span>
      )}
      <span className="font-display text-sm font-semibold text-cinza">
        {String(indice + 1).padStart(2, "0")}
      </span>
      <span
        className="mt-1 font-sans text-xs font-semibold uppercase tracking-eyebrow"
        style={{ color: corTexto }}
      >
        {ev.dataLabel}
      </span>
      <span className="mt-2 font-display text-lg font-bold leading-snug text-tinta">
        {ev.titulo}
      </span>
      <span className="mt-2 text-sm text-cinza">{ev.local}</span>
      {projeto && (
        <span className="mt-auto pt-4 font-sans text-sm font-semibold text-ceramica">
          Ver projeto →
        </span>
      )}
      <div className={cn("overflow-hidden", projeto ? "mt-3" : "mt-auto pt-4")}>
        <ManagedImage
          src={imagemSrc}
          ratio="16 / 9"
          sizes="280px"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </>
  );

  const classes = cn(
    "group flex h-full w-[280px] shrink-0 snap-start flex-col border border-cobalto/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cobalto/30 hover:shadow-[0_18px_40px_-24px_rgba(35,42,94,0.45)]",
    proximo && "border-rosa/40",
  );

  return (
    <motion.li
      key={ev.id}
      initial={{ opacity: 0, y: reduzir ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: reduzir ? 0 : Math.min(indice * 0.03, 0.2) }}
      className="snap-start"
    >
      {projeto ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => abrir(projeto)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              abrir(projeto);
            }
          }}
          className={cn(classes, "cursor-pointer text-left")}
        >
          {corpo}
        </div>
      ) : (
        <div className={classes}>{corpo}</div>
      )}
    </motion.li>
  );
}

function Chip({
  children,
  ativo,
  cor,
  onClick,
}: {
  children: ReactNode;
  ativo: boolean;
  cor?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 border px-3.5 py-1.5 font-sans text-sm font-medium transition-colors",
        ativo
          ? "border-cobalto bg-cobalto text-white"
          : "border-cobalto/20 text-tinta hover:border-cobalto/50",
      )}
    >
      {cor && (
        <span
          aria-hidden
          className="h-2 w-2"
          style={{ backgroundColor: ativo ? "#fff" : cor }}
        />
      )}
      {children}
    </button>
  );
}

function SetaBtn({
  dir,
  onClick,
  className,
}: {
  dir: 1 | -1;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Avançar" : "Recuar"}
      className={cn(
        "flex h-10 w-10 items-center justify-center border border-cobalto/20 bg-white text-lg text-cobalto shadow-[0_10px_30px_-12px_rgba(35,42,94,0.55)] transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white",
        className,
      )}
    >
      {dir === 1 ? "›" : "‹"}
    </button>
  );
}
