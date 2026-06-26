"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { manifestoFrase, obraDestaque } from "@/content/site";
import { CreditoImagem } from "@/components/ui/CreditoImagem";

const PALAVRAS = manifestoFrase.split(" ");

/**
 * Frase de destaque numa faixa cobalto compacta, com a imagem de fundo
 * (carregada no CMS) velada pela cor da marca. As palavras acendem em
 * sequência ao entrar em vista; uma luz suave segue o rato e cada palavra
 * brilha ao passar por cima.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduzir = useReducedMotion();
  const naView = useInView(ref, { once: true, margin: "-15%" });

  // luz subtil que segue o cursor
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 120, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 120, damping: 28, mass: 0.5 });
  const luz = useMotionTemplate`radial-gradient(34vw 34vw at ${sx}% ${sy}%, rgba(150,172,255,0.11), transparent 60%)`;

  function aoMover(e: React.PointerEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <section
      ref={ref}
      onPointerMove={reduzir ? undefined : aoMover}
      className="relative flex min-h-[55vh] items-center overflow-hidden bg-cobaltoFundo py-16 sm:py-[74px]"
    >
      {obraDestaque.src && (
        <Image
          src={obraDestaque.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-cobaltoFundo/85" />

      {!reduzir && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: luz }}
        />
      )}

      <div className="shell relative">
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={naView ? { scaleX: 1 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 block h-1 w-16 origin-left bg-rosa"
        />
        <p className="max-w-5xl font-display text-[clamp(1.7rem,3.6vw,3rem)] font-bold leading-[1.3] tracking-[-0.015em] [text-wrap:balance]">
          {PALAVRAS.map((palavra, i) => (
            <Palavra
              key={i}
              texto={palavra}
              indice={i}
              naView={naView}
              reduzir={!!reduzir}
            />
          ))}
        </p>
      </div>

      <CreditoImagem texto={obraDestaque.credito} />
    </section>
  );
}

function Palavra({
  texto,
  indice,
  naView,
  reduzir,
}: {
  texto: string;
  indice: number;
  naView: boolean;
  reduzir: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: reduzir ? 1 : 0.14 }}
      animate={naView ? { opacity: 1 } : undefined}
      transition={{
        duration: 0.5,
        delay: reduzir ? 0 : 0.25 + indice * 0.07,
        ease: "easeOut",
      }}
      className="inline-block cursor-default text-white transition-[color,text-shadow] duration-150 ease-out hover:text-[#F4B8D0] hover:[text-shadow:0_0_16px_rgba(244,184,208,0.38)]"
    >
      {texto}&nbsp;
    </motion.span>
  );
}
