// Cronograma 2026–2028 — adaptador do CMS (content/cms/cronograma/*.json).

import type { EixoId } from "./eixos";

export interface EventoCronograma {
  id: string;
  dataLabel: string;
  dataOrdenacao: string;
  titulo: string;
  local: string;
  eixo?: EixoId;
  projetoSlug?: string;
  imagem?: string | null;
  porDefinir?: boolean;
}

import principio_do_gesto from "./cms/cronograma/principio-do-gesto.json";
import premios_inauguracao_museu from "./cms/cronograma/premios-inauguracao-museu.json";
import premios_cerimonia_catalogo from "./cms/cronograma/premios-cerimonia-catalogo.json";
import pavilhao_portugal from "./cms/cronograma/pavilhao-portugal.json";
import oamc_seixal from "./cms/cronograma/oamc-seixal.json";
import polo_ceramica from "./cms/cronograma/polo-ceramica.json";
import premios_2a_edicao from "./cms/cronograma/premios-2a-edicao.json";
import requalificacao_museu from "./cms/cronograma/requalificacao-museu.json";
import museo_diffuso_ravello from "./cms/cronograma/museo-diffuso-ravello.json";

const RAW: { id: string; data: Record<string, unknown> }[] = [
  { id: "principio-do-gesto", data: principio_do_gesto },
  { id: "premios-inauguracao-museu", data: premios_inauguracao_museu },
  { id: "premios-cerimonia-catalogo", data: premios_cerimonia_catalogo },
  { id: "pavilhao-portugal", data: pavilhao_portugal },
  { id: "oamc-seixal", data: oamc_seixal },
  { id: "polo-ceramica", data: polo_ceramica },
  { id: "premios-2a-edicao", data: premios_2a_edicao },
  { id: "requalificacao-museu", data: requalificacao_museu },
  { id: "museo-diffuso-ravello", data: museo_diffuso_ravello },
];

export const cronograma: EventoCronograma[] = RAW.map(({ id, data }) => ({
  id,
  dataLabel: data.dataLabel as string,
  dataOrdenacao: data.dataOrdenacao as string,
  titulo: data.titulo as string,
  local: data.local as string,
  eixo: (data.eixo as EixoId) || undefined,
  projetoSlug: (data.projetoSlug as string) || undefined,
  imagem: (data.imagem as string) || null,
  porDefinir: Boolean(data.porDefinir),
})).sort((a, b) => a.dataOrdenacao.localeCompare(b.dataOrdenacao));
