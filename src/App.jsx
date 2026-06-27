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

function MainContent() {
  const heroStageRef = useRef(null)
  const postHeroRef = useRef(null)
  const { scrollYProgress: heroStageProgress } = useScroll({
    target: heroStageRef,
    offset: ['start start', 'end end']
  })
  const { scrollYProgress: postHeroProgress } = useScroll({
    target: postHeroRef,
    offset: ['start end', 'end end']
  })
  const bodyProgress = useTransform(
    [heroStageProgress, postHeroProgress],
    ([hero, postHero]) => {
      if (hero < 0.8) return 0
      const heroPhase = Math.min(1, Math.max(0, (hero - 0.8) / 0.2))
      const postPhase = Math.min(1, Math.max(0, postHero))

      // First quarter: reveal starts during the final 20% of hero scroll.
      // Remaining progress: continues through the content below hero.
      return heroPhase * 0.25 + postPhase * 0.75
    }
  )

  return (
    <div className="bg-datamt-bg min-h-screen relative isolate">
      <BodyBrainLinesBackground progress={bodyProgress} />

      <div className="relative z-10">
        <Navbar nav={data.nav} site={data.site} />

        <div ref={heroStageRef} className="relative h-[280vh] md:h-[320vh]">
          <div className="sticky top-0 h-screen">
            <Hero hero={data.hero} progress={heroStageProgress} />
          </div>
        </div>

        <div ref={postHeroRef}>
          <Pilares pilares={data.pilares} />

          <Eventos
            eventos={data.eventos}
            eventosPassados={data.eventosPassados}
          />

          <Organizadores organizadores={data.organizadores} />
          <Parceiros parceiros={data.parceiros} />
          <Footer site={data.site} nav={data.nav} social={data.social} />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [introFeita, setIntroFeita] = useState(false)

  return (
    <>
      {!introFeita && <LogoIntro onComplete={() => setIntroFeita(true)} />}
      {introFeita && <MainContent />}
    </>
  )
}
