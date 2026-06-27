import { motion } from 'framer-motion'
import PilarCard from './PilarCard'

export default function Pilares({ pilares }) {
  if (!pilares?.length) return null

  return (
    <section id="pilares" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Os{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE, #7B2FFF)' }}
            >
              7 Pilares
            </span>
          </h2>
          <p className="text-datamt-muted max-w-xl mx-auto">
            Os temas que guiam nossa comunidade e os eventos que organizamos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pilares.map((pilar, i) => (
            <PilarCard key={pilar.id} pilar={pilar} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
