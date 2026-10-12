import * as THREE from 'three'

const CYAN = '#00f2ff'
const VIOLET = '#5b8cff'

type StyledMesh = {
  mesh: THREE.Mesh
  baseEmissive: THREE.Color
  kind: 'visor' | 'indicator' | 'chassis'
}

export type AssistantLook = {
  styled: StyledMesh[]
  dispose: () => void
}

function chassisMaterial(color: string, emissive = '#0a2030'): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity: 0.42,
    metalness: 0.55,
    roughness: 0.42,
  })
}

export function applyCyberAssistantLook(root: THREE.Object3D): AssistantLook {
  const styled: StyledMesh[] = []
  const disposable: THREE.Material[] = []

  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return

    const key = obj.name.toLowerCase()
    let mat: THREE.MeshStandardMaterial
    let kind: StyledMesh['kind'] = 'chassis'
    let baseEmissive = new THREE.Color('#0a2030')

    if (key.includes('eyescreen') || key.includes('eye')) {
      kind = 'visor'
      baseEmissive = new THREE.Color(CYAN)
      mat = new THREE.MeshStandardMaterial({
        color: '#061018',
        emissive: CYAN,
        emissiveIntensity: 1.65,
        metalness: 0.15,
        roughness: 0.35,
      })
    } else if (key.includes('battery') || key.includes('indicator')) {
      kind = 'indicator'
      baseEmissive = new THREE.Color(VIOLET)
      mat = new THREE.MeshStandardMaterial({
        color: '#0a1020',
        emissive: VIOLET,
        emissiveIntensity: 0.9,
        metalness: 0.2,
        roughness: 0.35,
      })
    } else if (key.includes('head') || key.includes('body')) {
      mat = chassisMaterial('#1a3048', '#0c2840')
      baseEmissive = new THREE.Color('#0c2840')
    } else {
      mat = chassisMaterial(key.includes('hand') || key.includes('leg') ? '#243c54' : '#1e3450')
    }

    disposable.push(mat)

    if (Array.isArray(obj.material)) {
      obj.material.forEach((m) => m.dispose())
      obj.material = obj.material.map(() => mat.clone())
    } else {
      obj.material?.dispose()
      obj.material = mat
    }

    styled.push({ mesh: obj, baseEmissive, kind })
    obj.castShadow = true
    obj.receiveShadow = true
  })

  return {
    styled,
    dispose: () => disposable.forEach((m) => m.dispose()),
  }
}

export function setAssistantEngaged(look: AssistantLook, engaged: boolean, time: number) {
  const breathe = 0.85 + Math.sin(time * 1.6) * 0.12

  for (const entry of look.styled) {
    const mat = entry.mesh.material as THREE.MeshStandardMaterial

    if (entry.kind === 'visor') {
      const pulse = engaged ? 0.75 + Math.sin(time * 7) * 0.25 : breathe
      mat.emissiveIntensity = (engaged ? 2.2 : 1.25) * pulse
      mat.emissive.set(engaged ? CYAN : entry.baseEmissive)
    } else if (entry.kind === 'indicator') {
      mat.emissiveIntensity = engaged ? 1.2 + Math.sin(time * 5) * 0.3 : 0.75
    } else {
      mat.emissiveIntensity = engaged ? 0.55 : 0.35
      mat.color.set(engaged ? '#224868' : '#1a3048')
    }
  }
}
