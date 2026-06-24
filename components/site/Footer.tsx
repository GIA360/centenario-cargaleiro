import { contactos, fmc, site, rodapeLogos } from "@/content/site";
import { Newsletter } from "./Newsletter";
import { ManagedImage } from "@/components/ManagedImage";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer id="contactos" className="mt-24 border-t border-cobalto/10 bg-white">
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-lg font-bold text-cobalto">
            Centenário Manuel Cargaleiro · {site.marca}
          </p>
          <p className="mt-4 max-w-prosa text-sm leading-relaxed text-cinza">
            {fmc.referencia}
          </p>
          <a
            href={fmc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-cobalto underline-offset-4 transition-colors hover:text-rosaEscuro hover:underline"
          >
            {fmc.urlLabel}
            <span aria-hidden>↗</span>
          </a>
        </div>

        <div>
          <h3 className="eyebrow">Contactos</h3>
          <ul className="mt-4 space-y-2 text-sm text-cinza">
            <li>{contactos.instituicao}</li>
            {contactos.email && (
              <li>
                <a
                  href={`mailto:${contactos.email}`}
                  className="text-tinta transition-colors hover:text-rosaEscuro"
                >
                  {contactos.email}
                </a>
              </li>
            )}
            {contactos.morada && <li>{contactos.morada}</li>}
          </ul>
        </div>

        <Newsletter />
      </div>

      {/* Parceiros e Patrocínios */}
      <div className="border-t border-cobalto/10">
        <div className="shell space-y-10 py-12">
          {rodapeLogos
            .filter((grupo) => grupo.srcs.length > 0)
            .map((grupo) => (
              <div key={grupo.titulo}>
                <h3 className="eyebrow text-cobalto/70">{grupo.titulo}</h3>
                <ul className="mt-5 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                  {grupo.srcs.map((src, i) => (
                    <li key={src + i} className="flex items-center justify-center">
                      <ManagedImage
                        src={src}
                        ratio="5 / 2"
                        contain
                        sizes="160px"
                        className="w-full opacity-70 transition-opacity hover:opacity-100"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>

      <div className="border-t border-cobalto/10">
        <div className="shell flex flex-col items-start justify-between gap-2 py-6 text-xs text-cinza sm:flex-row sm:items-center">
          <p>
            © {ano} {fmc.nome}. {site.marca}.
          </p>
          <p>Comemorações do Centenário de Manuel Cargaleiro · 1927–2027</p>
        </div>
      </div>
    </footer>
  );
}
