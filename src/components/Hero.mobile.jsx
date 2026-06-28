import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroMobile({ hero, progress }) {
  const { scrollYProgress: pageScrollYProgress } = useScroll()
  const fallbackProgress = useTransform(pageScrollYProgress, [0, 0.28], [0, 1], { clamp: true })
  const scrollYProgress = progress ?? fallbackProgress

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -28])
  const titleOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const manifestoOpacity = useTransform(scrollYProgress, [0.08, 0.26], [0, 1])
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section
      id="sobre"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(70% 45% at 50% 20%, rgba(0,242,254,0.12) 0%, transparent 72%), radial-gradient(62% 42% at 50% 78%, rgba(123,47,255,0.12) 0%, transparent 78%)'
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #1E293B 1px, transparent 1px)',
          backgroundSize: '34px 34px'
        }}
      />

      <motion.div className="relative z-10 w-full px-5 text-center pb-16 pt-28" style={{ opacity: heroOpacity }}>
        <motion.h1
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5"
        >
          {hero.titulo.split('\n').map((linha, i) => (
            <span key={i} className="block">
              {i === 0 ? (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE 0%, #7B2FFF 100%)' }}
                >
                  {linha}
                </span>
              ) : (
                <span className="text-white">{linha}</span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p className="text-base text-datamt-muted mb-6" style={{ opacity: manifestoOpacity }}>
          {hero.manifesto}
        </motion.p>

        <p className="text-base text-datamt-muted max-w-xl mx-auto mb-8">{hero.subtitulo}</p>

        <div className="flex flex-col items-center gap-3 mb-10">
          {hero.ctas.map((cta) =>
            cta.variante === 'primario' ? (
              <a
                key={cta.href}
                href={cta.href}
                className="w-full max-w-xs px-6 py-3 rounded-xl font-semibold text-datamt-bg"
                style={{ background: 'linear-gradient(90deg, #00F2FE, #2D6BFF)' }}
              >
                {cta.label}
              </a>
            ) : (
              <a
                key={cta.href}
                href={cta.href}
                className="w-full max-w-xs px-6 py-3 rounded-xl font-semibold border border-slate-300/35 bg-datamt-bg/75 text-white"
              >
                {cta.label}
              </a>
            )
          )}
        </div>

        <div className="mx-auto h-28 w-28 opacity-90">
          <img src="/assets/datamt-simbolo.svg" alt="DATA MT símbolo" className="h-full w-full" loading="lazy" />
        </div>
      </motion.div>
    </section>
  )
}
