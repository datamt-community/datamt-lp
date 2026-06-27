import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import EventoCard from './EventoCard'
import EventoPassadoCard from './EventoPassadoCard'

export default function Eventos({ eventos, eventosPassados, progress }) {
  const hasUpcoming = eventos?.length > 0
  const hasPast = eventosPassados?.length > 0
  const stageRef = useRef(null)
  const { scrollYProgress: localProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end']
  })
  const stageProgress = progress ?? localProgress

  if (!hasUpcoming && !hasPast) return null

  // Slide horizontal: panel 1 → panel 2 entre progress 0.15 e 0.70
  const panelX = useTransform(stageProgress, [0.15, 0.70], ['0vw', '-100vw'])

  // Opacidade do hint "scroll →"
  const hintOpacity = useTransform(stageProgress, [0, 0.12, 0.40], [0, 1, 0])

  // Indicadores de progresso
  const dot1Width = useTransform(stageProgress, [0.10, 0.65], [40, 10])
  const dot2Width = useTransform(stageProgress, [0.10, 0.65], [10, 40])
  const dot2Opacity = useTransform(stageProgress, [0.10, 0.40], [0.3, 1])

  // Entrada do painel 2
  const panel2Opacity = useTransform(stageProgress, [0.50, 0.72], [0, 1])
  const panel2Y = useTransform(stageProgress, [0.50, 0.72], [20, 0])

  return (
    <div id="eventos" ref={stageRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full overflow-hidden">

          {/* Slider horizontal */}
          <motion.div
            className="flex h-full"
            style={{ x: panelX, width: '200vw' }}
          >
        {/* ── Panel 1: Próximos Eventos ── */}
        <div className="w-screen h-full flex flex-col justify-center px-6 pt-20 pb-10">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
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
            </motion.div>

            <div className="flex flex-col gap-4">
              {eventos.map((evento, i) => (
                <EventoCard key={evento.id} evento={evento} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel 2: Eventos Passados ── */}
        <div className="w-screen h-full flex flex-col justify-center px-6 pt-20 pb-10">
          <motion.div
            className="max-w-5xl mx-auto w-full"
            style={{ opacity: panel2Opacity, y: panel2Y }}
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
                A história da comunidade DATA MT em encontros e workshops.
              </p>
            </div>

            {hasPast ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {eventosPassados.map((evento, i) => (
                  <EventoPassadoCard key={evento.id} evento={evento} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-datamt-muted text-center py-16 border border-datamt-border rounded-2xl bg-datamt-surface/30">
                Em breve nossos eventos passados aparecerão aqui.
              </div>
            )}
          </motion.div>
        </div>
          </motion.div>

      {/* Hint "scroll →" aparece no panel 1 */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 text-datamt-muted"
            style={{ opacity: hintOpacity }}
          >
            <span className="text-xs tracking-widest uppercase">scroll</span>
            <motion.span
              className="text-datamt-cyan text-xl"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.div>

      {/* Indicadores de painel (bolinhas) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            <motion.div
              className="h-1 rounded-full bg-datamt-cyan"
              style={{ width: dot1Width }}
            />
            <motion.div
              className="h-1 rounded-full bg-datamt-cyan"
              style={{ width: dot2Width, opacity: dot2Opacity }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
