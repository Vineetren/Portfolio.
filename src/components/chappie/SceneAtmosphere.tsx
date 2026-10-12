import { Environment, Lightformer } from '@react-three/drei'

type SceneAtmosphereProps = {
  engaged: boolean
}

/** Studio lighting + fog tuned to match site palette (--bg-2 / cyan accent). */
export function SceneAtmosphere({ engaged }: SceneAtmosphereProps) {
  return (
    <>
      <color attach="background" args={['#050818']} />
      <fog attach="fog" args={['#0a1228', 5.5, 16]} />

      <Environment resolution={256} frames={Infinity}>
        <Lightformer
          form="rect"
          intensity={engaged ? 2.4 : 1.85}
          color="#e8f4ff"
          position={[2.5, 4.5, 2]}
          rotation={[-0.6, 0.35, 0]}
          scale={[5, 4, 1]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color="#00f2ff"
          position={[-3, 2.5, 1.5]}
          rotation={[0, 0.8, 0]}
          scale={[3.5, 2.5, 1]}
        />
        <Lightformer
          form="ring"
          intensity={engaged ? 1.35 : 0.95}
          color="#5b8cff"
          position={[0, 1.2, -2.5]}
          scale={3.2}
        />
        <Lightformer
          form="rect"
          intensity={0.35}
          color="#0a1228"
          position={[0, -2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[12, 12, 1]}
        />
      </Environment>
    </>
  )
}
