// Projetos / iniciativas — adaptador do CMS (content/cms/projetos/*.json).

import type { EixoId } from "./eixos";
import { normalizarImagem, type ImagemComCredito } from "./imagem";

export interface Indicador {
  valor: number;
  prefixo?: string;
  sufixo?: string;
  label: string;
}

export interface MarcoEdicao {
  data: string;
  descricao: string;
}

export interface ComponenteAncora {
  chave: string;
  titulo: string;
  intro: string;
  paragrafos: string[];
}

export interface Projeto {
  slug: string;
  titulo: string;
  subtitulo?: string;
  eixos: EixoId[];
  local: string;
  data: string;
  dataOrdenacao: string;
  ancora?: boolean;
  resumo: string;
  introducao: string;
  descricao: string[];
  imagemDestaque: ImagemComCredito;
  imagemFlutuante: ImagemComCredito;
  galeria?: ImagemComCredito[];
  parceiros?: string[];
  objetivos?: string[];
  juri?: { nome: string; papel: string }[];
  factos?: { rotulo: string; valor: string }[];
  cronogramaEdicao?: MarcoEdicao[];
  instituicoesAcervo?: string[];
  indicadores?: Indicador[];
  componentes?: ComponenteAncora[];
  seccoes?: { titulo: string; paragrafos: string[] }[];
  usaCompositores?: boolean;
}

import nove_decadas from "./cms/projetos/nove-decadas-um-legado.json";
import premios from "./cms/projetos/premios-manuel-cargaleiro.json";
import principio from "./cms/projetos/principio-do-gesto.json";
import polo from "./cms/projetos/polo-da-ceramica.json";
import requalificacao from "./cms/projetos/requalificacao-museu.json";

const RAW: { slug: string; data: Record<string, any> }[] = [
  { slug: "nove-decadas-um-legado", data: nove_decadas },
  { slug: "premios-manuel-cargaleiro", data: premios },
  { slug: "principio-do-gesto", data: principio },
  { slug: "polo-da-ceramica", data: polo },
  { slug: "requalificacao-museu", data: requalificacao },
];

// Arrays vazios voltam a undefined (para os componentes não renderem blocos vazios).
function vazioParaUndef<T>(a: T[] | undefined): T[] | undefined {
  return a && a.length > 0 ? a : undefined;
}

function toProjeto(slug: string, data: Record<string, any>): Projeto {
  return {
    slug,
    titulo: data.titulo,
    subtitulo: data.subtitulo || undefined,
    eixos: (Array.isArray(data.eixos) ? data.eixos : [data.eixo]) as EixoId[],
    local: data.local,
    data: data.data,
    dataOrdenacao: data.dataOrdenacao,
    ancora: data.ancora || undefined,
    resumo: data.resumo,
    introducao: data.introducao,
    descricao: data.descricao,
    imagemDestaque: normalizarImagem(data.imagemDestaque),
    imagemFlutuante: normalizarImagem(data.imagemFlutuante),
    galeria: vazioParaUndef(data.galeria)?.map(normalizarImagem),
    parceiros: vazioParaUndef(data.parceiros),
    objetivos: vazioParaUndef(data.objetivos),
    juri: vazioParaUndef(data.juri),
    factos: vazioParaUndef(data.factos),
    cronogramaEdicao: vazioParaUndef(data.cronogramaEdicao),
    instituicoesAcervo: vazioParaUndef(data.instituicoesAcervo),
    indicadores: vazioParaUndef(data.indicadores),
    componentes: vazioParaUndef(data.componentes),
    seccoes: vazioParaUndef(data.seccoes),
    usaCompositores: data.usaCompositores || undefined,
  };
}

export const projetos: Projeto[] = RAW.map(({ slug, data }) => ({
  ordem: typeof data.ordem === "number" ? data.ordem : 99,
  projeto: toProjeto(slug, data),
}))
  .sort((a, b) => a.ordem - b.ordem)
  .map((x) => x.projeto);

export function obterProjeto(slug: string): Projeto | undefined {
  return projetos.find((p) => p.slug === slug);
}

export function projetosPorEixo(eixo: EixoId): Projeto[] {
  return projetos.filter((p) => p.eixos.includes(eixo));
}

export const projetoAncora = projetos.find((p) => p.ancora);
