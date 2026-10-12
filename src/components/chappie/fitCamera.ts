import * as THREE from 'three'

export function getVisibleBounds(root: THREE.Object3D): THREE.Box3 {
  const box = new THREE.Box3()
  let empty = true
  root.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh) || !obj.visible) return
    const meshBox = new THREE.Box3().setFromObject(obj)
    if (empty) {
      box.copy(meshBox)
      empty = false
    } else {
      box.union(meshBox)
    }
  })
  return box
}

/** Scale and place model: feet on Y=0, centered on X/Z. */
export function normalizeAssistantRoot(root: THREE.Object3D, targetHeight: number): THREE.Box3 {
  root.scale.set(1, 1, 1)
  root.position.set(0, 0, 0)
  root.updateWorldMatrix(true, true)

  let box = getVisibleBounds(root)
  if (box.isEmpty()) return box

  const size = box.getSize(new THREE.Vector3())
  const scale = targetHeight / size.y
  root.scale.setScalar(scale)
  root.updateWorldMatrix(true, true)

  box = getVisibleBounds(root)
  const center = box.getCenter(new THREE.Vector3())
  root.position.set(-center.x, -box.min.y, -center.z)
  root.updateWorldMatrix(true, true)

  return getVisibleBounds(root)
}

type OrbitLike = {
  target: THREE.Vector3
  update: () => void
  minDistance?: number
  maxDistance?: number
}

export function fitPerspectiveCameraToBox(
  camera: THREE.PerspectiveCamera,
  box: THREE.Box3,
  margin: number,
  controls?: OrbitLike | null,
): number {
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())

  const vFovRad = (camera.fov * Math.PI) / 180
  const aspect = Math.max(camera.aspect, 0.25)
  const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect)

  const distForHeight = (size.y / 2) / Math.tan(vFovRad / 2)
  const distForWidth = (size.x / 2) / Math.tan(hFovRad / 2)
  const distance = margin * Math.max(distForHeight, distForWidth, 2.5)

  camera.position.set(center.x, center.y, center.z + distance)
  camera.near = Math.max(distance / 200, 0.02)
  camera.far = Math.max(distance * 25, 50)
  camera.updateProjectionMatrix()
  camera.lookAt(center)

  if (controls) {
    controls.target.copy(center)
    if (controls.minDistance !== undefined) controls.minDistance = distance * 0.65
    if (controls.maxDistance !== undefined) controls.maxDistance = distance * 2.2
    controls.update()
  }

  return distance
}
