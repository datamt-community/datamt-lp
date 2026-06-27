import { motion, useTransform } from 'framer-motion'

const BACKGROUND_PATHS = [
  'M 80 120 C 230 30 420 40 560 130',
  'M 120 320 C 260 240 420 230 620 320',
  'M 40 520 C 260 430 470 460 720 580',
  'M 880 90 C 760 170 700 260 690 360',
  'M 1020 210 C 860 260 730 360 690 520',
  'M 930 640 C 800 560 660 530 510 560',
  'M 1120 440 C 920 410 760 450 620 560',
  'M 290 760 C 430 680 590 650 760 700',
  'M 50 760 C 240 720 380 680 470 590',
  'M 560 130 C 640 220 680 300 690 360',
  'M 620 320 C 690 350 740 420 760 510',
  'M 470 590 C 530 550 600 540 690 520'
]

const NODES = [
  { x: 80, y: 120 },
  { x: 560, y: 130 },
  { x: 620, y: 320 },
  { x: 720, y: 580 },
  { x: 470, y: 590 },
  { x: 760, y: 700 },
  { x: 930, y: 640 },
  { x: 1020, y: 210 },
  { x: 690, y: 360 },
  { x: 690, y: 520 }
]

const COLORS = ['#00F2FE', '#2D6BFF', '#7B2FFF', '#9B30FF']

function PathReveal({ progress, d, color, width, start, end }) {
  const lineProgress = useTransform(progress, [start, end], [0, 1], { clamp: true })

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      style={{
        pathLength: lineProgress,
        opacity: useTransform(lineProgress, [0, 0.02, 1], [0, 0.62, 0.85])
      }}
      filter="url(#globalGlow)"
    />
  )
}

function NodeReveal({ progress, node, at, color, radius }) {
  return (
    <motion.circle
      cx={node.x}
      cy={node.y}
      r={radius}
      fill="#070B14"
      stroke={color}
      strokeWidth="1.7"
      style={{
        opacity: useTransform(progress, [at - 0.05, at + 0.06], [0, 1]),
        scale: useTransform(progress, [at - 0.05, at, at + 0.08], [0.35, 1.35, 1])
      }}
      filter="url(#globalGlow)"
    />
  )
}

export default function BodyBrainLinesBackground({ progress }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <motion.svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{ opacity: useTransform(progress, [0, 0.15, 1], [0.14, 0.3, 0.52]) }}
      >
        <defs>
          <filter id="globalGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {BACKGROUND_PATHS.map((d, i) => {
          const count = BACKGROUND_PATHS.length
          const timelineStart = 0.02
          const timelineEnd = 0.98
          const slot = (timelineEnd - timelineStart) / count
          const start = timelineStart + i * slot
          const end = Math.min(1, start + slot)

          return (
            <PathReveal
              key={d}
              progress={progress}
              d={d}
              color={COLORS[i % COLORS.length]}
              width={i % 3 === 0 ? 2.4 : 1.8}
              start={start}
              end={end}
            />
          )
        })}

        {NODES.map((node, i) => {
          const total = NODES.length - 1
          const at = 0.16 + (i / total) * 0.82

          return (
            <NodeReveal
              key={`${node.x}-${node.y}`}
              progress={progress}
              node={node}
              at={at}
              color={COLORS[(i + 1) % COLORS.length]}
              radius={i % 4 === 0 ? 4.8 : 3.8}
            />
          )
        })}
      </motion.svg>
    </div>
  )
}
