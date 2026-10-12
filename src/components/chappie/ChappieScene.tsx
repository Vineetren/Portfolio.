import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  ContactShadows,
  Grid,
  OrbitControls,
  Sparkles,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import {
  applyCyberAssistantLook,
  setAssistantEngaged,
  type AssistantLook,
} from './assistantMaterials'
import {
  fitCameraToBounds,
  getSkinnedMeshBounds,
  normalizeAssistantHeight,
} from './frameModel'

const MODEL = '/models/chappie/chappie_anim.glb'

const VIEW_PROFILES = {
  default: { targetHeight: 1.75, frameMargin: 1.52 },
  section: { targetHeight: 2.25, frameMargin: 1.14 },
  dock: { targetHeight: 1.95, frameMargin: 1.32 },
} as const

type ChappieSceneProps = {
  engaged: boolean
  variant?: keyof typeof VIEW_PROFILES
}

function CameraFramer({
  model,
  frameGeneration,
  frameMargin,
}: {
  model: THREE.Object3D | null
  frameGeneration: number
  frameMargin: number
}) {
  const { camera, size } = useThree()
  const controls = useThree((s) => s.controls) as {
    target: THREE.Vector3
    update: () => void
    minDistance: number
    maxDistance: number
  } | null
  const framedKey = useRef<string | null>(null)
  const _box = useMemo(() => new THREE.Box3(), [])

  useEffect(() => {
    framedKey.current = null
  }, [model, frameGeneration])

  useFrame(() => {
    if (!model || !(camera instanceof THREE.PerspectiveCamera)) return

    const key = `${size.width}x${size.height}-${frameGeneration}`
    if (framedKey.current === key) return

    camera.aspect = size.width / Math.max(size.height, 1)
    camera.updateProjectionMatrix()

    model.updateWorldMatrix(true, true)
    _box.copy(getSkinnedMeshBounds(model))
    if (_box.isEmpty()) return

    const height = _box.getSize(new THREE.Vector3()).y
    if (height < 0.25) return

    fitCameraToBounds(camera, _box, frameMargin, controls)
    framedKey.current = key
  })

  return null
}

function AssistantModel({
  engaged,
  targetHeight,
  onModelReady,
}: {
  engaged: boolean
  targetHeight: number
  onModelReady: (model: THREE.Object3D) => void
}) {
  const modelRef = useRef<THREE.Group>(null)
  const lookRef = useRef<AssistantLook | null>(null)
  const prepared = useRef(false)
  const { scene, animations } = useGLTF(MODEL, true)
  const clone = useMemo(() => SkeletonUtils.clone(scene) as THREE.Group, [scene])
  const { actions, mixer } = useAnimations(animations, modelRef)
  const clock = useRef(0)

  useEffect(() => {
    lookRef.current?.dispose()
    lookRef.current = applyCyberAssistantLook(clone)
    prepared.current = false
    return () => {
      lookRef.current?.dispose()
      lookRef.current = null
    }
  }, [clone])

  useEffect(() => {
    const idle = actions.Idle
    const wave = actions.Waving
    if (!idle) return

    idle.reset().fadeIn(0.4).play()
    idle.setLoop(THREE.LoopRepeat, Infinity)

    return () => {
      idle.fadeOut(0.3)
      wave?.fadeOut(0.3)
    }
  }, [actions])

  useEffect(() => {
    const idle = actions.Idle
    const wave = actions.Waving
    if (!idle || !wave) return

    if (engaged) {
      idle.fadeOut(0.25)
      wave.reset().fadeIn(0.25).play()
      wave.setLoop(THREE.LoopRepeat, Infinity)
    } else {
      wave.fadeOut(0.25)
      idle.reset().fadeIn(0.35).play()
    }
  }, [engaged, actions])

  useFrame((_, delta) => {
    clock.current += delta
    mixer?.update(delta)

    if (lookRef.current) {
      setAssistantEngaged(lookRef.current, engaged, clock.current)
    }

    if (!prepared.current && modelRef.current && mixer) {
      mixer.update(0)
      normalizeAssistantHeight(clone, targetHeight)
      prepared.current = true
      onModelReady(clone)
    }
  })

  return (
    <group ref={modelRef}>
      <primitive object={clone} />
    </group>
  )
}

export function ChappieScene({ engaged, variant = 'default' }: ChappieSceneProps) {
  const profile = VIEW_PROFILES[variant]
  const [framedModel, setFramedModel] = useState<THREE.Object3D | null>(null)
  const [frameGeneration, setFrameGeneration] = useState(0)

  const onModelReady = (model: THREE.Object3D) => {
    setFramedModel(model)
    setFrameGeneration((n) => n + 1)
  }

  return (
    <>
      <ambientLight intensity={variant === 'section' ? 0.68 : 0.55} color="#b8d4e8" />
      <hemisphereLight args={['#88c8f0', '#060a14', variant === 'section' ? 1.05 : 0.9]} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={variant === 'section' ? 1.45 : 1.2}
        color="#e8f4ff"
        castShadow
      />
      <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#5b8cff" />
      <pointLight
        position={[0, 2, 2]}
        intensity={engaged ? 1.2 : variant === 'section' ? 0.85 : 0.65}
        color="#00f2ff"
      />

      <AssistantModel
        engaged={engaged}
        targetHeight={profile.targetHeight}
        onModelReady={onModelReady}
      />
      <CameraFramer
        model={framedModel}
        frameGeneration={frameGeneration}
        frameMargin={profile.frameMargin}
      />

      <Grid
        infiniteGrid
        position={[0, 0, 0]}
        fadeDistance={6}
        fadeStrength={1}
        cellSize={0.25}
        cellThickness={0.5}
        sectionSize={1.25}
        sectionThickness={1}
        cellColor="#0e2438"
        sectionColor="#00f2ff"
      />

      <Sparkles
        count={engaged ? 40 : 22}
        scale={[2.5, 2.5, 2.5]}
        size={1.8}
        speed={0.22}
        opacity={0.35}
        color="#00f2ff"
        position={[0, profile.targetHeight * 0.5, 0]}
      />

      <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={3} blur={2.5} far={2} />

      <OrbitControls
        enablePan={false}
        minDistance={1.2}
        maxDistance={14}
        autoRotate={false}
        enableDamping
        dampingFactor={0.08}
        makeDefault
      />
    </>
  )
}

useGLTF.preload(MODEL, true)
