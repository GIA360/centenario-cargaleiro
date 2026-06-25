"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { hero, logoSrc } from "@/content/site";
import { HeroAzulejos } from "./HeroAzulejos";

export function HeroLogo() {
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(42);
  const sx = useSpring(mx, { stiffness: 90, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 20, mass: 0.6 });

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
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-white px-5 pb-[18vh] pt-[14vh] sm:pt-[12vh]"
    >
      <HeroAzulejos mx={sx} my={sy} reduzir={!!reduzir} />

      <div className="relative z-10 flex w-full flex-col items-center text-center">
        {/* Logótipo estático (apenas um fade de entrada) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-[clamp(320px,90vw,980px)]"
        >
          <Image
            src={logoSrc}
            alt="Logótipo do Centenário Manuel Cargaleiro, 1927–2027"
            width={1483}
            height={736}
            priority
            className="h-auto w-full select-none"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: reduzir ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="eyebrow mt-6 text-cobalto/60"
        >
          {hero.sobretitulo}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduzir ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={hero.ctaPrimario.href}
            className="group relative overflow-hidden bg-cobalto px-7 py-3.5 font-sans text-sm font-semibold text-white"
          >
            <span className="relative z-10">{hero.ctaPrimario.label}</span>
            <span className="absolute inset-0 -translate-x-full bg-rosa transition-transform duration-300 group-hover:translate-x-0" />
          </Link>
          <Link
            href={hero.ctaSecundario.href}
            className="border border-cobalto/30 bg-white px-7 py-3.5 font-sans text-sm font-semibold text-cobalto transition-colors hover:border-cobalto hover:bg-cobalto hover:text-white"
          >
            {hero.ctaSecundario.label}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-sans text-[11px] uppercase tracking-eyebrow text-cinza">
          Descer
        </span>
        <motion.span
          aria-hidden
          animate={reduzir ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-5 w-px bg-cobalto/50"
        />
      </div>
    </section>
  );
}
