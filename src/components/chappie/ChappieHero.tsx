import { Suspense, useCallback, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { ChappieScene } from './ChappieScene'

type ChappieHeroProps = {
  variant?: 'default' | 'dock' | 'section'
}

export function ChappieHero({ variant = 'default' }: ChappieHeroProps) {
  const [engaged, setEngaged] = useState(false)

  const onEnter = useCallback(() => setEngaged(true), [])
  const onLeave = useCallback(() => setEngaged(false), [])
  const onToggle = useCallback(() => setEngaged((v) => !v), [])

  return (
    <div
      className={[
        'chappie-hero-host',
        variant === 'dock' ? 'chappie-hero-host--dock' : '',
        variant === 'section' ? 'chappie-hero-host--section' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={`chappie-hero-frame${engaged ? ' is-engaged' : ''}`}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onClick={onToggle}
        role="region"
        aria-label="Cyber agent assistant. Drag to rotate. Hover to wave."
      >
        <div className="agent-hero-overlay" aria-hidden>
          <span className="agent-hero-corner agent-hero-corner--tl" />
          <span className="agent-hero-corner agent-hero-corner--tr" />
          <span className="agent-hero-corner agent-hero-corner--bl" />
          <span className="agent-hero-corner agent-hero-corner--br" />
          <div className="agent-hero-vignette" />
          <div className="agent-hero-scanlines" />
        </div>

        <div className="agent-hero-chrome" aria-hidden>
          <div className="agent-hero-status">
            <span className="agent-hero-dot" />
            <span>Neural core</span>
          </div>
          <span className="agent-hero-id">VJ-CORE</span>
          <span className="agent-hero-meta">{engaged ? 'LINK ACTIVE' : 'STANDBY'}</span>
        </div>

        <p className="chappie-hero-speech" aria-hidden={!engaged}>
          <span className="chappie-hero-speech-label">Agent</span>
          Hi — ready to build.
        </p>

        <Canvas
          dpr={variant === 'section' ? [1, 2] : [1, 1.85]}
          shadows
          camera={{ position: [0, 0.9, 4], fov: variant === 'section' ? 36 : 38, near: 0.05, far: 80 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = variant === 'section' ? 1.38 : 1.25
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
          }}
          style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
        >
          <Suspense
            fallback={
              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshBasicMaterial color="#00f2ff" wireframe />
              </mesh>
            }
          >
            <ChappieScene engaged={engaged} variant={variant} />
          </Suspense>
        </Canvas>

        {(variant === 'default' || variant === 'section') && (
          <div className="agent-hero-footer" aria-hidden>
            <span>ORBIT</span>
            <span className="agent-hero-footer-sep" />
            <span>WAVE ON HOVER</span>
          </div>
        )}
      </div>
    </div>
  )
}
