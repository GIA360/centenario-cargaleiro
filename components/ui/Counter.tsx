"use client";

import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  duracao?: number;
}

/** Contador que anima de 0 ao valor quando entra no viewport.
 *  Com movimento reduzido, mostra o valor final de imediato. */
export function Counter({
  valor,
  prefixo = "",
  sufixo = "",
  duracao = 1.4,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const emVista = useInView(ref, { once: true, margin: "-60px" });
  const reduzir = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!emVista) return;
    if (reduzir) {
      setN(valor);
      return;
    }
    const controls = animate(0, valor, {
      duration: duracao,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [emVista, valor, duracao, reduzir]);

  return (
    <span ref={ref}>
      {prefixo}
      {n.toLocaleString("pt-PT")}
      {sufixo}
    </span>
  );
}
