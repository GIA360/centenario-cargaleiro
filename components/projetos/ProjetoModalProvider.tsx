"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { Projeto } from "@/content/projetos";
import { ProjetoModal } from "./ProjetoModal";

interface Ctx {
  abrir: (projeto: Projeto) => void;
}

const ProjetoModalCtx = createContext<Ctx>({ abrir: () => {} });

export function useProjetoModal() {
  return useContext(ProjetoModalCtx);
}

export function ProjetoModalProvider({ children }: { children: ReactNode }) {
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const abrir = useCallback((p: Projeto) => setProjeto(p), []);

  return (
    <ProjetoModalCtx.Provider value={{ abrir }}>
      {children}
      <ProjetoModal projeto={projeto} onFechar={() => setProjeto(null)} />
    </ProjetoModalCtx.Provider>
  );
}
