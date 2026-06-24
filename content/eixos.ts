// As duas missões — adaptador do CMS (missoes.json). Imagem por upload direto.

import missoes from "./cms/missoes.json";

export type EixoId = "criacao" | "expositiva";

export interface Eixo {
  id: EixoId;
  etiqueta: string;
  nome: string;
  descricao: string;
  cor: string;
  corTexto: string;
  imagemFundo: string | null;
}

export const eixos: Record<EixoId, Eixo> = {
  criacao: {
    id: "criacao",
    etiqueta: missoes.criacao.etiqueta,
    nome: missoes.criacao.nome,
    descricao: missoes.criacao.descricao,
    cor: "#C25C84",
    corTexto: "#A8436E",
    imagemFundo: missoes.criacao.imagemFundo ?? null,
  },
  expositiva: {
    id: "expositiva",
    etiqueta: missoes.expositiva.etiqueta,
    nome: missoes.expositiva.nome,
    descricao: missoes.expositiva.descricao,
    cor: "#232A5E",
    corTexto: "#232A5E",
    imagemFundo: missoes.expositiva.imagemFundo ?? null,
  },
};

export const listaEixos: Eixo[] = [eixos.criacao, eixos.expositiva];

export const missoesDescricaoSeccao: string = missoes.descricaoSeccao;
