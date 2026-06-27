import { motion } from 'framer-motion'

export default function Parceiros({ parceiros }) {
  if (!parceiros?.length) return null

  return (
    <section id="parceiros" className="py-24 px-6 bg-datamt-surface/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nossos{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE, #7B2FFF)' }}
            >
              Parceiros
            </span>
          </h2>
          <p className="text-datamt-muted max-w-xl mx-auto">
            Empresas e instituições que apoiam a comunidade DATA MT.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {parceiros.map((parceiro, i) => (
            <motion.a
              key={parceiro.id}
              href={parceiro.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center justify-center p-6 rounded-xl border border-datamt-border bg-datamt-surface opacity-50 hover:opacity-100 hover:border-datamt-cyan/40 transition-all duration-300 min-h-[100px]"
            >
              {parceiro.logo ? (
                <img
                  src={parceiro.logo}
                  alt={parceiro.nome}
                  className="max-h-12 max-w-full object-contain"
                />
              ) : (
                <span className="text-white font-semibold text-sm text-center">
                  {parceiro.nome}
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
