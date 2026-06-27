import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'

export default function EventoCard({ evento, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="flex flex-col md:flex-row gap-0 rounded-2xl border border-datamt-border bg-datamt-surface overflow-hidden hover:border-datamt-cyan/40 transition-colors duration-300 group"
    >
      {/* Coluna da data */}
      <div className="md:w-36 flex-shrink-0 flex flex-col items-center justify-center p-6 bg-datamt-bg border-b md:border-b-0 md:border-r border-datamt-border">
        <Calendar size={18} className="text-datamt-cyan mb-2" />
        <span className="text-datamt-cyan font-bold text-lg leading-tight text-center">
          {evento.dataFormatada}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 flex flex-col justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-datamt-cyan transition-colors duration-200">
            {evento.titulo}
          </h3>
          <p className="text-datamt-muted text-sm leading-relaxed mb-4">{evento.descricao}</p>

          <div className="flex items-center gap-2 text-datamt-muted text-sm mb-4">
            <MapPin size={14} className="text-datamt-cyan flex-shrink-0" />
            {evento.local}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {evento.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-0.5 rounded-full text-xs font-medium border border-datamt-cyan/40 bg-datamt-bg text-datamt-cyan"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={evento.linkInscricao}
          className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-datamt-cyan text-datamt-cyan hover:bg-datamt-cyan hover:text-datamt-bg transition-all duration-200"
        >
          Inscrever-se
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  )
}
