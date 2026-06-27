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
import GlobalBrainLinesBackground from './components/GlobalBrainLinesBackground'

export default function App() {
  const [introFeita, setIntroFeita] = useState(false)
  const heroStageRef = useRef(null)
  const { scrollYProgress: pageScrollProgress } = useScroll()
  const { scrollYProgress: heroStageProgress } = useScroll({
    target: heroStageRef,
    offset: ['start start', 'end end']
  })
  const globalProgress = useTransform(
    [heroStageProgress, pageScrollProgress],
    ([heroProgress, pageProgress]) => (heroProgress < 0.995 ? 0 : pageProgress)
  )

  return (
    <>
      {!introFeita && <LogoIntro onComplete={() => setIntroFeita(true)} />}
      {introFeita && (
        <div className="bg-datamt-bg min-h-screen relative isolate">
          <GlobalBrainLinesBackground progress={globalProgress} />

          <div className="relative z-10">
            <Navbar nav={data.nav} site={data.site} />

            <div ref={heroStageRef} className="relative h-[280vh] md:h-[320vh]">
              <div className="sticky top-0 h-screen">
                <Hero hero={data.hero} progress={heroStageProgress} />
              </div>
            </div>

            <Pilares pilares={data.pilares} />
            <Eventos eventos={data.eventos} />
            <Organizadores organizadores={data.organizadores} />
            <Parceiros parceiros={data.parceiros} />
            <Footer site={data.site} nav={data.nav} social={data.social} />
          </div>
        </div>
      )}
    </>
  )
}
