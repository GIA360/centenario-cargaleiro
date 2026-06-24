"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}

/** Revelação discreta ao entrar no viewport. Uma só ideia de movimento,
 *  desligada quando o utilizador prefere movimento reduzido. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: RevealProps) {
  const reduzir = useReducedMotion();

  const variants: Variants = {
    oculto: { opacity: 0, y: reduzir ? 0 : y },
    visivel: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const Motion = motion[as];

  return (
    <Motion
      className={className}
      variants={variants}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Motion>
  );
}
