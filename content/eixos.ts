// As duas missões — adaptador do CMS (missoes.json). Imagem por upload direto.

import missoes from "./cms/missoes.json";
import { normalizarImagem, type ImagemComCredito } from "./imagem";

export type EixoId = "criacao" | "expositiva";

export interface Eixo {
  id: EixoId;
  etiqueta: string;
  nome: string;
  descricao: string;
  cor: string;
  corTexto: string;
  imagemFundo: ImagemComCredito;
}

export const eixos: Record<EixoId, Eixo> = {
  criacao: {
    id: "criacao",
    etiqueta: missoes.criacao.etiqueta,
    nome: missoes.criacao.nome,
    descricao: missoes.criacao.descricao,
    cor: "#C25C84",
    corTexto: "#A8436E",
    imagemFundo: normalizarImagem(missoes.criacao.imagemFundo),
  },
  expositiva: {
    id: "expositiva",
    etiqueta: missoes.expositiva.etiqueta,
    nome: missoes.expositiva.nome,
    descricao: missoes.expositiva.descricao,
    cor: "#232A5E",
    corTexto: "#232A5E",
    imagemFundo: normalizarImagem(missoes.expositiva.imagemFundo),
  },
};

export const listaEixos: Eixo[] = [eixos.criacao, eixos.expositiva];

export const missoesDescricaoSeccao: string = missoes.descricaoSeccao;
