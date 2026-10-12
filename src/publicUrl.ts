/** URL for a file in `public/` (honors Vite `base` on GitHub Pages). */
export function publicUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${clean}`
}
