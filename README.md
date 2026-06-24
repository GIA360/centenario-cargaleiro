# Centenário Manuel Cargaleiro · 1927 — 2027

Website institucional das Comemorações do Centenário de Manuel Cargaleiro, da
Fundação Manuel Cargaleiro. Programa plurianual (2026–2028) organizado em **dois
eixos / duas missões**: *Apoio à Criação* e *Programação Expositiva*.

Construído com **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**.
Interface em **Português de Portugal**.

---

## Como correr

```bash
npm install        # instalar dependências (1.ª vez)
npm run dev        # servidor de desenvolvimento → http://localhost:3000
npm run build      # build de produção
npm run start      # servir a build de produção
npm run lint       # ESLint
```

> Requer Node 18.18+ (testado em Node 24). Pronto para deploy na **Vercel**.

---

## Editar texto e imagens — CMS visual (`/keystatic`)

Com o servidor a correr (`npm run dev`), abre **http://localhost:3000/keystatic**.
É um painel visual onde editas **texto e imagens** sem mexer no código:

- **Geral** — hero (sobretítulo, frase, botões), frase de destaque, contactos, referência à Fundação, newsletter.
- **Duas missões** — etiqueta, nome, descrição e fotografia de cada missão.
- **Projetos / Iniciativas** — todos os textos de cada projeto (introdução, parágrafos, factos, júri, subsecções, calendário, indicadores, componentes, imagem de destaque e galeria).
- **Cronograma** — os marcos da linha do tempo.
- **Imagens** — biblioteca de imagens; aqui **carregas/substituis** ficheiros (vão para `public/images/biblioteca/`). Os projetos e missões escolhem a imagem da biblioteca.

Como funciona: o conteúdo é guardado em ficheiros **JSON** em `content/cms/`. Em
modo local, ao gravar no painel os ficheiros são escritos no projeto e o site
atualiza-se logo. Para **publicar** (Vercel), faz commit + push das alterações.

> Para edição online (sem ser na tua máquina), trocar `storage: { kind: 'local' }`
> por `storage: { kind: 'github', repo: 'org/repo' }` em
> [`keystatic.config.ts`](keystatic.config.ts) depois de o repositório estar no GitHub.

> O conteúdo inicial foi gerado a partir dos dados originais com
> `npx tsx scripts/gen-cms.ts` (só é preciso correr de novo se reiniciares o conteúdo).

---

## Onde colocar as imagens (manualmente, alternativa ao CMS)

Todas as imagens são geridas por um **manifesto central**:
[`content/imagens.ts`](content/imagens.ts). Nenhum componente referencia caminhos
diretamente — usam sempre o `id` através de `<ManagedImage>`.

Para fornecer/trocar uma imagem:

1. Coloca o ficheiro em `public/images/...` no caminho indicado em
   [`MAPA-DE-IMAGENS.md`](MAPA-DE-IMAGENS.md) (mantendo o nome), **ou**
2. Edita a linha `src` da entrada correspondente em `content/imagens.ts`.

Enquanto o ficheiro não existir, aparece um *placeholder* elegante (padrão de
azulejo) com o `id` e o local visíveis em modo de desenvolvimento.

O documento [`MAPA-DE-IMAGENS.md`](MAPA-DE-IMAGENS.md) lista **todas** as imagens
esperadas: caminho, onde aparecem, orientação e resolução mínima.

---

## Onde editar o conteúdo

Todo o conteúdo está centralizado em [`/content`](content) (preparado para PT/EN
futuro — nada de texto disperso pelo JSX):

| Ficheiro | Conteúdo |
|---|---|
| `content/site.ts` | Navegação, contactos, frase do hero, referência à Fundação, logótipos do rodapé |
| `content/eixos.ts` | As duas missões (etiquetas, cores, fotografias de fundo) |
| `content/projetos.ts` | As 5 iniciativas (textos, datas, factos, júri, subsecções, indicadores, galerias) |
| `content/cronograma.ts` | Linha do tempo 2026–2028 |
| `content/compositores.ts` | Compositores e Lontano Trio («Nove décadas») |
| `content/reconhecimentos.ts` | Distinções do artista |
| `content/imagens.ts` | Manifesto de imagens (ver acima) |

Cada **iniciativa** abre num *pop-up* (modal) ao clicar — não há páginas
separadas por projeto. Para adicionar texto rico a um projeto, usa os campos
`descricao` (parágrafos), `seccoes` (subsecções tituladas), `factos`,
`objetivos`, `juri`, `cronogramaEdicao`, `indicadores` e `galeria`.

---

## Estrutura

```
app/
  layout.tsx        # cabeçalho, rodapé, transições, barra de progresso, provider do modal
  page.tsx          # homepage (hero, frase, missões, projetos, cronograma)
  cronograma/       # /cronograma — linha do tempo interativa + JSON-LD Event
components/
  home/             # HeroLogo, BrushCanvas, Manifesto, Missoes, ProjetosIndex, CronogramaSecao
  projetos/         # ProjectCard, ProjetoModal (+ provider)
  cronograma/       # TimelineInterativa (filtros + scroll + próxima inauguração)
  site/             # Header, Footer, Logo, Newsletter, ScrollProgress, PageTransition
  ui/               # Reveal, AxisBadge, Counter, Lightbox
  ManagedImage.tsx  # lê do manifesto; placeholder elegante quando falta o ficheiro
content/            # TODO o conteúdo (ver acima)
lib/utils.ts        # cn(), razões de aspeto
public/images/      # ficheiros de imagem (ver MAPA-DE-IMAGENS.md)
```

---

## Identidade visual

- **Paleta:** branco (fundo) · **azul-cobalto** do logótipo (`#232A5E`) · **rosa**
  extraído da obra de 1970 (`#C25C84`). Secção da frase em cobalto escuro para
  contraste. Tokens em [`tailwind.config.ts`](tailwind.config.ts).
- **Tipografia:** *Bricolage Grotesque* (títulos) + *Hanken Grotesk* (corpo), via
  `next/font`.
- **Missões:** Apoio à Criação = rosa · Programação Expositiva = cobalto.
- **Interações:** rasto de pincel que segue o rato no hero; frase que se acende ao
  scroll com a obra a revelar-se; secção de projetos com pré-visualização que segue
  o cursor; cronograma com filtros; modais com parallax e galeria com *lightbox*.
- **Acessibilidade:** `prefers-reduced-motion` respeitado, foco visível,
  navegação por teclado, `alt` descritivos, *skip link*.

---

## SEO

Metadados por página, Open Graph, e **JSON-LD `Event`** para as datas do
cronograma (em `app/cronograma/page.tsx`). Atualizar `urlBase` em
`content/site.ts` antes do deploy.

---

## Notas

- O logótipo é usado **sempre sobre fundo branco/claro**.
- As datas e textos das iniciativas são a **fonte autorizada** — campos por
  confirmar estão assinalados com `// a confirmar`.
