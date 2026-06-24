import { eixos, type EixoId } from "@/content/eixos";
import { cn } from "@/lib/utils";

interface AxisBadgeProps {
  eixo: EixoId;
  className?: string;
}

/** Etiqueta de eixo, constante em todo o site. Um quadrado de glaze cerâmico
 *  (azulejo) + a etiqueta curta. */
export function AxisBadge({ eixo, className }: AxisBadgeProps) {
  const e = eixos[eixo];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-eyebrow",
        className,
      )}
      style={{ color: e.corTexto }}
    >
      <span
        aria-hidden
        className="h-2.5 w-2.5 shrink-0"
        style={{ backgroundColor: e.cor }}
      />
      {e.etiqueta}
    </span>
  );
}
