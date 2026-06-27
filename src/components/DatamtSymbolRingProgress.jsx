import { motion, useTransform } from 'framer-motion'
import assetUrl from '../assetUrl'

const RING_PATHS = [
  { d: 'M 295.46,104.54 A 135,135 0 0,1 333.99,183.55', color: '#00F2FE', start: 0.1, end: 0.28 },
  { d: 'M 335.0,200.0 A 135,135 0 0,1 306.38,283.11', color: '#4FACFE', start: 0.18, end: 0.36 },
  { d: 'M 295.46,295.46 A 135,135 0 0,1 216.45,333.99', color: '#2D6BFF', start: 0.26, end: 0.44 },
  { d: 'M 200.0,335.0 A 135,135 0 0,1 135.58,318.64 L 140.79,300.91 L 127.86,314.11 A 135,135 0 0,1 116.89,306.38', color: '#5B4FE8', start: 0.34, end: 0.58 },
  { d: 'M 104.54,295.46 A 135,135 0 0,1 66.01,216.45', color: '#7B2FFF', start: 0.46, end: 0.66 },
  { d: 'M 65.0,200.0 A 135,135 0 0,1 93.62,116.89', color: '#6A1FDD', start: 0.58, end: 0.8 },
  { d: 'M 200.0,65.0 A 135,135 0 0,1 283.1,93.6', color: '#4A1FA8', start: 0.7, end: 0.95 }
]

function RingStroke({ progress, d, color, start, end, strokeWidth }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        pathLength: useTransform(progress, [start, end], [0, 1]),
        opacity: useTransform(progress, [start - 0.04, end], [0, 1])
      }}
    />
  )
}

function RingHideStroke({ d }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#070B14"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

export default function DatamtSymbolRingProgress({ progress, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <img src={assetUrl('/assets/datamt-simbolo.svg')} alt="DATA MT símbolo" className="h-full w-full" />

      <svg
        aria-hidden="true"
        viewBox="50 50 300 300"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="matrix(0.940956,0,0,0.941408,11.654505,10.84766)">
          {RING_PATHS.map((ring) => (
            <RingHideStroke key={`erase-${ring.d}`} d={ring.d} />
          ))}

          {RING_PATHS.map((ring) => (
            <RingStroke
              key={ring.d}
              progress={progress}
              d={ring.d}
              color={ring.color}
              start={ring.start}
              end={ring.end}
              strokeWidth={6}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
