import { publicUrl } from './publicUrl'

const MODEL_URL = publicUrl('models/chappie/chappie_anim.glb')

let preloadPromise: Promise<void> | null = null

async function fetchModelWithProgress(
  onRatio: (ratio: number) => void,
): Promise<void> {
  const res = await fetch(MODEL_URL)
  if (!res.ok) return

  const total = Number(res.headers.get('content-length') || 0)
  if (!res.body || !total) {
    await res.arrayBuffer()
    onRatio(1)
    return
  }

  const reader = res.body.getReader()
  let loaded = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    loaded += value.byteLength
    onRatio(Math.min(1, loaded / total))
  }
}

/**
 * Loads the 3D agent JS chunks and GLB before the splash dismisses.
 */
export function preloadAgent(onPhaseProgress?: (ratio: number) => void): Promise<void> {
  if (!preloadPromise) {
    preloadPromise = (async () => {
      onPhaseProgress?.(0.02)

      const heroChunk = import('./components/chappie/ChappieHero')
      const sceneChunk = import('./components/chappie/ChappieScene')

      onPhaseProgress?.(0.08)
      await Promise.all([heroChunk, sceneChunk])
      onPhaseProgress?.(0.18)

      await fetchModelWithProgress((modelRatio) => {
        onPhaseProgress?.(0.18 + modelRatio * 0.82)
      })
    })().catch(() => {
      preloadPromise = null
    })
  }
  return preloadPromise
}

export function getAgentPreloadPromise(): Promise<void> {
  return preloadPromise ?? Promise.resolve()
}
