"use client";

import Image from "next/image";
import { useState } from "react";
import { logoSrc } from "@/content/site";
import { cn } from "@/lib/utils";

type Variante = "header" | "footer";

// Alturas responsivas por variante (o cabeçalho é grande, ~dobro do anterior).
const CLASSE: Record<Variante, string> = {
  header: "h-[40px] sm:h-[46px] lg:h-[52px]",
  footer: "h-[84px] lg:h-[104px]",
};

/** Logótipo do Centenário (imagem caligráfica em cobalto), usado sempre sobre
 *  fundo branco/claro. Recurso tipográfico apenas se a imagem falhar. */
export function Logo({
  variante = "header",
  className,
}: {
  variante?: Variante;
  className?: string;
}) {
  const [erro, setErro] = useState(false);

  if (erro || !logoSrc) {
    return (
      <span className={cn("inline-flex items-baseline gap-2 text-cobalto", className)}>
        <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">
          Cargaleiro
        </span>
        <span className="font-display text-xs font-medium tracking-[0.1em] text-ceramica">
          1927 × 2027
        </span>
      </span>
    );
  }

  return (
    <Image
      src={logoSrc}
      alt="Logótipo do Centenário Manuel Cargaleiro, 1927–2027"
      width={1483}
      height={736}
      priority={variante === "header"}
      onError={() => setErro(true)}
      className={cn("w-auto select-none object-contain", CLASSE[variante], className)}
    />
  );
}
