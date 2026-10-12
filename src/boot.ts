import { preloadAgent } from './agentPreload'
import { publicUrl } from './publicUrl'

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

class LoaderHud {
  private display = 0
  private target = 0
  private raf = 0
  private statusEl: HTMLElement | null
  private percentEl: HTMLElement | null
  private fillEl: HTMLElement | null
  private ringEl: SVGCircleElement | null

  constructor() {
    this.statusEl = document.getElementById('app-loader-status')
    this.percentEl = document.getElementById('app-loader-percent')
    this.fillEl = document.getElementById('app-loader-fill')
    this.ringEl = document.querySelector('#app-loader-ring')
    this.tick()
  }

  setStatus(text: string) {
    if (this.statusEl) this.statusEl.textContent = text
  }

  setTarget(percent: number, status?: string) {
    this.target = Math.min(100, Math.max(this.display, percent))
    if (status) this.setStatus(status)
  }

  private paint() {
    const p = Math.round(this.display)
    if (this.percentEl) this.percentEl.textContent = `${p}%`
    if (this.fillEl) this.fillEl.style.width = `${p}%`
    if (this.ringEl) {
      const circumference = 2 * Math.PI * 52
      this.ringEl.style.strokeDashoffset = `${circumference * (1 - p / 100)}`
    }
  }

  private tick = () => {
    this.display += (this.target - this.display) * 0.12
    if (Math.abs(this.target - this.display) < 0.35) this.display = this.target
    this.paint()
    this.raf = requestAnimationFrame(this.tick)
  }

  async flushTo(percent: number, status?: string) {
    this.setTarget(percent, status)
    while (Math.abs(this.target - this.display) > 0.6) {
      await new Promise((r) => window.setTimeout(r, 32))
    }
    this.display = percent
    this.paint()
  }

  destroy() {
    cancelAnimationFrame(this.raf)
  }
}

function dismissLoader() {
  document.documentElement.classList.remove('app-loading')
  const el = document.getElementById('app-loader')
  el?.classList.add('app-loader--out')
  window.setTimeout(() => el?.remove(), 650)
}

export async function waitForInitialReady(): Promise<void> {
  const hud = new LoaderHud()
  const portrait = publicUrl('portrait.png')
  const workspace = publicUrl('cyberpunk-workspace.png')

  const preload = document.createElement('link')
  preload.rel = 'preload'
  preload.as = 'image'
  preload.href = portrait
  document.head.appendChild(preload)

  hud.setTarget(4, 'BOOT SEQUENCE')
  const fontsReady = document.fonts?.ready ?? Promise.resolve()

  void preloadImage(workspace).then(() => {
    document.documentElement.style.setProperty(
      '--workspace-bg',
      `url(${workspace})`,
    )
    document.body.classList.add('workspace-ready')
  })

  await fontsReady
  hud.setTarget(14, 'SYNC TYPOGRAPHY')

  await preloadImage(portrait)
  hud.setTarget(22, 'LOAD PROFILE ASSET')

  const agentLoad = preloadAgent((ratio) => {
    hud.setTarget(22 + ratio * 73, ratio < 0.2 ? 'LOAD AGENT RUNTIME' : 'BIND NEURAL MESH')
  })

  const maxWait = new Promise<void>((r) => window.setTimeout(r, 120_000))

  await Promise.race([maxWait, agentLoad])

  await hud.flushTo(100, 'AGENT ONLINE — LINK STABLE')
  hud.destroy()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduceMotion) {
    await new Promise((r) => window.setTimeout(r, 380))
  }

  dismissLoader()
}
