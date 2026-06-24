import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Três tons: branco (fundo) + azul-cobalto (marca) + rosa da obra.
        cobalto: "#232A5E", // azul-cobalto do logótipo — marca, títulos, missão Expositiva
        ceramica: "#2F4FB0", // azul-cerâmica — acento vivo, links, hover
        rosa: "#C25C84", // rosa-magenta extraído da obra de 1970 — acento e missão Criação
        rosaEscuro: "#A8436E", // rosa para texto sobre branco (contraste AA)
        rosaClaro: "#FBF2F6", // véu de rosa para fundos subtis
        cobaltoFundo: "#1B2150", // fundo escuro para secções de contraste
        nevoaRosa: "#F6EAF0", // tom rosado claro para fundos de secção
        nevoaAzul: "#ECF0F8", // tom azulado claro para fundos de secção
        papel: "#F6F4EE", // off-white — uso residual
        tinta: "#16161A", // texto corrente
        cinza: "#6B6B6B", // texto secundário
        // Cores por missão
        criacao: "#C25C84", // rosa da obra — missão Apoio à Criação
        expositiva: "#232A5E", // cobalto — missão Programação Expositiva
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      maxWidth: {
        prosa: "68ch",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "azulejo-in": {
          "0%": { opacity: "0", transform: "scale(0.82) rotate(var(--tile-rot, 0deg))" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
