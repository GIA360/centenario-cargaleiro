"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, proporcaoParaRatio } from "@/lib/utils";
import { CreditoImagem } from "@/components/ui/CreditoImagem";

interface ManagedImageProps {
  /** Caminho da imagem (ex.: /images/biblioteca/...). Vazio → placeholder. */
  src?: string | null;
  alt?: string;
  fill?: boolean;
  ratio?: string;
  proporcao?: keyof typeof proporcaoParaRatio;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  contain?: boolean;
  /** Crédito discreto, mostrado no canto inferior da imagem. */
  credito?: string;
}

export function ManagedImage({
  src,
  alt = "",
  fill = false,
  ratio,
  proporcao = "paisagem",
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  objectPosition = "center",
  contain = false,
  credito,
}: ManagedImageProps) {
  const [erro, setErro] = useState(false);

  const aspectRatio = fill ? undefined : ratio ?? proporcaoParaRatio[proporcao];
  const semImagem = !src || erro;

  return (
    <figure
      className={cn("m-0", fill && "h-full w-full")}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          fill ? "h-full w-full" : "w-full",
          className,
        )}
        style={aspectRatio ? { aspectRatio } : undefined}
        role={semImagem ? "img" : undefined}
        aria-label={semImagem ? alt : undefined}
      >
        {semImagem ? (
          <Placeholder />
        ) : (
          <>
            <Image
              src={src as string}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={cn(contain ? "object-contain" : "object-cover", imgClassName)}
              style={{ objectPosition }}
              onError={() => setErro(true)}
            />
            <CreditoImagem texto={credito} />
          </>
        )}
      </div>
    </figure>
  );
}

function Placeholder() {
  return (
    <div className="placeholder-azulejo absolute inset-0 flex items-center justify-center p-4 text-center">
      <span className="font-display text-sm font-medium text-cobalto/60">
        imagem a integrar
      </span>
    </div>
  );
}
