import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

export default function EventoCard({ evento, index, isPast = false }) {
  const photos = useMemo(() => evento.fotos ?? [], [evento.fotos])
  const [photoIndex, setPhotoIndex] = useState(0)
  const hasPhotos = isPast && photos.length > 0

  function prevPhoto() {
    setPhotoIndex((current) => (current - 1 + photos.length) % photos.length)
  }

  function nextPhoto() {
    setPhotoIndex((current) => (current + 1) % photos.length)
  }

  if (isPast) {
    return (
      <motion.article
        className="grid grid-rows-[1fr_2fr] h-[82vh] md:h-[84vh] lg:h-[86vh] min-h-[560px] max-h-[900px] overflow-hidden rounded-2xl border border-datamt-border bg-datamt-surface shadow-[0_24px_80px_rgba(2,6,23,0.42)]"
      >
        <div className="p-6 md:p-8 lg:p-10 border-b border-datamt-border/80 bg-datamt-surface/85 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-2 text-datamt-cyan text-sm font-semibold">
              <Calendar size={16} className="flex-shrink-0" />
              {evento.dataFormatada}
            </span>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-datamt-purple/40 text-datamt-purple/90 bg-datamt-bg">
              Evento realizado
            </span>
          </div>

          <h3 className="text-white font-semibold text-2xl md:text-3xl leading-tight mb-3">
            {evento.titulo}
          </h3>

          <p className="text-slate-200/90 text-base md:text-lg leading-relaxed mb-4">
            {evento.descricao}
          </p>

          <div className="flex items-center gap-2 text-datamt-muted text-sm md:text-base mb-4">
            <MapPin size={16} className="text-datamt-cyan flex-shrink-0" />
            {evento.local}
          </div>

          <div className="flex flex-wrap gap-2">
            {evento.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border border-datamt-cyan/40 bg-datamt-bg text-datamt-cyan"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative h-full min-h-[280px] bg-datamt-bg">
          {hasPhotos ? (
            <>
              <img
                src={photos[photoIndex]}
                alt={`${evento.titulo} - foto ${photoIndex + 1}`}
                className="h-full w-full object-cover"
              />

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white hover:bg-black/65 transition-colors"
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white hover:bg-black/65 transition-colors"
                    aria-label="Próxima foto"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {photos.map((_, i) => (
                      <button
                        key={`${evento.id}-photo-${i}`}
                        type="button"
                        onClick={() => setPhotoIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === photoIndex ? 'w-6 bg-white' : 'w-2 bg-white/45'}`}
                        aria-label={`Ir para foto ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="h-full w-full text-datamt-muted text-sm flex items-center justify-center">
              Fotos em breve
            </div>
          )}
        </div>
      </motion.article>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="py-6 md:py-7"
    >
      <div className="grid gap-6 md:grid-cols-[150px_1fr] rounded-xl border border-datamt-border/80 bg-datamt-surface/92 px-4 py-5 md:px-6 md:py-6 backdrop-blur-sm">
        <div className="flex items-start gap-2 text-datamt-cyan text-sm font-semibold">
          <Calendar size={16} className="mt-0.5 flex-shrink-0" />
          <span>{evento.dataFormatada}</span>
        </div>

        <div>
          <h3 className="text-white font-semibold text-xl mb-2 leading-tight">
            {evento.titulo}
          </h3>
          <p className="text-datamt-muted text-sm leading-relaxed mb-4">{evento.descricao}</p>

          <div className="flex items-center gap-2 text-datamt-muted text-sm mb-4">
            <MapPin size={14} className="text-datamt-cyan flex-shrink-0" />
            {evento.local}
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {evento.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-0.5 rounded-full text-xs font-medium border border-datamt-cyan/40 bg-datamt-bg text-datamt-cyan"
              >
                {tag}
              </span>
            ))}
          </div>

          {!isPast ? (
            <a
              href={evento.linkInscricao}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-datamt-cyan text-datamt-cyan hover:bg-datamt-cyan hover:text-datamt-bg transition-all duration-200"
            >
              Inscrever-se
              <ExternalLink size={14} />
            </a>
          ) : (
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-datamt-purple/40 text-datamt-purple/90 bg-datamt-bg">
              Evento realizado
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
