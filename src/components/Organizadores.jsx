import { motion } from 'framer-motion'
import OrganizerCard from './OrganizerCard'

export default function Organizadores({ organizadores }) {
  if (!organizadores?.length) return null

  return (
    <section id="organizadores" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quem{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE, #7B2FFF)' }}
            >
              Organiza
            </span>
          </h2>
          <p className="text-datamt-muted max-w-xl mx-auto">
            As pessoas por trás da DATA MT.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizadores.map((org, i) => (
            <OrganizerCard key={org.id} org={org} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
