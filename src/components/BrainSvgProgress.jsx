import { motion, useTransform } from 'framer-motion'

const CORE_PATHS = [
  { d: 'M 177 201 L 165 152 L 127 114 L 89 130 L 51 140', stroke: 'url(#edgeMain)', width: 2.5, start: 0.08, end: 0.3 },
  { d: 'M 165 152 L 178 101 L 140 62 L 101 75 L 76 62', stroke: '#9B30FF', width: 2.5, start: 0.13, end: 0.36 },
  { d: 'M 127 114 L 178 101', stroke: '#9B30FF', width: 2, start: 0.19, end: 0.4 },
  { d: 'M 89 178 L 127 114', stroke: '#2D6BFF', width: 2, start: 0.24, end: 0.46 },
  { d: 'M 127 166 L 165 152', stroke: '#2D6BFF', width: 2, start: 0.3, end: 0.52 },
  { d: 'M 209 166 L 178 101', stroke: '#9B30FF', width: 2, start: 0.35, end: 0.58 },
  { d: 'M 222 114 L 178 101', stroke: '#9B30FF', width: 2, start: 0.39, end: 0.65 }
]

const OUTER_PATH = 'M 155 201 L 127 166 L 89 178 L 57 166 L 38 116 L 76 62 L 127 46 L 152 55 L 190 70 L 222 114 L 209 166 L 177 201'

const CORE_NODES = [
  { cx: 38, cy: 116, r: 5, stroke: '#00F2FE', fill: '#070B14', at: 0.18 },
  { cx: 76, cy: 62, r: 6, stroke: '#00F2FE', fill: '#070B14', at: 0.22 },
  { cx: 127, cy: 46, r: 5, stroke: '#00F2FE', fill: '#070B14', at: 0.26 },
  { cx: 190, cy: 70, r: 6.5, stroke: '#00F2FE', fill: '#070B14', at: 0.31 },
  { cx: 222, cy: 114, r: 5.5, stroke: '#00F2FE', fill: '#070B14', at: 0.36 },
  { cx: 209, cy: 166, r: 5, stroke: '#00F2FE', fill: '#070B14', at: 0.42 },
  { cx: 57, cy: 166, r: 5, stroke: '#00F2FE', fill: '#070B14', at: 0.47 },
  { cx: 89, cy: 130, r: 6, stroke: '#9B30FF', fill: '#070B14', at: 0.52 },
  { cx: 178, cy: 101, r: 6.5, stroke: '#9B30FF', fill: '#070B14', at: 0.56 },
  { cx: 165, cy: 152, r: 6.5, stroke: '#2D6BFF', fill: '#070B14', at: 0.61 },
  { cx: 127, cy: 114, r: 5.5, stroke: '#9B30FF', fill: '#070B14', at: 0.66 },
  { cx: 89, cy: 178, r: 5, stroke: '#2D6BFF', fill: '#070B14', at: 0.71 },
  { cx: 140, cy: 62, r: 5, stroke: '#9B30FF', fill: '#070B14', at: 0.76 }
]

function RevealPath({ progress, start, end, d, stroke, width, glow = false }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        pathLength: useTransform(progress, [start, end], [0, 1]),
        opacity: useTransform(progress, [start - 0.05, end], [0, 1])
      }}
      filter={glow ? 'url(#softGlow)' : undefined}
    />
  )
}

function RevealNode({ progress, node }) {
  return (
    <motion.circle
      cx={node.cx}
      cy={node.cy}
      r={node.r}
      fill={node.fill}
      stroke={node.stroke}
      strokeWidth="1.8"
      style={{
        opacity: useTransform(progress, [node.at - 0.06, node.at + 0.04], [0, 1]),
        scale: useTransform(progress, [node.at - 0.06, node.at, node.at + 0.07], [0.3, 1.25, 1]),
        transformOrigin: `${node.cx}px ${node.cy}px`
      }}
      filter="url(#nodeGlow)"
    />
  )
}

export default function BrainSvgProgress({ progress, showRing = false, className = '', ringStart = 0.04, ringEnd = 0.93 }) {
  return (
    <motion.svg viewBox="0 0 260 240" className={className} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="edgeMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F2FE" />
          <stop offset="100%" stopColor="#4A1FA8" />
        </linearGradient>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {showRing && (
        <>
          <circle cx="130" cy="123" r="98" fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="4" />
          <motion.circle
            cx="130"
            cy="123"
            r="98"
            fill="none"
            stroke="url(#edgeMain)"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              pathLength: useTransform(progress, [ringStart, ringEnd], [0, 1]),
              opacity: useTransform(progress, [ringStart - 0.03, ringEnd], [0, 1])
            }}
            transform="rotate(-90 130 123)"
            filter="url(#softGlow)"
          />
        </>
      )}

      <g>
        {CORE_PATHS.map((path) => (
          <RevealPath
            key={path.d}
            progress={progress}
            start={path.start}
            end={path.end}
            d={path.d}
            stroke={path.stroke}
            width={path.width}
          />
        ))}

        <RevealPath
          progress={progress}
          start={0.06}
          end={0.78}
          d={OUTER_PATH}
          stroke="url(#edgeMain)"
          width={3.5}
          glow
        />

        {CORE_NODES.map((node) => (
          <RevealNode key={`${node.cx}-${node.cy}`} progress={progress} node={node} />
        ))}

        <motion.circle
          cx="127"
          cy="114"
          r="10"
          fill="#070B14"
          stroke="#6A1FDD"
          strokeWidth="2.5"
          style={{ opacity: useTransform(progress, [0.58, 0.86], [0, 1]) }}
          filter="url(#nodeGlow)"
        />
        <motion.circle
          cx="127"
          cy="114"
          r="6"
          fill="#FFFFFF"
          style={{ opacity: useTransform(progress, [0.66, 0.9], [0, 0.9]) }}
          filter="url(#nodeGlow)"
        />
      </g>
    </motion.svg>
  )
}
