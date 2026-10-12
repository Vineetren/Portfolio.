import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  experience,
  heroHudStack,
  navLinks,
  profile,
  skills,
} from './data/content'
import { SectionScrollLink } from './components/SectionScrollLink'
import './index.css'

const AgentSection = lazy(() =>
  import('./components/chappie/AgentSection').then((m) => ({ default: m.AgentSection })),
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

const SECTION_IDS = navLinks.map((l) => l.href.replace('#', ''))

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.15, 0.4] },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className={`nav${scrolled || open ? ' scrolled' : ''}${open ? ' open' : ''}`}>
      <div className="container nav-inner">
        <a className="nav-brand" href="#top" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="nav-resume"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Resume
        </a>
        <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
          Let&apos;s talk
        </a>
        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section className="hero" id="top">
      <div className="hero-workspace-vignette" aria-hidden />
      <div className="hero-atmosphere" aria-hidden>
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="signal" />
      </div>
      <div className="container hero-layout">
        <div className="hero-copy">
        <motion.h1
          className="hero-brand"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-greeting">Hi, I&apos;m</span>
          <span className="hero-name">{profile.name}</span>
        </motion.h1>
        <motion.p
          className="hero-title"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
        >
          {profile.title}
        </motion.p>
        <motion.p
          className="hero-tagline"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32 }}
        >
          {profile.tagline}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
        >
          <a className="btn btn-primary" href="#experience">
            View experience
          </a>
          <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
          <a
            className="btn btn-ghost"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </motion.div>
        <motion.div
          className="hero-meta"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <span>
            <i aria-hidden /> RAG
          </span>
          <span>
            <i aria-hidden /> Agents
          </span>
          <span>
            <i aria-hidden /> MCP
          </span>
          <span>
            <i aria-hidden /> Production systems
          </span>
        </motion.div>
        </div>
        <motion.figure
          className="hero-portrait"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-portrait-frame">
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              width={420}
              height={520}
              fetchPriority="high"
            />
            <div className="hero-portrait-scan" aria-hidden />
          </div>
          <figcaption>
            <span className="hero-portrait-id">ID // VJ-01</span>
            <span className="hero-portrait-status">
              <i aria-hidden /> Agent stack active
            </span>
          </figcaption>
        </motion.figure>
        <motion.aside
          className="hero-hud"
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          aria-label="Generative AI stack"
        >
          <p className="hero-hud-title">Generative AI</p>
          <ul>
            {heroHudStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-hud-terminal" aria-hidden>
            <span>&gt; create()</span>
            <span>&gt; build()</span>
            <span>&gt; improve()</span>
            <span>&gt; repeat()</span>
          </div>
        </motion.aside>
      </div>
      <motion.div
        className="section-scroll-anchor"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
      >
        <SectionScrollLink href="#about" label="About" />
      </motion.div>
    </section>
  )
}

function ContactPanel() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-panel">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2>Let&apos;s build the next AI system.</h2>
          <p>
            Open to roles and collaborations in Generative AI, agent platforms, and
            fullstack product engineering.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="contact-links">
          <button type="button" className="contact-link contact-copy" onClick={copyEmail}>
            <span>{profile.email}</span>
            <span>{copied ? 'Copied' : 'Copy email'}</span>
          </button>
          <a
            className="contact-link"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Resume (PDF)</span>
            <span>View</span>
          </a>
          <a className="contact-link" href={`mailto:${profile.email}`}>
            <span>Send a message</span>
            <span>Email</span>
          </a>
          <a className="contact-link" href={profile.phoneHref}>
            <span>{profile.phone}</span>
            <span>Phone</span>
          </a>
          {profile.socials
            .filter((s) => s.label !== 'Email' && s.label !== 'Resume')
            .map((s) => (
              <a
                key={s.label}
                className="contact-link"
                href={s.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{s.label}</span>
                <span>Open</span>
              </a>
            ))}
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />

        <section className="section" id="about">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">About</p>
              <h2>Building AI that ships.</h2>
            </Reveal>
            <div className="about-grid">
              <Reveal>
                <p className="about-copy">{profile.summary}</p>
              </Reveal>
              <Reveal delay={0.1} className="about-aside">
                <div className="about-stat">
                  <strong>1+</strong>
                  <span>Year building GenAI & backend systems</span>
                </div>
                <div className="about-stat">
                  <strong>5+</strong>
                  <span>Enterprise-grade applications delivered</span>
                </div>
                <div className="about-stat">
                  <strong>Full stack</strong>
                  <span>From system design through deployment</span>
                </div>
              </Reveal>
            </div>
          </div>
          <SectionScrollLink href="#agent" label="Agent" />
        </section>

        <Suspense fallback={null}>
          <AgentSection />
        </Suspense>

        <section className="section" id="expertise">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Expertise</p>
              <h2>Stack for reliable AI products.</h2>
              <p>
                Languages, frameworks, and platforms I use to design agentic
                systems, grounded retrieval, and secure APIs.
              </p>
            </Reveal>
            <div className="skills-grid">
              {skills.map((group, i) => (
                <Reveal key={group.category} delay={i * 0.06}>
                  <div className="skill-block">
                    <h3>{group.category}</h3>
                    <ul className="skill-list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <SectionScrollLink href="#experience" label="Experience" />
        </section>

        <section className="section" id="experience">
          <div className="container">
            <Reveal className="section-head">
              <p className="eyebrow">Experience</p>
              <h2>Roles & outcomes.</h2>
              <p>
                Selected work across industrial AI, generative agents, and
                backend engineering — focused on measurable impact.
              </p>
            </Reveal>
            <div className="timeline">
              {experience.map((job, i) => (
                <Reveal key={job.role + job.period} delay={i * 0.05}>
                  <article className="exp-item">
                    <p className="exp-period">{job.period}</p>
                    <div>
                      <h3 className="exp-role">{job.role}</h3>
                      <p className="exp-focus">{job.focus}</p>
                      <ul className="exp-highlights">
                        {job.highlights.map((item) => (
                          <li key={item.slice(0, 48)}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
          <SectionScrollLink href="#contact" label="Contact" />
        </section>

        <ContactPanel />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            <strong>{profile.name}</strong> — {profile.title}
          </p>
          <p className="footer-quote">{profile.heroQuote}</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}
