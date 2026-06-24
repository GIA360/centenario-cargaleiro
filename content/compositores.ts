// Compositores das quatro obras musicais originais do projeto-âncora
// "Nove décadas, um legado" (Pavilhão de Portugal).
// Cada obra corresponde a um período da trajetória de Manuel Cargaleiro.

export interface Compositor {
  nome: string;
  obra: string; // designação da obra (I a IV)
  periodo: string; // décadas abrangidas
  andamentos: number; // número de andamentos da obra
  imagemId: string;
}

export const compositores: Compositor[] = [
  {
    nome: "Pedro Lima",
    obra: "Obra I",
    periodo: "Décadas de 40 e 50 — o início do legado",
    andamentos: 2,
    imagemId: "compositor-pedro-lima",
  },
  {
    nome: "Dimitris Andrikopoulos",
    obra: "Obra II",
    periodo: "Décadas de 60, 70 e 80",
    andamentos: 3,
    imagemId: "compositor-dimitris-andrikopoulos",
  },
  {
    nome: "Sofia Sousa Rocha",
    obra: "Obra III",
    periodo: "Décadas de 90 e 2000",
    andamentos: 2,
    imagemId: "compositor-sofia-sousa-rocha",
  },
  {
    nome: "Solange Azevedo",
    obra: "Obra IV",
    periodo: "De 2010 à última criação (2010–2024)",
    andamentos: 2,
    imagemId: "compositor-solange-azevedo",
  },
];

// Lontano Trio — direção artística e interpretação
export interface IntegranteTrio {
  nome: string;
  instrumento: string;
}

export const lontanoTrio: IntegranteTrio[] = [
  { nome: "Clara de Sousa Gonçalves", instrumento: "Saxofone" },
  { nome: "Francisco Martins", instrumento: "Acordeão" },
  { nome: "Pedro Vasquinho", instrumento: "Contrabaixo" },
];
