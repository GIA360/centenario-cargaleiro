"use client";

import { motion, useMotionTemplate, type MotionValue } from "framer-motion";

// original: "/images/hero/azulejo.jpg" — trocar de volta para reverter o teste
const AZULEJO = "/images/hero/azulejo-novo.webp";

// teste: imagem única (sem padrão repetido), a cobrir toda a secção
// original: backgroundSize: "clamp(360px, 32vw, 520px) auto", backgroundRepeat: "repeat"
const fundo = {
  backgroundImage: `url("${AZULEJO}")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
} as const;

/**
 * Campo de azulejos do Cargaleiro a cobrir toda a secção, muito esbatido para
 * branco. Ao mover o rato, os azulejos "acendem" à volta do cursor. O logótipo
 * (renderizado por cima) mantém-se estático.
 */
export function HeroAzulejos({
  mx,
  my,
  reduzir,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduzir: boolean;
}) {
  const mask = useMotionTemplate`radial-gradient(circle 24vmax at ${mx}% ${my}%, #000 0%, rgba(0,0,0,0.5) 38%, transparent 68%)`;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-white">
      {/* campo de azulejos sempre presente, muito ténue */}
      <div className="absolute inset-0 opacity-[0.05]" style={fundo} />

      {/* azulejos vívidos revelados à volta do rato */}
      {!reduzir && (
        <motion.div
          className="absolute inset-0 opacity-[0.7]"
          style={{ ...fundo, WebkitMaskImage: mask, maskImage: mask }}
        />
      )}

      {/* esbatimento para branco: topo, base e cantos */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/0 to-white" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_25%,white_82%)]" />
    </div>
  );
}
