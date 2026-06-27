import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LogoIntro({ onComplete }) {
  const [fase, setFase] = useState(0)
  const [mostrarPular, setMostrarPular] = useState(false)
  const jaViu = localStorage.getItem('datamt-intro-visto')

  useEffect(() => {
    if (jaViu) {
      setTimeout(onComplete, 800)
      return
    }

    const timers = [
      setTimeout(() => setFase(1), 500),
      setTimeout(() => setFase(2), 1200),
      setTimeout(() => setFase(3), 2000),
      setTimeout(() => setFase(4), 2500),
      setTimeout(() => {
        localStorage.setItem('datamt-intro-visto', '1')
        onComplete()
      }, 3500),
      setTimeout(() => setMostrarPular(true), 1000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  function pular() {
    localStorage.setItem('datamt-intro-visto', '1')
    onComplete()
  }

  if (jaViu) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-datamt-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/assets/datamt-logo-completa.svg"
          alt="DATA MT"
          className="h-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-datamt-bg overflow-hidden">
      {/* Fase 1→2: símbolo centralizado grande */}
      <AnimatePresence>
        {fase >= 1 && fase < 4 && (
          <motion.div
            key="centro"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Símbolo */}
            <motion.img
              src="/assets/datamt-simbolo.svg"
              alt="DATA MT símbolo"
              initial={{ opacity: 0, scale: 1.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-40 h-40 md:w-52 md:h-52"
            />

            {/* Título: DATA entra da esquerda, MT da direita */}
            {fase >= 2 && (
              <div className="flex items-center mt-6 overflow-hidden">
                <motion.img
                  src="/assets/datamt-titulo.svg"
                  alt="DATA MT"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-10 md:h-14"
                />
              </div>
            )}

            {/* Slogan */}
            {fase >= 3 && (
              <motion.img
                src="/assets/datamt-slogan.svg"
                alt="Comunidade Técnica de Dados"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-3 h-5 md:h-6 opacity-70"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fase 4: reposiciona para layout hero (esquerda + direita) */}
      <AnimatePresence>
        {fase >= 4 && (
          <motion.div
            key="hero-layout"
            className="flex items-center gap-6 px-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.img
              src="/assets/datamt-simbolo.svg"
              alt="DATA MT símbolo"
              className="w-24 h-24 md:w-32 md:h-32"
              initial={{ x: 40 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <div className="flex flex-col gap-2">
              <motion.img
                src="/assets/datamt-titulo.svg"
                alt="DATA MT"
                className="h-10 md:h-14"
                initial={{ x: -40 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
              <motion.img
                src="/assets/datamt-slogan.svg"
                alt="Comunidade Técnica de Dados"
                className="h-4 md:h-5 opacity-70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Pular */}
      <AnimatePresence>
        {mostrarPular && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={pular}
            className="absolute bottom-10 right-10 text-datamt-muted text-sm hover:text-white transition-colors px-4 py-2 border border-datamt-border rounded-lg hover:border-datamt-cyan"
          >
            Pular intro →
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
