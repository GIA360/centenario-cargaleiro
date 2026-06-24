// Junta classes condicionais, ignorando valores falsy.
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

// Razão de aspeto (CSS aspect-ratio) por proporção do manifesto.
export const proporcaoParaRatio: Record<string, string> = {
  paisagem: "3 / 2",
  retrato: "4 / 5",
  quadrada: "1 / 1",
  panoramica: "16 / 9",
};
