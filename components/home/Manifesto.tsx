"use client";

import { useRef } from "react";
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { manifestoFrase, obraSrc } from "@/content/site";

const PALAVRAS = manifestoFrase.split(" ");
// curva suave (easeOutCubic) para a entrada das palavras
const SUAVE = cubicBezier(0.33, 1, 0.68, 1);

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const bg = obraSrc ? { backgroundImage: `url("${obraSrc}")` } : undefined;

  return (
    <section ref={ref} className="relative h-[230vh] bg-cobaltoFundo">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Obra como fundo CSS — estática (a única animação é a das letras) */}
        <div
          style={bg}
          className="absolute inset-0 bg-cobaltoFundo bg-cover bg-center"
        />

        {/* véu para legibilidade — a obra fica visível mas mais sóbria */}
        <div className="absolute inset-0 bg-cobaltoFundo/48" />
        <div className="absolute inset-0 bg-gradient-to-t from-cobaltoFundo/75 via-cobaltoFundo/10 to-cobaltoFundo/40" />

        {/* Frase por cima — pt compensa o cabeçalho fixo para centrar o texto */}
        <div className="relative z-10 flex h-full items-center pt-16 sm:pt-20">
          <div className="shell">
            <p className="max-w-4xl font-display text-[clamp(1.8rem,4.2vw,3.5rem)] font-bold leading-[1.7] tracking-[-0.01em] [text-wrap:balance]">
              {PALAVRAS.map((palavra, i) => {
                // janelas longas e muito sobrepostas → onda lenta e contínua
                const inicio = 0.06 + (i / PALAVRAS.length) * 0.66;
                const fim = inicio + 0.28;
                return (
                  <Palavra
                    key={i}
                    texto={palavra}
                    inicio={inicio}
                    fim={fim}
                    progresso={scrollYProgress}
                    reduzir={!!reduzir}
                  />
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Palavra({
  texto,
  inicio,
  fim,
  progresso,
  reduzir,
}: {
  texto: string;
  inicio: number;
  fim: number;
  progresso: MotionValue<number>;
  reduzir: boolean;
}) {
  const meio = (inicio + fim) / 2;
  const opacity = useTransform(progresso, [inicio, fim], [0.3, 1], {
    ease: SUAVE,
  });
  // brilho que sobe ao revelar e volta a assentar → varre palavra a palavra
  const brilho = useTransform(progresso, [inicio, meio, fim], [0, 1, 0.1]);
  const blur = useTransform(brilho, [0, 1], [3, 26]);
  const alfa = useTransform(brilho, [0, 1], [0.1, 0.95]);
  const sombra = useMotionTemplate`0 0 ${blur}px rgba(198,221,255,${alfa})`;
  return (
    <motion.span
      style={reduzir ? { opacity: 1 } : { opacity, textShadow: sombra }}
      className="box-decoration-clone [-webkit-box-decoration-break:clone] bg-cobalto/70 px-2 py-1 text-white"
    >
      {texto}&nbsp;
    </motion.span>
  );
}
