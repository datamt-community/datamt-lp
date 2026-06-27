import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Images } from 'lucide-react'

export default function EventoPassadoCard({ evento, panelProgress, index }) {
  const [fotoAtual, setFotoAtual] = useState(0)
  const fotos = evento.fotos ?? []

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="rounded-2xl border border-datamt-border bg-datamt-surface overflow-hidden group hover:border-datamt-purple/50 transition-colors duration-300"
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(123,47,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Foto principal ou placeholder */}
      {fotos.length > 0 ? (
        <div className="relative h-40 overflow-hidden bg-datamt-bg">
          <img
            src={fotos[fotoAtual]}
            alt={evento.titulo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {fotos.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFotoAtual(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === fotoAtual ? 'bg-white w-3' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="h-32 flex flex-col items-center justify-center gap-2 bg-datamt-bg border-b border-datamt-border">
          <Images size={28} className="text-datamt-border" />
          <span className="text-datamt-border text-xs">Fotos em breve</span>
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-datamt-purple text-xs font-semibold mb-2">
          <Calendar size={12} />
          {evento.dataFormatada}
        </div>

        <h3 className="font-semibold text-white text-sm mb-2 leading-snug group-hover:text-datamt-purple transition-colors duration-200">
          {evento.titulo}
        </h3>

        <p className="text-datamt-muted text-xs leading-relaxed mb-3">{evento.descricao}</p>

        <div className="flex items-center gap-1.5 text-datamt-muted text-xs mb-3">
          <MapPin size={11} className="text-datamt-purple flex-shrink-0" />
          {evento.local}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {evento.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs border border-datamt-purple/30 bg-datamt-bg text-datamt-purple/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
