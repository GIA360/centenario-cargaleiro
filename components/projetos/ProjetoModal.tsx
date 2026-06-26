"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Projeto } from "@/content/projetos";
import { eixos } from "@/content/eixos";
import { ManagedImage } from "@/components/ManagedImage";
import { Counter } from "@/components/ui/Counter";
import { Lightbox } from "@/components/ui/Lightbox";

export function ProjetoModal({
  projeto,
  onFechar,
}: {
  projeto: Projeto | null;
  onFechar: () => void;
}) {
  if (!projeto) return null;
  return <Conteudo key={projeto.slug} projeto={projeto} onFechar={onFechar} />;
}

function Conteudo({
  projeto,
  onFechar,
}: {
  projeto: Projeto;
  onFechar: () => void;
}) {
  const reduzir = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const cor = eixos[projeto.eixos[0]].cor;
  const temGaleria = !!(projeto.galeria && projeto.galeria.length > 0);

  const { scrollY, scrollYProgress } = useScroll({ container: scrollRef });
  const heroY = useTransform(scrollY, [0, 600], [0, 140]);
  const heroEscala = useTransform(scrollY, [0, 600], [1, 1.12]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function tecla(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", tecla);
    };
  }, [onFechar]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-stretch justify-center p-3 sm:p-6 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={projeto.titulo}
      onClick={onFechar}
    >
      {/* fundo do site desfocado, visível na moldura à volta */}
      <div aria-hidden className="absolute inset-0 bg-cobalto/40 backdrop-blur-md" />

      {/* painel — deixa uma moldura à volta */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: reduzir ? 0 : 40, opacity: reduzir ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-full max-w-6xl flex-col overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(13,16,40,0.6)]"
      >
        {/* barra de progresso */}
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute left-0 top-0 z-30 h-1 w-full origin-left"
        >
          <div className="h-full w-full" style={{ backgroundColor: cor }} />
        </motion.div>
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center bg-cobalto text-xl text-white transition-colors hover:bg-rosa"
        >
          ×
        </button>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        {/* destaque: fotografia horizontal grande com parallax */}
        <div className="relative h-[42vh] min-h-[320px] overflow-hidden bg-cobalto sm:h-[58vh] sm:min-h-[360px]">
          <motion.div
            style={reduzir ? undefined : { y: heroY, scale: heroEscala }}
            className="absolute inset-0"
          >
            <ManagedImage
              src={projeto.imagemDestaque.src}
              credito={projeto.imagemDestaque.credito}
              fill
              sizes="100vw"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-cobalto/80 via-cobalto/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-10">
              <div>
                <span className="flex flex-wrap items-center gap-3">
                  {projeto.eixos.map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-eyebrow text-white"
                    >
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5"
                        style={{ backgroundColor: eixos[id].cor }}
                      />
                      {eixos[id].etiqueta}
                    </span>
                  ))}
                </span>
                <h2 className="mt-3 max-w-4xl font-display text-3xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                  {projeto.titulo}
                </h2>
                {projeto.subtitulo && (
                  <p className="mt-2 font-display text-xl font-medium text-white/85">
                    {projeto.subtitulo}
                  </p>
                )}
                <p className="mt-4 max-w-2xl text-white/85">
                  {projeto.local} · {projeto.data}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* corpo */}
        <div className="shell grid gap-8 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <Aparece root={scrollRef}>
              <p className="max-w-prosa text-pretty text-xl leading-relaxed text-cobalto">
                {projeto.introducao}
              </p>
            </Aparece>

            {projeto.descricao.map((par, i) => (
              <Aparece key={i} root={scrollRef} delay={i * 0.05}>
                <p className="mt-6 max-w-prosa text-pretty leading-relaxed text-tinta/80">
                  {par}
                </p>
              </Aparece>
            ))}

            {projeto.componentes && (
              <div className="mt-12 space-y-8">
                {projeto.componentes.map((c) => (
                  <Aparece key={c.chave} root={scrollRef}>
                    <article className="border-l-2 pl-6" style={{ borderColor: cor }}>
                      <span className="font-display text-sm font-bold" style={{ color: cor }}>
                        {c.chave}
                      </span>
                      <h3 className="mt-1 font-display text-2xl font-bold text-cobalto">
                        {c.titulo}
                      </h3>
                      <p className="mt-1 font-sans text-sm font-semibold uppercase tracking-eyebrow text-cinza">
                        {c.intro}
                      </p>
                      {c.paragrafos.map((p, j) => (
                        <p key={j} className="mt-3 max-w-prosa text-pretty leading-relaxed text-tinta/80">
                          {p}
                        </p>
                      ))}
                    </article>
                  </Aparece>
                ))}
              </div>
            )}

            {projeto.seccoes && (
              <div className="mt-12 space-y-10">
                {projeto.seccoes.map((s) => (
                  <Aparece key={s.titulo} root={scrollRef}>
                    <section>
                      <h3 className="font-display text-2xl font-bold text-cobalto">
                        {s.titulo}
                      </h3>
                      <span
                        aria-hidden
                        className="mt-3 block h-1 w-12"
                        style={{ backgroundColor: cor }}
                      />
                      {s.paragrafos.map((p, j) => (
                        <p
                          key={j}
                          className="mt-4 max-w-prosa text-pretty leading-relaxed text-tinta/80"
                        >
                          {p}
                        </p>
                      ))}
                    </section>
                  </Aparece>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-8">
            {projeto.factos && (
              <Bloco titulo="Em síntese" root={scrollRef}>
                <dl className="space-y-3">
                  {projeto.factos.map((f) => (
                    <div key={f.rotulo} className="border-b border-cobalto/10 pb-3">
                      <dt className="text-xs uppercase tracking-eyebrow text-cinza">
                        {f.rotulo}
                      </dt>
                      <dd className="mt-1 font-display text-lg font-semibold text-cobalto">
                        {f.valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Bloco>
            )}

            {projeto.objetivos && (
              <Bloco titulo="Objetivos" root={scrollRef}>
                <ul className="space-y-2.5">
                  {projeto.objetivos.map((o) => (
                    <li key={o} className="flex gap-3 text-sm leading-relaxed text-tinta/80">
                      <span aria-hidden style={{ color: cor }}>—</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </Bloco>
            )}

            {projeto.juri && (
              <Bloco titulo="Júri" root={scrollRef}>
                <ul className="space-y-3">
                  {projeto.juri.map((j) => (
                    <li key={j.nome}>
                      <p className="font-semibold text-cobalto">{j.nome}</p>
                      <p className="text-sm text-cinza">{j.papel}</p>
                    </li>
                  ))}
                </ul>
              </Bloco>
            )}

            {projeto.cronogramaEdicao && (
              <Bloco titulo="Calendário da edição" root={scrollRef}>
                <ol className="space-y-3">
                  {projeto.cronogramaEdicao.map((m) => (
                    <li key={m.data} className="border-l-2 border-cobalto/15 pl-3">
                      <p className="font-display text-sm font-semibold text-cobalto">
                        {m.data}
                      </p>
                      <p className="text-sm text-cinza">{m.descricao}</p>
                    </li>
                  ))}
                </ol>
              </Bloco>
            )}

            {projeto.parceiros && (
              <Bloco titulo="Parceiros" root={scrollRef}>
                <ul className="space-y-1.5 text-sm text-tinta/80">
                  {projeto.parceiros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </Bloco>
            )}

            {projeto.instituicoesAcervo && (
              <Bloco titulo="Instituições representadas" root={scrollRef}>
                <ul className="space-y-1.5 text-sm text-tinta/80">
                  {projeto.instituicoesAcervo.map((inst) => (
                    <li key={inst}>{inst}</li>
                  ))}
                </ul>
              </Bloco>
            )}
          </aside>
        </div>

        {/* indicadores */}
        {projeto.indicadores && (
          <div className="border-y border-cobalto/10 bg-rosaClaro py-14">
            <div className="shell grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
              {projeto.indicadores.map((ind) => (
                <div key={ind.label}>
                  <p className="font-display text-4xl font-bold text-cobalto">
                    <Counter
                      valor={ind.valor}
                      prefixo={ind.prefixo}
                      sufixo={ind.sufixo}
                    />
                  </p>
                  <p className="mt-1 text-sm text-cinza">{ind.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* galeria */}
        {temGaleria && (
          <div className="shell py-16">
            <p className="eyebrow text-cobalto/70">Imagens</p>
            <div className="mt-6 columns-2 gap-4 sm:columns-3">
              {projeto.galeria?.map((imagem, i) => (
                <button
                  key={`${imagem.src}-${i}`}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group mb-4 block w-full break-inside-avoid overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagem.src ?? ""}
                    alt=""
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={temGaleria ? "shell pb-20" : "shell pt-16 pb-20"}>
          <button
            type="button"
            onClick={onFechar}
            className="inline-flex items-center gap-2 border border-cobalto/30 px-6 py-3 font-sans text-sm font-semibold text-cobalto transition-colors hover:bg-cobalto hover:text-white"
          >
            <span aria-hidden>←</span> Voltar aos projetos
          </button>
        </div>
        </div>
      </motion.div>

      {projeto.galeria && (
        <Lightbox
          imagens={projeto.galeria}
          indice={lightbox}
          onFechar={() => setLightbox(null)}
          onMudar={setLightbox}
        />
      )}
    </motion.div>
  );
}

function Aparece({
  children,
  root,
  delay = 0,
}: {
  children: ReactNode;
  root: RefObject<HTMLElement>;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, root, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function Bloco({
  titulo,
  children,
  root,
}: {
  titulo: string;
  children: ReactNode;
  root: RefObject<HTMLElement>;
}) {
  return (
    <Aparece root={root}>
      <h3 className="eyebrow mb-4 text-cobalto/70">{titulo}</h3>
      {children}
    </Aparece>
  );
}
