import { useEffect, useState } from 'react'

export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const media = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = (event) => setIsMobile(event.matches)

    setIsMobile(media.matches)

    if (media.addEventListener) {
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    }

    media.addListener(onChange)
    return () => media.removeListener(onChange)
  }, [breakpoint])

  return isMobile
}
