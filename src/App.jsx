import { useRef, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import data from './data.json'
import LogoIntro from './components/LogoIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pilares from './components/Pilares'
import Eventos from './components/Eventos'
import Organizadores from './components/Organizadores'
import Parceiros from './components/Parceiros'
import Footer from './components/Footer'
import BodyBrainLinesBackground from './components/BodyBrainLinesBackground'

export default function App() {
  const [introFeita, setIntroFeita] = useState(false)
  const heroStageRef = useRef(null)
  const contentStageRef = useRef(null)
  const { scrollYProgress: heroStageProgress } = useScroll({
    target: heroStageRef,
    offset: ['start start', 'end end']
  })
  const { scrollYProgress: globalProgress } = useScroll({
    target: contentStageRef,
    offset: ['start start', 'end end']
  })
  const bodyBackgroundProgress = useTransform(
    [heroStageProgress, globalProgress],
    ([heroProgress, contentProgress]) => {
      if (heroProgress < 0.8) {
        return 0
      }

      if (heroProgress < 0.995) {
        return ((heroProgress - 0.8) / 0.195) * 0.2
      }

      return 0.2 + contentProgress * 0.8
    }
  )

  return (
    <>
      {!introFeita && <LogoIntro onComplete={() => setIntroFeita(true)} />}
      {introFeita && (
        <div className="bg-datamt-bg min-h-screen relative isolate">
          <BodyBrainLinesBackground progress={bodyBackgroundProgress} />

          <div className="relative z-10">
            <Navbar nav={data.nav} site={data.site} />

            <div ref={heroStageRef} className="relative h-[280vh] md:h-[320vh]">
              <div className="sticky top-0 h-screen">
                <Hero hero={data.hero} progress={heroStageProgress} />
              </div>
            </div>

            <div ref={contentStageRef}>
              <Pilares pilares={data.pilares} />
              <Eventos eventos={data.eventos} />
              <Organizadores organizadores={data.organizadores} />
              <Parceiros parceiros={data.parceiros} />
              <Footer site={data.site} nav={data.nav} social={data.social} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
