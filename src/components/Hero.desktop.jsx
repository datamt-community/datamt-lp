import { useRef } from 'react'
import { motion, useTransform, useMotionValue, useSpring, useScroll } from 'framer-motion'
import ScrollBrainBackground from './ScrollBrainBackground'
import DatamtSymbolRingProgress from './DatamtSymbolRingProgress'

function ScrollWord({ word, index, total, progress }) {
  const start = 0.2 + (index / total) * 0.58
  const end = start + 0.1
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [10, 0])

  return (
    <motion.span style={{ opacity, y }} className="inline-block mr-1.5 mb-1">
      {word}
    </motion.span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.15 }
  })
}

export default function HeroDesktop({ hero, progress }) {
  const sectionRef = useRef(null)
  const { scrollYProgress: pageScrollYProgress } = useScroll()
  const fallbackProgress = useTransform(pageScrollYProgress, [0, 0.35], [0, 1], { clamp: true })
  const scrollYProgress = progress ?? fallbackProgress
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 })

  const rawX = useMotionValue(-9999)
  const rawY = useMotionValue(-9999)
  const glowX = useSpring(rawX, { stiffness: 80, damping: 20 })
  const glowY = useSpring(rawY, { stiffness: 80, damping: 20 })

  function onMouseMove(e) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(e.clientX - rect.left)
    rawY.set(e.clientY - rect.top)
  }

  function onMouseLeave() {
    rawX.set(-9999)
    rawY.set(-9999)
  }

  const titleY = useTransform(smoothScrollYProgress, [0, 1], [0, -70])
  const titleOpacity = useTransform(smoothScrollYProgress, [0, 1], [1, 0.72])
  const manifestoGlow = useTransform(smoothScrollYProgress, [0.22, 0.93], [0.1, 1])
  const manifestoOpacity = useTransform(smoothScrollYProgress, [0.12, 0.22], [0, 1])
  const manifestoWords = (hero.manifesto ?? '').split(' ')

  const manifestoLift = useTransform(smoothScrollYProgress, [0, 1], [0, -16])
  const logoOpacity = useTransform(smoothScrollYProgress, [0.03, 0.2], [0.4, 1])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,242,254,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(123,47,255,0.08) 0%, transparent 50%)
        `,
      }}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-10"
        style={{
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,200,255,0.13) 0%, rgba(45,107,255,0.07) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: 'conic-gradient(from 120deg, rgba(0,242,254,0.34), rgba(45,107,255,0.24), rgba(123,47,255,0.34), rgba(0,242,254,0.34))'
        }}
        animate={{ rotate: [0, 360], scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -top-20 left-8 h-48 w-48 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(0,242,254,0.55), rgba(0,242,254,0.04))' }}
        animate={{ x: [0, 32, -20, 0], y: [0, 24, -16, 0], scale: [1, 1.18, 0.9, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute top-12 right-8 h-52 w-52 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(123,47,255,0.5), rgba(123,47,255,0.03))' }}
        animate={{ x: [0, -24, 18, 0], y: [0, -22, 10, 0], scale: [1, 0.86, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <ScrollBrainBackground progress={scrollYProgress} />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, #1E293B 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16"
      >
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          {hero.titulo.split('\n').map((linha, i) => (
            <span key={i}>
              {i === 0 ? (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE 0%, #7B2FFF 100%)' }}
                >
                  {linha}
                </span>
              ) : (
                <span className="block text-white">{linha}</span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="mb-8"
          style={{ y: manifestoLift, opacity: manifestoOpacity }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-datamt-border bg-datamt-surface text-datamt-muted text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-datamt-cyan animate-pulse" />
            Manifesto DATA MT
          </div>

          <motion.p
            className="mx-auto max-w-3xl text-base md:text-lg leading-relaxed text-slate-200"
            style={{
              textShadow: '0 0 18px rgba(0, 242, 254, 0.2)'
            }}
          >
            {manifestoWords.map((word, index) => (
              <ScrollWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={manifestoWords.length}
                progress={smoothScrollYProgress}
              />
            ))}
          </motion.p>

          <motion.div
            aria-hidden="true"
            className="mx-auto mt-3 h-0.5 w-52 rounded-full"
            style={{
              opacity: manifestoGlow,
              background: 'linear-gradient(90deg, rgba(0,242,254,0), rgba(0,242,254,0.95), rgba(123,47,255,0.9), rgba(0,242,254,0))'
            }}
          />
        </motion.div>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl text-datamt-muted max-w-2xl mx-auto mb-10"
        >
          {hero.subtitulo}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {hero.ctas.map((cta) =>
            cta.variante === 'primario' ? (
              <a
                key={cta.href}
                href={cta.href}
                className="px-8 py-3.5 rounded-xl font-semibold text-datamt-bg transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ background: 'linear-gradient(90deg, #00F2FE, #2D6BFF)' }}
              >
                {cta.label}
              </a>
            ) : (
              <a
                key={cta.href}
                href={cta.href}
                className="px-8 py-3.5 rounded-xl font-semibold border border-slate-200/35 bg-datamt-bg/75 backdrop-blur-sm text-white shadow-[0_6px_24px_rgba(7,11,20,0.45)] hover:border-datamt-cyan hover:text-datamt-cyan hover:bg-datamt-bg/85 transition-all duration-200"
              >
                {cta.label}
              </a>
            )
          )}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-4 left-1/2 z-0 h-48 w-48 -translate-x-1/2 md:bottom-7 md:h-56 md:w-56"
        style={{ opacity: logoOpacity }}
      >
        <DatamtSymbolRingProgress progress={scrollYProgress} className="h-full w-full" />
      </motion.div>
    </section>
  )
}
