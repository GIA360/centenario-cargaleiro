"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina de progresso de leitura, fixa no topo. Lê o scroll do documento
 *  e suaviza com mola. Puramente decorativa (aria-hidden). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: escala }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cobalto via-ceramica to-criacao"
    />
  );
}
