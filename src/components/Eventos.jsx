import EventosDesktop from './Eventos.desktop'
import EventosMobile from './Eventos.mobile'
import useIsMobile from '../hooks/useIsMobile'

export default function Eventos(props) {
  const isMobile = useIsMobile()
  return isMobile ? <EventosMobile {...props} /> : <EventosDesktop {...props} />
}
