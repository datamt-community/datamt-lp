import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import assetUrl from '../assetUrl'

export default function Navbar({ nav, site }) {
  const [noTopo, setNoTopo] = useState(true)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    function onScroll() {
      setNoTopo(window.scrollY < 20)
      if (menuAberto) setMenuAberto(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuAberto])

  function fecharMenu() {
    setMenuAberto(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        noTopo && !menuAberto
          ? 'bg-transparent'
          : 'bg-datamt-bg/95 backdrop-blur-md border-b border-datamt-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2" onClick={fecharMenu}>
          <img
            src={assetUrl('/assets/datamt-simbolo.svg')}
            alt=""
            style={{ height: '52px', width: '52px', display: 'block' }}
            className="transition-opacity group-hover:opacity-80"
          />
          <img
            src={assetUrl('/assets/datamt-titulo.svg')}
            alt="DATA MT"
            style={{ height: '34px', width: 'auto' }}
            className="transition-opacity group-hover:opacity-80"
          />
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

        {/* CTA desktop */}
        <a
          href="#eventos"
          className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold rounded-lg border border-datamt-cyan text-datamt-cyan hover:bg-datamt-cyan hover:text-datamt-bg transition-all duration-200"
        >
          Participar
        </a>

        {/* Botão hamburger / fechar */}
        <button
          className="md:hidden text-datamt-muted hover:text-white transition-colors"
          onClick={() => setMenuAberto((v) => !v)}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuAberto ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuAberto && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-datamt-border bg-datamt-bg/95 backdrop-blur-md"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={fecharMenu}
                  className="py-3 text-base text-datamt-muted hover:text-white border-b border-datamt-border/40 last:border-0 transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#eventos"
                onClick={fecharMenu}
                className="mt-3 flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-lg border border-datamt-cyan text-datamt-cyan hover:bg-datamt-cyan hover:text-datamt-bg transition-all duration-200"
              >
                Participar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
