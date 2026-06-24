"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";

interface LightboxProps {
  srcs: string[];
  indice: number | null;
  onFechar: () => void;
  onMudar: (i: number) => void;
}

export function Lightbox({ srcs, indice, onFechar, onMudar }: LightboxProps) {
  const aberto = indice !== null;

  const anterior = useCallback(() => {
    if (indice === null) return;
    onMudar((indice - 1 + srcs.length) % srcs.length);
  }, [indice, srcs.length, onMudar]);

  const seguinte = useCallback(() => {
    if (indice === null) return;
    onMudar((indice + 1) % srcs.length);
  }, [indice, srcs.length, onMudar]);

  useEffect(() => {
    if (!aberto) return;
    function tecla(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") seguinte();
    }
    document.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
    };
  }, [aberto, anterior, seguinte, onFechar]);

  return (
    <AnimatePresence>
      {aberto && indice !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cobalto/95 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Imagem"
          onClick={onFechar}
        >
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center text-2xl text-white/90 transition-colors hover:text-white"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            aria-label="Imagem anterior"
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-3xl text-white/80 transition-colors hover:text-white sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              seguinte();
            }}
            aria-label="Imagem seguinte"
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-3xl text-white/80 transition-colors hover:text-white sm:right-6"
          >
            ›
          </button>

          <motion.figure
            key={indice}
            className="flex max-h-full flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={srcs[indice]}
              alt=""
              className="max-h-[86vh] max-w-[92vw] object-contain"
            />
            <figcaption className="text-center text-sm text-white/50">
              {indice + 1} / {srcs.length}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
