"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/content/site";

/** Subscrição da newsletter — grava cada email numa Google Sheet via
 *  /api/newsletter (ver app/api/newsletter/route.ts). */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "a-enviar" | "enviado" | "erro">("idle");

  async function submeter(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEstado("a-enviar");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setEstado("enviado");
      setEmail("");
    } catch {
      setEstado("erro");
    }
  }

  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{newsletter.titulo}</h3>
      <p className="mt-2 max-w-prosa text-sm text-cinza">{newsletter.texto}</p>

      {estado === "enviado" ? (
        <p className="mt-4 font-sans text-sm font-medium text-criacao">
          Obrigado. Subscrição registada.
        </p>
      ) : (
        <form onSubmit={submeter} className="mt-4 flex max-w-md flex-col gap-2 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            {newsletter.placeholder}
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={newsletter.placeholder}
            className="w-full border border-cobalto/20 bg-white px-4 py-2.5 font-sans text-sm text-tinta outline-none transition-colors placeholder:text-cinza focus:border-ceramica"
          />
          <button
            type="submit"
            disabled={estado === "a-enviar"}
            className="shrink-0 bg-cobalto px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-ceramica disabled:opacity-60"
          >
            {estado === "a-enviar" ? "A enviar…" : newsletter.botao}
          </button>
        </form>
      )}

      {estado === "erro" && (
        <p className="mt-2 font-sans text-sm text-rosaEscuro">
          Não foi possível subscrever. Tenta novamente.
        </p>
      )}
    </div>
  );
}
