import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import EventoCard from './EventoCard'

function SpiralPastEventItem({ evento, index, totalPast, spiralProgress }) {
  const x = useTransform(spiralProgress, (p) => {
    const t = p * Math.max(1, totalPast - 1)
    const rel = index - t
    const angle = rel * 2.35
    const radius = Math.min(360, Math.abs(rel) * 165)
    return Math.cos(angle) * radius
  })

  const y = useTransform(spiralProgress, (p) => {
    const t = p * Math.max(1, totalPast - 1)
    const rel = index - t
    const vertical = rel * 265
    const spiralLift = Math.sin(rel * 2.35) * 46
    return vertical + spiralLift
  })

  const opacity = useTransform(spiralProgress, (p) => {
    const t = p * Math.max(1, totalPast - 1)
    const rel = index - t
    const distance = Math.abs(rel)

    // Incoming cards (rel > 0) stay fully hidden until current card passes center.
    if (rel > 0.999) return 0

    if (rel >= 0) {
      const incoming = 1 - rel * 1.25
      return Math.max(0, Math.min(1, incoming))
    }

    const outgoing = 1 - distance * 0.78
    return Math.max(0, Math.min(1, outgoing))
  })

  const scale = useTransform(spiralProgress, (p) => {
    const t = p * Math.max(1, totalPast - 1)
    const rel = Math.abs(index - t)
    return Math.max(0.76, 1 - rel * 0.16)
  })

  const rotate = useTransform(spiralProgress, (p) => {
    const t = p * Math.max(1, totalPast - 1)
    const rel = index - t
    return rel * 7.5
  })

  const zIndex = useTransform(spiralProgress, (p) => {
    const t = p * Math.max(1, totalPast - 1)
    const rel = Math.abs(index - t)
    return Math.round(1000 - rel * 100)
  })

  return (
    <motion.div
      style={{
        x,
        y,
        opacity,
        scale,
        rotate,
        zIndex,
        position: 'absolute',
        width: 'min(1080px, calc(100vw - 3rem))',
        willChange: 'transform, opacity'
      }}
    >
      <EventoCard evento={evento} index={index} isPast />
    </motion.div>
  )
}

function SpiralPastTimeline({ eventosPassados }) {
  const spiralRef = useRef(null)
  const totalPast = eventosPassados?.length ?? 0
  const { scrollYProgress: spiralProgress } = useScroll({
    target: spiralRef,
    offset: ['start start', 'end end']
  })

  function jumpToFirst() {
    if (!spiralRef.current) return
    const top = spiralRef.current.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function jumpToLast() {
    if (!spiralRef.current) return
    const sectionTop = spiralRef.current.getBoundingClientRect().top + window.scrollY
    const maxTop = sectionTop + spiralRef.current.offsetHeight - window.innerHeight
    window.scrollTo({ top: maxTop, behavior: 'smooth' })
  }

  return (
    <div ref={spiralRef} className="relative" style={{ height: `${Math.max(260, totalPast * 120)}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute right-3 top-1/2 z-30 -translate-y-1/2 flex flex-col gap-2">
          <button
            type="button"
            onClick={jumpToFirst}
            className="rounded-lg border border-datamt-cyan/80 bg-datamt-bg/80 px-3 py-2 text-xs font-semibold text-datamt-cyan backdrop-blur-sm hover:bg-datamt-cyan hover:text-datamt-bg transition-all"
          >
            Primeiro
          </button>
          <button
            type="button"
            onClick={jumpToLast}
            className="rounded-lg border border-datamt-cyan/80 bg-datamt-bg/80 px-3 py-2 text-xs font-semibold text-datamt-cyan backdrop-blur-sm hover:bg-datamt-cyan hover:text-datamt-bg transition-all"
          >
            Último
          </button>
        </div>

        <div className="relative h-full w-full flex items-center justify-center">
          {eventosPassados.map((evento, i) => (
            <SpiralPastEventItem
              key={evento.id}
              evento={evento}
              index={i}
              totalPast={totalPast}
              spiralProgress={spiralProgress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Eventos({ eventos, eventosPassados }) {
  const hasUpcoming = eventos?.length > 0
  const hasPast = eventosPassados?.length > 0
  const [showPast, setShowPast] = useState(false)
  const upcomingRef = useRef(null)
  const pastSectionRef = useRef(null)

  if (!hasUpcoming && !hasPast) return null

  function openPastEvents() {
    setShowPast(true)
    requestAnimationFrame(() => {
      pastSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  function hidePastEvents() {
    setShowPast(false)
    requestAnimationFrame(() => {
      if (hasUpcoming) {
        upcomingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  return (
    <section id="eventos" className="relative px-6 pt-20 pb-12">
      <div className="max-w-5xl mx-auto">
        {hasUpcoming ? (
          <motion.div
            ref={upcomingRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Próximos{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #00F2FE, #7B2FFF)' }}
                >
                  Eventos
                </span>
              </h2>
              <p className="text-datamt-muted">
                Meetups, workshops e conferências da comunidade DATA MT.
              </p>
            </div>

            <div className="divide-y divide-datamt-border/70 border-y border-datamt-border/70">
              {eventos.map((evento, i) => (
                <EventoCard key={evento.id} evento={evento} index={i} />
              ))}
            </div>

            {hasPast && !showPast && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45 }}
                className="mt-10 flex flex-col items-center gap-3"
              >
                <button
                  type="button"
                  onClick={openPastEvents}
                  className="px-6 py-3 rounded-xl font-semibold border border-datamt-cyan text-datamt-cyan hover:bg-datamt-cyan hover:text-datamt-bg transition-all duration-200"
                >
                  Ver eventos passados
                </button>
                <p className="text-datamt-muted text-sm text-center">
                  Abra a timeline animada com os encontros já realizados.
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : null}

        {hasPast && showPast && (
          <motion.div
            ref={pastSectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-16"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Eventos{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #7B2FFF, #00F2FE)' }}
                >
                  Passados
                </span>
              </h2>
              <p className="text-datamt-muted">
                Role para ver um evento por vez subindo em movimento espiral.
              </p>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={hidePastEvents}
                className="px-4 py-2 rounded-lg border border-slate-300/30 text-slate-200 hover:border-slate-200/60 hover:bg-white/5 transition-all"
              >
                Ocultar eventos passados
              </button>
              <span className="text-datamt-muted text-sm">
                Use os botões laterais Primeiro/Último para navegar na timeline.
              </span>
            </div>

            <div className="relative left-1/2 w-screen -translate-x-1/2">
              <SpiralPastTimeline eventosPassados={eventosPassados} />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
