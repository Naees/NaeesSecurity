export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getReadingTime(text: string | undefined): number {
  const wordsPerMinute = 200
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes)
}

export function getBaseUrl(base: string | undefined): string {
  return base || '/'
}

export function resolveAssetPath(path: string | undefined, base: string): string {
  if (!path) return ''
  if (/^https?:\/\//.test(path)) return path
  return `${base}${path.replace(/^\//, '')}`
}

