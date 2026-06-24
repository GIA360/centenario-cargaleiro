"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navegacao } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [encolhido, setEncolhido] = useState(false);
  // Na homepage, o logótipo do cabeçalho só aparece a partir da 2.ª secção
  // (no hero já há o logótipo grande, para não repetir). Noutras páginas, sempre.
  const naHome = pathname === "/";
  const [mostraLogo, setMostraLogo] = useState(false);

  // Fecha o menu móvel ao mudar de rota.
  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  // Sombra ao descer + revelação do logótipo após o hero.
  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      setEncolhido(y > 12);
      setMostraLogo(y > window.innerHeight * 0.72);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  const logoVisivel = !naHome || mostraLogo;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-cobalto/10 bg-white/85 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-white/70",
        encolhido && "shadow-[0_8px_30px_-16px_rgba(35,42,94,0.45)]",
      )}
    >
      <div
        className={cn(
          "shell flex items-center justify-between gap-6 transition-all duration-300",
          encolhido ? "py-2" : "py-2.5 lg:py-3",
        )}
      >
        {/* Esquerda: logótipo (ao descer) OU o texto do centenário (1.ª secção) */}
        <div className="flex min-w-0 flex-1 items-center">
          {logoVisivel ? (
            <Link
              href="/"
              aria-label="Centenário Manuel Cargaleiro — início"
              className="shrink-0"
            >
              <Logo variante="header" />
            </Link>
          ) : (
            <span className="eyebrow hidden text-cobalto/60 lg:block">
              Centenário do nascimento de Manuel Cargaleiro (1927–2027)
            </span>
          )}
        </div>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {navegacao.map((item) => {
            const ativo =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo ? "page" : undefined}
                className={cn(
                  "relative font-sans text-sm font-medium text-tinta transition-colors hover:text-ceramica",
                  ativo && "text-cobalto",
                )}
              >
                {item.label}
                {ativo && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-rosa" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="md:hidden"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
        >
          <Hamburguer aberto={aberto} />
        </button>
      </div>

      {/* filete em gradiente */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rosa/50 to-transparent"
      />

      {/* Menu móvel */}
      <div
        id="menu-movel"
        className={cn(
          "overflow-hidden border-t border-cobalto/10 bg-white md:hidden",
          aberto ? "max-h-96" : "max-h-0 border-t-0",
        )}
        style={{ transition: "max-height 0.3s ease" }}
      >
        <nav className="shell flex flex-col py-3" aria-label="Principal (móvel)">
          {navegacao.map((item) => {
            const ativo =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b border-cobalto/5 py-3 font-sans text-base text-tinta",
                  ativo && "font-semibold text-cobalto",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Hamburguer({ aberto }: { aberto: boolean }) {
  return (
    <span className="relative block h-4 w-6">
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-6 bg-cobalto transition-all",
          aberto ? "top-1.5 rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1.5 block h-0.5 w-6 bg-cobalto transition-opacity",
          aberto && "opacity-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-6 bg-cobalto transition-all",
          aberto ? "top-1.5 -rotate-45" : "top-3",
        )}
      />
    </span>
  );
}
