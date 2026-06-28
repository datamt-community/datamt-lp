import HeroDesktop from './Hero.desktop'
import HeroMobile from './Hero.mobile'
import useIsMobile from '../hooks/useIsMobile'

export default function Hero(props) {
  const isMobile = useIsMobile()
  return isMobile ? <HeroMobile {...props} /> : <HeroDesktop {...props} />
}
