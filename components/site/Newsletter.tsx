"use client";

import { useState, type FormEvent } from "react";
import { newsletter } from "@/content/site";

/** Subscrição da newsletter. Sem backend nesta fase — valida e confirma
 *  no cliente; a integração de envio fica para ligar depois. */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function submeter(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setEnviado(true);
    setEmail("");
  }

  return (
    <div>
      <h3 className="font-display text-xl font-semibold">{newsletter.titulo}</h3>
      <p className="mt-2 max-w-prosa text-sm text-cinza">{newsletter.texto}</p>

      {enviado ? (
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
            className="shrink-0 bg-cobalto px-5 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-ceramica"
          >
            {newsletter.botao}
          </button>
        </form>
      )}
    </div>
  );
}
