import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { getAgentPreloadPromise } from '../../agentPreload'
import { SectionScrollLink } from '../SectionScrollLink'
import { agentSection } from '../../data/content'

const ChappieHero = lazy(() =>
  import('./ChappieHero').then((m) => ({ default: m.ChappieHero })),
)

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <div className={className}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function AgentSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [loadScene, setLoadScene] = useState(false)

  useEffect(() => {
    let cancelled = false
    void getAgentPreloadPromise().then(() => {
      if (!cancelled) setLoadScene(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="section agent-section" id="agent" ref={rootRef}>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{agentSection.eyebrow}</p>
          <h2>{agentSection.title}</h2>
          <p>{agentSection.lead}</p>
        </Reveal>
        <div className="agent-section-grid">
          <Reveal>
            <p className="agent-section-copy">{agentSection.copy}</p>
            <ul className="agent-section-list">
              {agentSection.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="agent-section-hint">{agentSection.hint}</p>
          </Reveal>
          <Reveal delay={0.08} className="agent-section-visual">
            {loadScene ? (
              <Suspense fallback={<p className="agent-section-loading">Loading agent…</p>}>
                <ChappieHero variant="section" />
              </Suspense>
            ) : (
              <div className="agent-section-placeholder" aria-hidden>
                <span className="agent-section-placeholder-label">Agent preview</span>
              </div>
            )}
          </Reveal>
        </div>
      </div>
      <SectionScrollLink href="#expertise" label="Expertise" />
    </section>
  )
}
