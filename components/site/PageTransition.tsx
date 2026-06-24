"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Transição discreta entre páginas: um fade curto, sem deslocar o conteúdo
 *  de forma que prejudique a leitura. Desligado com movimento reduzido. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduzir = useReducedMotion();

  return (
    <motion.main
      key={pathname}
      id="conteudo"
      initial={{ opacity: reduzir ? 1 : 0, y: reduzir ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
