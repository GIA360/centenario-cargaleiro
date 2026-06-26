"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { projetos } from "@/content/projetos";
import { eixos } from "@/content/eixos";
import { ManagedImage } from "@/components/ManagedImage";
import { useProjetoModal } from "@/components/projetos/ProjetoModalProvider";

export function ProjetosIndex() {
  const lista = projetos;
  const { abrir } = useProjetoModal();
  const reduzir = useReducedMotion();
  const [ativo, setAtivo] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  function aoMover(e: React.PointerEvent) {
    x.set(e.clientX);
    y.set(e.clientY);
  }

  // pré-visualização: projeto sob o cursor, a sua imagem flutuante (ou o
  // banner) e a cor da sua missão principal.
  const projetoAtivo = ativo !== null ? lista[ativo] : null;
  const eixoAtivo = projetoAtivo ? eixos[projetoAtivo.eixos[0]] : null;
  const previewSrc = projetoAtivo
    ? projetoAtivo.imagemFlutuante.src ?? projetoAtivo.imagemDestaque.src
    : null;

  return (
    <section
      id="programa"
      onPointerMove={aoMover}
      className="relative bg-white py-20 lg:py-28"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cobalto/90 to-transparent"
      />
      <div className="shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-cobalto/70">Programa de comemorações</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-cobalto sm:text-4xl lg:text-5xl">
            As iniciativas do Centenário
          </h2>
          <p className="mt-4 max-w-prosa text-pretty leading-relaxed text-cinza">
            Cinco iniciativas, duas missões. Passe o cursor para
            pré-visualizar e clique para obter mais informações.
          </p>
        </motion.div>

        <ul className="mt-12 border-t border-cobalto/15">
          {lista.map((projeto, i) => {
            const eixo = eixos[projeto.eixos[0]];
            const dim = ativo !== null && ativo !== i;
            const on = ativo === i;
            return (
              <li key={projeto.slug}>
                <button
                  type="button"
                  onClick={() => abrir(projeto)}
                  onPointerEnter={() => setAtivo(i)}
                  onPointerLeave={() => setAtivo(null)}
                  className="group flex w-full items-center gap-5 border-b border-cobalto/15 py-6 text-left transition-opacity duration-300 lg:gap-8 lg:py-8"
                  style={{ opacity: dim ? 0.4 : 1 }}
                >
                  <span className="w-10 shrink-0 font-display text-sm font-semibold text-cinza">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className="block font-display text-xl font-bold leading-[1.05] tracking-tight transition-[color,transform] duration-300 will-change-transform sm:text-3xl lg:text-4xl"
                      style={{
                        color: on ? eixo.cor : "#16161A",
                        transform: on && !reduzir ? "translateX(14px)" : "none",
                      }}
                    >
                      {projeto.titulo}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs uppercase tracking-eyebrow text-cinza">
                      {projeto.eixos.map((id) => (
                        <span key={id} className="inline-flex items-center gap-1.5">
                          <span
                            aria-hidden
                            className="h-2 w-2"
                            style={{ backgroundColor: eixos[id].cor }}
                          />
                          {eixos[id].etiqueta}
                        </span>
                      ))}
                      <span aria-hidden>·</span>
                      <span>{projeto.data}</span>
                    </span>
                  </span>

                  {/* miniatura (telemóvel / sem hover) */}
                  <span className="block w-24 shrink-0 sm:w-32 lg:hidden">
                    <ManagedImage src={projeto.imagemDestaque.src} ratio="4 / 3" sizes="128px" />
                  </span>

                  <span
                    aria-hidden
                    className="hidden shrink-0 font-display text-2xl text-cobalto transition-transform duration-300 group-hover:translate-x-1 lg:block"
                  >
                    →
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* pré-visualização que segue o cursor (apenas desktop com hover) */}
      {!reduzir && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: ativo !== null ? 1 : 0,
              scale: ativo !== null ? 1 : 0.85,
            }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="w-72 overflow-hidden border-4 shadow-[0_24px_60px_-20px_rgba(13,16,40,0.5)]"
              style={{ borderColor: eixoAtivo?.cor }}
            >
              {previewSrc ? (
                <div key={previewSrc} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewSrc} alt="" className="block h-auto w-full" />
                  <div
                    className="absolute inset-x-0 bottom-0 p-4"
                    style={{
                      background: `linear-gradient(to top, ${eixoAtivo?.cor}E6 0%, transparent 85%)`,
                    }}
                  >
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-eyebrow text-white/80">
                      {eixoAtivo?.etiqueta}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold leading-tight text-white">
                      {projetoAtivo?.titulo}
                    </p>
                  </div>
                </div>
              ) : ativo !== null ? (
                <div className="aspect-[4/3] w-full">
                  <ManagedImage src={null} fill />
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
