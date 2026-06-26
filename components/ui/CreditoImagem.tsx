export function CreditoImagem({ texto }: { texto?: string }) {
  if (!texto) return null;
  return (
    <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 truncate bg-gradient-to-t from-black/55 to-transparent px-2.5 pb-1 pt-5 text-right font-sans text-[10px] leading-snug text-white/80">
      {texto}
    </span>
  );
}
