import { motion } from 'framer-motion'
import { Database, Brain, ScatterChart, BarChart3, Cloud, Shield, Users } from 'lucide-react'

const icones = {
  database:      Database,
  brain:         Brain,
  'chart-scatter': ScatterChart,
  'chart-bar':   BarChart3,
  cloud:         Cloud,
  shield:        Shield,
  users:         Users,
}

export default function PilarCard({ pilar, index }) {
  const Icone = icones[pilar.icone] ?? Database

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-datamt-border bg-datamt-surface transition-all duration-300"
      style={{ '--glow': '0 0 0px #00F2FE33' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px #00F2FE33'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-datamt-bg border border-datamt-border group-hover:border-datamt-cyan/40 transition-colors duration-300">
        <Icone size={22} className="text-datamt-cyan" />
      </div>
      <h3 className="font-semibold text-white text-base">{pilar.titulo}</h3>
      <p className="text-datamt-muted text-sm leading-relaxed">{pilar.descricao}</p>
    </motion.div>
  )
}
