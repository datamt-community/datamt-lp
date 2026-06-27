import { useEffect, useState } from 'react'

export default function Navbar({ nav, site }) {
  const [noTopo, setNoTopo] = useState(true)

  useEffect(() => {
    function onScroll() {
      setNoTopo(window.scrollY < 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        noTopo
          ? 'bg-transparent'
          : 'bg-datamt-bg/80 backdrop-blur-md border-b border-datamt-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <img
            src="/assets/datamt-simbolo.svg"
            alt=""
            style={{ height: '52px', width: '52px', display: 'block' }}
            className="transition-opacity group-hover:opacity-80"
          />
          <img
            src="/assets/datamt-titulo.svg"
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
    </header>
  )
}
