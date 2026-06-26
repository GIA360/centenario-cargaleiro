// Imagem com crédito opcional — adapta o campo {imagem, credito} do CMS
// (ou uma string simples, para conteúdo antigo ainda não migrado).

export interface ImagemComCredito {
  src: string | null;
  credito?: string;
}

export function normalizarImagem(v: unknown): ImagemComCredito {
  if (v && typeof v === "object") {
    const o = v as { imagem?: string | null; credito?: string };
    return { src: o.imagem ?? null, credito: o.credito || undefined };
  }
  if (typeof v === "string" && v) {
    return { src: v };
  }
  return { src: null };
}
