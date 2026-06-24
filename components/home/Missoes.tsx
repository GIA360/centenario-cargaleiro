"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { listaEixos, type Eixo } from "@/content/eixos";
import { projetosPorEixo } from "@/content/projetos";

export function Missoes() {
  return (
    <section className="bg-white">
      <div className="shell pt-20 lg:pt-28">
        <p className="eyebrow text-cobalto/70">A estrutura do programa</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight text-cobalto sm:text-4xl lg:text-5xl">
          Duas missões
        </h2>
        <p className="mt-4 max-w-prosa text-pretty leading-relaxed text-cinza">
          Cada missão ocupa metade da secção, com uma fotografia de fundo cuja
          transparência reage ao scroll.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2">
        {listaEixos.map((e, i) => (
          <MissaoColuna key={e.id} eixo={e} primeira={i === 0} />
        ))}
      </div>
    </section>
  );
}

function MissaoColuna({ eixo, primeira }: { eixo: Eixo; primeira: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Foto: opaca nas pontas, muito transparente quando a caixa está visível.
  const opFoto = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.84, 1]);
  const escFoto = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const opCaixa = useTransform(scrollYProgress, [0.12, 0.4, 0.62, 0.92], [0, 1, 1, 0]);
  const yCaixa = useTransform(scrollYProgress, [0.12, 0.4], [60, 0]);

  const n = projetosPorEixo(eixo.id).length;

  return (
    <div
      ref={ref}
      className={`relative flex min-h-[82vh] items-center justify-center overflow-hidden p-8 lg:p-16 ${
        primeira ? "" : "md:border-l border-cobalto/10"
      }`}
    >
      {/* Fotografia de fundo, transparência guiada pelo scroll */}
      <motion.div
        style={reduzir ? { opacity: 0.84 } : { opacity: opFoto, scale: escFoto }}
        className="absolute inset-0"
      >
        <MissaoFundo eixo={eixo} />
        <div className="absolute inset-0 bg-white/5" />
      </motion.div>

      {/* Caixa de texto */}
      <motion.article
        style={
          reduzir
            ? { borderTopColor: eixo.cor }
            : { opacity: opCaixa, y: yCaixa, borderTopColor: eixo.cor }
        }
        className="relative z-10 w-full max-w-md border-t-4 bg-white/90 p-8 backdrop-blur-sm lg:p-10"
      >
        <p
          className="font-sans text-xs font-semibold uppercase tracking-eyebrow"
          style={{ color: eixo.corTexto }}
        >
          {eixo.etiqueta}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-cobalto lg:text-3xl">
          {eixo.nome}
        </h3>
        <p className="mt-4 text-pretty leading-relaxed text-tinta/80">
          {eixo.descricao}
        </p>
        <div className="mt-8 flex items-center justify-between border-t border-cobalto/10 pt-5">
          <span className="font-sans text-sm text-cinza">
            <span
              className="font-display text-2xl font-bold"
              style={{ color: eixo.corTexto }}
            >
              {n}
            </span>{" "}
            {n === 1 ? "iniciativa" : "iniciativas"}
          </span>
          <Link
            href="/#programa"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-cobalto transition-colors hover:text-rosaEscuro"
          >
            Ver projetos
            <span aria-hidden>→</span>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}

// Mostra a fotografia da missão; enquanto não existir, um bloco com a cor da
// missão e a indicação de onde entra a imagem.
function MissaoFundo({ eixo }: { eixo: Eixo }) {
  const [erro, setErro] = useState(false);
  const src = eixo.imagemFundo;

  if (erro || !src) {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center p-6"
        style={{
          backgroundImage: `linear-gradient(150deg, ${eixo.cor} 0%, ${eixo.corTexto} 55%, #16161a 135%)`,
        }}
      >
        <div className="flex max-w-xs flex-col items-center gap-2 border-2 border-dashed border-white/45 px-7 py-6 text-center">
          <span aria-hidden className="text-2xl text-white/80">⊞</span>
          <span className="font-sans text-sm font-semibold uppercase tracking-eyebrow text-white">
            Fotografia da missão
          </span>
          <span className="font-sans text-xs text-white/70">
            carregar no back office (CMS)
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
      onError={() => setErro(true)}
    />
  );
}
