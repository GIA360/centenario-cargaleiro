// Configuração e textos transversais — adaptador do CMS (content/cms/geral.json).

import geral from "./cms/geral.json";

export const site = {
  nome: "Centenário Manuel Cargaleiro",
  marca: "1927 × 2027",
  descricao:
    "Comemorações do Centenário de Manuel Cargaleiro (1927–2027). Um programa da Fundação Manuel Cargaleiro.",
  urlBase: "https://centenario.fundacaomanuelcargaleiro.pt",
};

// Imagens globais (upload no CMS — secção «Geral»).
export const logoSrc: string = geral.logo ?? "";
export const obraSrc: string = geral.obraDestaque ?? "";

export const hero = {
  sobretitulo: geral.heroSobretitulo,
  frase: geral.heroFrase,
  ctaPrimario: { label: geral.ctaPrimarioLabel, href: geral.ctaPrimarioHref },
  ctaSecundario: {
    label: geral.ctaSecundarioLabel,
    href: geral.ctaSecundarioHref,
  },
};

export const manifestoFrase = geral.manifestoFrase;

export interface ItemNav {
  label: string;
  href: string;
}

export const navegacao: ItemNav[] = [
  { label: "Programa", href: "/#programa" },
  { label: "Cronograma", href: "/cronograma" },
  { label: "Contactos", href: "/#contactos" },
];

export const contactos = {
  instituicao: geral.contactosInstituicao,
  email: geral.contactosEmail,
  morada: geral.contactosMorada,
};

export const fmc = {
  nome: "Fundação Manuel Cargaleiro",
  url: geral.fmcUrl,
  urlLabel: geral.fmcUrlLabel,
  referencia: geral.fmcReferencia,
};

export const newsletter = {
  titulo: geral.newsletterTitulo,
  texto: geral.newsletterTexto,
  placeholder: "O seu endereço de email",
  botao: "Subscrever",
};

// Logótipos do rodapé (upload no CMS — secção «Geral»).
export const rodapeLogos: { titulo: string; srcs: string[] }[] = [
  { titulo: "Parceiros", srcs: (geral.parceiros ?? []) as string[] },
  { titulo: "Patrocínios", srcs: (geral.patrocinios ?? []) as string[] },
];
