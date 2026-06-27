import { useRef, useState } from 'react'
import { useScroll } from 'framer-motion'
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
  const { scrollYProgress: pageScrollProgress } = useScroll()
  const { scrollYProgress: heroStageProgress } = useScroll({
    target: heroStageRef,
    offset: ['start start', 'end end']
  })

  return (
    <div className="bg-datamt-bg min-h-screen relative isolate">
      <BodyBrainLinesBackground progress={pageScrollProgress} />

      <div className="relative z-10">
        <Navbar nav={data.nav} site={data.site} />

        <div ref={heroStageRef} className="relative h-[280vh] md:h-[320vh]">
          <div className="sticky top-0 h-screen">
            <Hero hero={data.hero} progress={heroStageProgress} />
          </div>
        </div>

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
