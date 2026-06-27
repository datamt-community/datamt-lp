import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ nav, site }) {
  const [visivel, setVisivel] = useState(true)
  const [noTopo, setNoTopo] = useState(true)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setNoTopo(y < 20)
      setVisivel(y < lastY || y < 80)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <AnimatePresence>
      {visivel && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
            noTopo
              ? 'bg-transparent'
              : 'bg-datamt-bg/80 backdrop-blur-md border-b border-datamt-border'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <img
                src="/assets/datamt-simbolo.svg"
                alt="DATA MT"
                className="h-8 w-8 transition-transform group-hover:scale-110"
              />
              <span className="font-bold text-white tracking-wide">{site.nome}</span>
            </a>

            {/* Links desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-datamt-muted hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="#eventos"
              className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold rounded-lg border border-datamt-cyan text-datamt-cyan hover:bg-datamt-cyan hover:text-datamt-bg transition-all duration-200"
            >
              Participar
            </a>

            {/* Mobile menu placeholder */}
            <button className="md:hidden text-datamt-muted hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
