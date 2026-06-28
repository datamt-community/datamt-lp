import { useState } from 'react'
import { motion } from 'framer-motion'
import EventoCard from './EventoCard'

export default function EventosMobile({ eventos, eventosPassados }) {
  const hasUpcoming = eventos?.length > 0
  const hasPast = eventosPassados?.length > 0
  const [showPast, setShowPast] = useState(false)

  if (!hasUpcoming && !hasPast) return null

  return (
    <section id="eventos" className="relative px-4 pt-16 pb-10">
      <div className="max-w-5xl mx-auto">
        {hasUpcoming && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Próximos{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE, #7B2FFF)' }}
                >
                  Eventos
                </span>
              </h2>
              <p className="text-datamt-muted text-sm">Encontros, workshops e talks da DATA MT.</p>
            </div>

            <div className="space-y-3">
              {eventos.map((evento, index) => (
                <EventoCard key={evento.id} evento={evento} index={index} />
              ))}
            </div>

            {hasPast && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPast((prev) => !prev)}
                  className="px-5 py-2.5 rounded-xl font-semibold border border-datamt-cyan text-datamt-cyan active:scale-[0.98]"
                >
                  {showPast ? 'Ocultar eventos passados' : 'Ver eventos passados'}
                </button>
                <p className="text-datamt-muted text-xs text-center">No mobile usamos lista otimizada para rolagem suave.</p>
              </div>
            )}
          </motion.div>
        )}

        {hasPast && showPast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Eventos{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #7B2FFF, #00F2FE)' }}
                >
                  Passados
                </span>
              </h2>
              <p className="text-datamt-muted text-sm">Galeria e histórico da comunidade em formato leve para celular.</p>
            </div>

            <div className="space-y-4">
              {eventosPassados.map((evento, index) => (
                <EventoCard key={evento.id} evento={evento} index={index} isPast />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
