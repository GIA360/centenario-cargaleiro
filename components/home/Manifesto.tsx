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
    <section ref={ref} className="relative h-[150vh] bg-cobaltoFundo">
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
            <p className="max-w-4xl font-display text-[clamp(1.9rem,4.4vw,3.7rem)] font-bold leading-[1.2] tracking-[-0.015em] [text-shadow:0_2px_20px_rgba(8,10,30,0.6)] [text-wrap:balance]">
              {PALAVRAS.map((palavra, i) => {
                // janelas longas e sobrepostas → onda contínua, não saltos
                const inicio = 0.04 + (i / PALAVRAS.length) * 0.6;
                const fim = inicio + 0.22;
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
  const opacity = useTransform(progresso, [inicio, fim], [0.2, 1], {
    ease: SUAVE,
  });
  const y = useTransform(progresso, [inicio, fim], [10, 0], { ease: SUAVE });
  const blurV = useTransform(progresso, [inicio, fim], [3, 0], { ease: SUAVE });
  const filter = useMotionTemplate`blur(${blurV}px)`;
  return (
    <motion.span
      style={reduzir ? { opacity: 1 } : { opacity, y, filter }}
      className="inline-block text-white"
    >
      {texto}&nbsp;
    </motion.span>
  );
}
