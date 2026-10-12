import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

const ChappieHero = lazy(() =>
  import('./ChappieHero').then((m) => ({ default: m.ChappieHero })),
)

export function AgentDock() {
  const [open, setOpen] = useState(false)
  const [loadScene, setLoadScene] = useState(false)

  useEffect(() => {
    if (open) setLoadScene(true)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = useCallback(() => setOpen((v) => !v), [])
  const close = useCallback(() => setOpen(false), [])

  return (
    <div className={`agent-dock${open ? ' is-open' : ''}`}>
      {open && (
        <div className="agent-dock-panel" role="dialog" aria-label="Portfolio agent assistant">
          <button type="button" className="agent-dock-close" onClick={close} aria-label="Close">
            ×
          </button>
          {loadScene && (
            <Suspense fallback={<p className="agent-dock-loading">Loading agent…</p>}>
              <ChappieHero variant="dock" />
            </Suspense>
          )}
        </div>
      )}
      <button
        type="button"
        className="agent-dock-fab"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="agent-dock-panel"
      >
        <span className="agent-dock-fab-dot" aria-hidden />
        {open ? 'Close agent' : 'Open agent'}
      </button>
    </div>
  )
}
