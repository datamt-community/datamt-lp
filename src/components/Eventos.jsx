import { motion } from 'framer-motion'
import EventoCard from './EventoCard'

export default function Eventos({ eventos }) {
  if (!eventos?.length) return null

  return (
    <section id="eventos" className="py-24 px-6 bg-datamt-surface/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Próximos{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE, #7B2FFF)' }}
            >
              Eventos
            </span>
          </h2>
          <p className="text-datamt-muted max-w-xl mx-auto">
            Meetups, workshops e conferências da comunidade DATA MT.
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {eventos.map((evento, i) => (
            <EventoCard key={evento.id} evento={evento} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
