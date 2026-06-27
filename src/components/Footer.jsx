import { AtSign, Link, Play, Camera } from 'lucide-react'
import assetUrl from '../assetUrl'

const iconesSocial = {
  linkedin:  AtSign,
  github:    Link,
  youtube:   Play,
  instagram: Camera,
}

export default function Footer({ site, nav, social }) {
  return (
    <footer className="border-t border-datamt-border bg-datamt-bg">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-3 max-w-xs">
          <img src={assetUrl('/assets/datamt-logo-titulo.svg')} alt="DATA MT" className="h-32 w-auto" />
          <p className="text-datamt-muted text-sm leading-relaxed text-center md:text-left">
            {site.taglineFooter}
          </p>
        </div>

        {/* Links de navegação */}
        <nav className="flex flex-col items-center md:items-start gap-3">
          <span className="text-white text-sm font-semibold mb-1">Navegação</span>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-datamt-muted text-sm hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Redes sociais */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="text-white text-sm font-semibold mb-1">Comunidade</span>
          <div className="flex items-center gap-4">
            {social.map((item) => {
              const Icone = iconesSocial[item.icone]
              if (!Icone) return null
              return (
                <a
                  key={item.rede}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.rede}
                  className="text-datamt-muted hover:text-datamt-cyan transition-colors"
                >
                  <Icone size={20} />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-datamt-border py-4 text-center text-datamt-muted text-xs">
        © {new Date().getFullYear()} {site.nome} · {site.subtitulo}
      </div>
    </footer>
  )
}
