const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function assetUrl(path) {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
