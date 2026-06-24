import { config, fields, collection, singleton } from "@keystatic/core";

// CMS visual do Centenário Manuel Cargaleiro (modo local).
// As imagens são carregadas DIRETAMENTE em cada campo (upload), guardadas em
// public/images/biblioteca/...

const eixoOptions = [
  { label: "Apoio à Criação", value: "criacao" },
  { label: "Programação Expositiva", value: "expositiva" },
] as const;

const img = (sub: string, label = "Imagem", description?: string) =>
  fields.image({
    label,
    description,
    directory: `public/images/biblioteca/${sub}`,
    publicPath: `/images/biblioteca/${sub}`,
  });

export default config({
  storage: { kind: "local" },
  ui: {
    brand: { name: "Centenário Cargaleiro" },
    navigation: {
      Conteúdo: ["geral", "missoes", "projetos", "cronograma"],
    },
  },
  singletons: {
    geral: singleton({
      label: "Geral (hero, frase, contactos, imagens)",
      path: "content/cms/geral",
      format: { data: "json" },
      schema: {
        logo: fields.image({
          label: "Logótipo",
          description:
            "PNG com fundo transparente (usado sobre branco), horizontal ~2:1. Ex.: 1483×736.",
          directory: "public/images/biblioteca/geral",
          publicPath: "/images/biblioteca/geral",
        }),
        obraDestaque: fields.image({
          label: "Imagem de fundo da frase de destaque",
          description:
            "Imagem horizontal grande (ocupa o ecrã). JPG ~1920×1080, leve (<600 KB).",
          directory: "public/images/biblioteca/geral",
          publicPath: "/images/biblioteca/geral",
        }),
        heroSobretitulo: fields.text({ label: "Hero — sobretítulo" }),
        manifestoFrase: fields.text({
          label: "Frase de destaque (2.ª secção)",
          multiline: true,
        }),
        heroFrase: fields.text({ label: "Hero — frase (reserva)", multiline: true }),
        ctaPrimarioLabel: fields.text({ label: "Botão principal — texto" }),
        ctaPrimarioHref: fields.text({ label: "Botão principal — ligação" }),
        ctaSecundarioLabel: fields.text({ label: "Botão secundário — texto" }),
        ctaSecundarioHref: fields.text({ label: "Botão secundário — ligação" }),
        contactosInstituicao: fields.text({ label: "Contactos — instituição" }),
        contactosEmail: fields.text({ label: "Contactos — email" }),
        contactosMorada: fields.text({ label: "Contactos — morada" }),
        fmcReferencia: fields.text({
          label: "Rodapé — referência à Fundação",
          multiline: true,
        }),
        fmcUrl: fields.text({ label: "Fundação — URL" }),
        fmcUrlLabel: fields.text({ label: "Fundação — texto do link" }),
        newsletterTitulo: fields.text({ label: "Newsletter — título" }),
        newsletterTexto: fields.text({ label: "Newsletter — texto", multiline: true }),
        parceiros: fields.array(
          img("parceiros", "Logótipo", "PNG com fundo transparente, horizontal."),
          { label: "Logótipos — Parceiros", itemLabel: () => "Logótipo" },
        ),
        patrocinios: fields.array(
          img("patrocinios", "Logótipo", "PNG com fundo transparente, horizontal."),
          { label: "Logótipos — Patrocínios", itemLabel: () => "Logótipo" },
        ),
      },
    }),

    missoes: singleton({
      label: "Duas missões",
      path: "content/cms/missoes",
      format: { data: "json" },
      schema: {
        descricaoSeccao: fields.text({
          label: "Descrição da secção (sob o título 'Duas missões')",
          multiline: true,
        }),
        criacao: fields.object(
          {
            etiqueta: fields.text({ label: "Etiqueta" }),
            nome: fields.text({ label: "Nome completo" }),
            descricao: fields.text({ label: "Descrição", multiline: true }),
            imagemFundo: img(
              "missoes",
              "Fotografia de fundo",
              "Vertical / retrato (4:5), ~1400×1800. JPG.",
            ),
          },
          { label: "Missão — Apoio à Criação" },
        ),
        expositiva: fields.object(
          {
            etiqueta: fields.text({ label: "Etiqueta" }),
            nome: fields.text({ label: "Nome completo" }),
            descricao: fields.text({ label: "Descrição", multiline: true }),
            imagemFundo: img(
              "missoes",
              "Fotografia de fundo",
              "Vertical / retrato (4:5), ~1400×1800. JPG.",
            ),
          },
          { label: "Missão — Programação Expositiva" },
        ),
      },
    }),
  },

  collections: {
    projetos: collection({
      label: "Projetos / Iniciativas",
      path: "content/cms/projetos/*",
      slugField: "titulo",
      format: { data: "json" },
      schema: {
        titulo: fields.slug({ name: { label: "Título" } }),
        subtitulo: fields.text({ label: "Subtítulo" }),
        eixos: fields.multiselect({
          label: "Missões",
          options: eixoOptions as any,
          defaultValue: ["expositiva"],
        }),
        ancora: fields.checkbox({ label: "Projeto-âncora", defaultValue: false }),
        local: fields.text({ label: "Local" }),
        data: fields.text({ label: "Data (texto)" }),
        dataOrdenacao: fields.text({ label: "Data de ordenação (AAAA-MM-DD)" }),
        ordem: fields.integer({ label: "Ordem na lista", defaultValue: 0 }),
        resumo: fields.text({ label: "Resumo (cartão)", multiline: true }),
        introducao: fields.text({ label: "Introdução", multiline: true }),
        imagemDestaque: fields.image({
          label: "Imagem de destaque (banner)",
          description:
            "Banner horizontal 16:9, ~2000×1125, com o motivo ao centro. JPG.",
          directory: "public/images/biblioteca/projetos",
          publicPath: "/images/biblioteca/projetos",
        }),
        imagemFlutuante: fields.image({
          label: "Imagem flutuante (pré-visualização)",
          description:
            "Surge a flutuar ao passar o rato na lista de projetos. Proporção 4:3, ~800×600. JPG.",
          directory: "public/images/biblioteca/projetos",
          publicPath: "/images/biblioteca/projetos",
        }),
        galeria: fields.array(
          img("projetos", "Imagem", "Qualquer proporção — a galeria respeita o original."),
          { label: "Galeria (upload)", itemLabel: () => "Imagem" },
        ),
        descricao: fields.array(fields.text({ label: "Parágrafo", multiline: true }), {
          label: "Descrição (parágrafos)",
          itemLabel: (p) => p.value.slice(0, 50),
        }),
        factos: fields.array(
          fields.object({
            rotulo: fields.text({ label: "Rótulo" }),
            valor: fields.text({ label: "Valor" }),
          }),
          { label: "Factos em síntese", itemLabel: (p) => p.fields.rotulo.value },
        ),
        objetivos: fields.array(fields.text({ label: "Objetivo" }), {
          label: "Objetivos",
          itemLabel: (p) => p.value.slice(0, 50),
        }),
        parceiros: fields.array(fields.text({ label: "Parceiro" }), {
          label: "Parceiros",
          itemLabel: (p) => p.value.slice(0, 50),
        }),
        juri: fields.array(
          fields.object({
            nome: fields.text({ label: "Nome" }),
            papel: fields.text({ label: "Papel" }),
          }),
          { label: "Júri", itemLabel: (p) => p.fields.nome.value },
        ),
        seccoes: fields.array(
          fields.object({
            titulo: fields.text({ label: "Título da subsecção" }),
            paragrafos: fields.array(
              fields.text({ label: "Parágrafo", multiline: true }),
              { label: "Parágrafos", itemLabel: (p) => p.value.slice(0, 40) },
            ),
          }),
          { label: "Subsecções de texto", itemLabel: (p) => p.fields.titulo.value },
        ),
        cronogramaEdicao: fields.array(
          fields.object({
            data: fields.text({ label: "Data" }),
            descricao: fields.text({ label: "Descrição" }),
          }),
          { label: "Calendário da edição", itemLabel: (p) => p.fields.data.value },
        ),
        indicadores: fields.array(
          fields.object({
            valor: fields.integer({ label: "Valor" }),
            prefixo: fields.text({ label: "Prefixo" }),
            sufixo: fields.text({ label: "Sufixo" }),
            label: fields.text({ label: "Etiqueta" }),
          }),
          { label: "Indicadores (contadores)", itemLabel: (p) => p.fields.label.value },
        ),
        instituicoesAcervo: fields.array(fields.text({ label: "Instituição" }), {
          label: "Instituições representadas",
          itemLabel: (p) => p.value.slice(0, 50),
        }),
        componentes: fields.array(
          fields.object({
            chave: fields.text({ label: "Letra (A/B/C)" }),
            titulo: fields.text({ label: "Título" }),
            intro: fields.text({ label: "Subtítulo" }),
            paragrafos: fields.array(
              fields.text({ label: "Parágrafo", multiline: true }),
              { label: "Parágrafos", itemLabel: (p) => p.value.slice(0, 40) },
            ),
          }),
          { label: "Componentes (A/B/C — âncora)", itemLabel: (p) => p.fields.titulo.value },
        ),
        usaCompositores: fields.checkbox({
          label: "Mostra compositores (Nove décadas)",
          defaultValue: false,
        }),
      },
    }),

    cronograma: collection({
      label: "Cronograma",
      path: "content/cms/cronograma/*",
      slugField: "titulo",
      format: { data: "json" },
      schema: {
        titulo: fields.slug({ name: { label: "Título do marco" } }),
        dataLabel: fields.text({ label: "Data (texto)" }),
        dataOrdenacao: fields.text({ label: "Data de ordenação (AAAA-MM-DD)" }),
        local: fields.text({ label: "Local" }),
        eixo: fields.select({
          label: "Missão",
          options: eixoOptions as any,
          defaultValue: "expositiva",
        }),
        projetoSlug: fields.text({ label: "Liga ao projeto (slug, opcional)" }),
        imagem: img(
          "cronograma",
          "Imagem do card",
          "Horizontal 16:9, ~800×450. Se vazia e houver projeto ligado, usa a imagem do projeto.",
        ),
        porDefinir: fields.checkbox({ label: "Data por definir", defaultValue: false }),
      },
    }),
  },
});
