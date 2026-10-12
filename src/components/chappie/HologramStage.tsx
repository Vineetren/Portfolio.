import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Grid, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export function HologramStage({ engaged }: { engaged: boolean }) {
  const innerRing = useRef<THREE.Mesh>(null)
  const outerRing = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (innerRing.current) innerRing.current.rotation.z += delta * 0.35
    if (outerRing.current) outerRing.current.rotation.z -= delta * 0.18
  })

  return (
    <group position={[0, -0.93, 0]}>
      <Grid
        infiniteGrid
        fadeDistance={7}
        fadeStrength={1.2}
        cellSize={0.22}
        cellThickness={0.45}
        sectionSize={1.1}
        sectionThickness={0.9}
        cellColor="#0d3d52"
        sectionColor="#00f2ff"
        position={[0, 0, 0]}
      />
      <mesh ref={innerRing} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 0.78, 64]} />
        <meshBasicMaterial color="#00f2ff" transparent opacity={engaged ? 0.55 : 0.28} />
      </mesh>
      <mesh ref={outerRing} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 1.02, 64]} />
        <meshBasicMaterial color="#5b8cff" transparent opacity={0.2} />
      </mesh>
      <Sparkles
        count={engaged ? 55 : 28}
        scale={[2.2, 2.4, 2.2]}
        size={engaged ? 2.2 : 1.4}
        speed={0.22}
        opacity={0.45}
        color="#00f2ff"
        position={[0, 0.85, 0]}
      />
    </group>
  )
}
