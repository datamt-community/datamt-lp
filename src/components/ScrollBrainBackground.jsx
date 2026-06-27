import { motion, useTransform } from 'framer-motion'
import BrainSvgProgress from './BrainSvgProgress'

export default function ScrollBrainBackground({ progress }) {
  const groupOpacity = useTransform(progress, [0, 1], [0.05, 0.2])
  const groupScale = useTransform(progress, [0, 1], [2.5, 3.2])
  const groupRotate = useTransform(progress, [0, 1], [-3, 4])
  const bgPulse = useTransform(progress, [0, 0.5, 1], [0.05, 0.1, 0.065])

  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 42%, rgba(0,242,254,0.12), rgba(7,11,20,0) 60%), radial-gradient(48% 40% at 52% 54%, rgba(123,47,255,0.1), rgba(7,11,20,0) 72%)',
          opacity: bgPulse
        }}
      />

      <motion.div className="absolute inset-0" style={{ opacity: groupOpacity }}>
        <motion.div
          className="absolute left-1/2 top-1/2 h-[58vh] w-[58vh] min-h-[320px] min-w-[320px] -translate-x-1/2 -translate-y-1/2"
          style={{ scale: groupScale, rotate: groupRotate }}
        >
          <BrainSvgProgress progress={progress} className="h-full w-full" />
        </motion.div>
      </motion.div>
    </div>
  )
}
