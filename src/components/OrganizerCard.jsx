import { motion } from 'framer-motion'
import { AtSign, Link } from 'lucide-react'
import assetUrl from '../assetUrl'

function iniciais(nome) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('')
}

export default function OrganizerCard({ org, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-8 rounded-2xl border border-datamt-border bg-datamt-surface hover:border-datamt-cyan/40 transition-all duration-300 group"
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px #00F2FE22'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Foto ou iniciais */}
      {org.foto ? (
        <img
          src={assetUrl(org.foto)}
          alt={org.nome}
          className="w-20 h-20 rounded-full object-cover mb-5 border-2 border-datamt-border group-hover:border-datamt-cyan/60 transition-colors"
        />
      ) : (
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-5 border-2 border-datamt-border group-hover:border-datamt-cyan/60 transition-colors"
          style={{ background: 'linear-gradient(135deg, #2D6BFF, #7B2FFF)' }}
        >
          {iniciais(org.nome)}
        </div>
      )}

      <h3 className="font-semibold text-white text-base mb-1">{org.nome}</h3>
      <p className="text-datamt-muted text-sm mb-5">{org.cargo}</p>

      {/* Links sociais */}
      <div className="flex items-center gap-4">
        {org.linkedin && (
          <a
            href={org.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-datamt-muted hover:text-datamt-cyan transition-colors"
            aria-label="LinkedIn"
          >
            <AtSign size={18} />
          </a>
        )}
        {org.github && (
          <a
            href={org.github}
            target="_blank"
            rel="noreferrer"
            className="text-datamt-muted hover:text-datamt-cyan transition-colors"
            aria-label="GitHub"
          >
            <Link size={18} />
          </a>
        )}
      </div>
    </motion.div>
  )
}
