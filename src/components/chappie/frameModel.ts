import * as THREE from 'three'

const _worldBox = new THREE.Box3()

/** World-space AABB from deformed skinned vertices (not bind-pose geometry bbox). */
export function getSkinnedMeshBounds(root: THREE.Object3D): THREE.Box3 {
  const box = new THREE.Box3()
  let empty = true

  root.updateWorldMatrix(true, true)
  root.traverse((obj) => {
    if (!(obj instanceof THREE.SkinnedMesh)) return
    obj.skeleton?.update()
    obj.computeBoundingBox()
    if (!obj.boundingBox || obj.boundingBox.isEmpty()) return

    _worldBox.copy(obj.boundingBox).applyMatrix4(obj.matrixWorld)

    if (empty) {
      box.copy(_worldBox)
      empty = false
    } else {
      box.union(_worldBox)
    }
  })

  return box
}

/** World-space bounds for skinned body plus rigid accessories on the same root. */
export function getCharacterBounds(root: THREE.Object3D): THREE.Box3 {
  const box = getSkinnedMeshBounds(root)
  const accessory = new THREE.Box3().setFromObject(root)
  if (box.isEmpty()) return accessory
  if (accessory.isEmpty()) return box
  return box.union(accessory)
}

/** Move model so feet sit on Y=0 and character is centered on X/Z. */
export function alignModelOnGround(model: THREE.Object3D): THREE.Box3 {
  model.updateWorldMatrix(true, true)
  const box = getSkinnedMeshBounds(model)
  if (box.isEmpty()) return box

  const center = box.getCenter(new THREE.Vector3())
  model.position.x -= center.x
  model.position.y -= box.min.y
  model.position.z -= center.z
  model.updateWorldMatrix(true, true)

  return getSkinnedMeshBounds(model)
}

/** Uniform scale + ground align so the rig fits a predictable size in the viewport. */
export function normalizeAssistantHeight(model: THREE.Object3D, targetHeight: number): THREE.Box3 {
  let box = alignModelOnGround(model)
  if (box.isEmpty()) return box

  const height = box.getSize(new THREE.Vector3()).y
  if (height > 1e-4 && Math.abs(height - targetHeight) > 0.02) {
    const scale = targetHeight / height
    model.scale.multiplyScalar(scale)
    box = alignModelOnGround(model)
  }

  return box
}

export function fitCameraToBounds(
  camera: THREE.PerspectiveCamera,
  box: THREE.Box3,
  margin: number,
  controls?: { target: THREE.Vector3; update: () => void; minDistance?: number; maxDistance?: number } | null,
): void {
  const center = box.getCenter(new THREE.Vector3())
  const size = box.getSize(new THREE.Vector3())

  const vFovRad = (camera.fov * Math.PI) / 180
  const aspect = Math.max(camera.aspect, 0.2)
  const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect)

  const distV = (size.y / 2) / Math.tan(vFovRad / 2)
  const distH = (size.x / 2) / Math.tan(hFovRad / 2)
  const distD = (size.z / 2) / Math.tan(hFovRad / 2)
  const distance = margin * Math.max(distV, distH, distD, 1.8)

  const lookY = center.y + size.y * 0.04
  camera.position.set(center.x, lookY + size.y * 0.01, center.z + distance)
  camera.near = Math.max(distance / 200, 0.02)
  camera.far = Math.max(distance * 40, 80)
  camera.updateProjectionMatrix()
  camera.lookAt(center.x, lookY, center.z)

  if (controls) {
    controls.target.set(center.x, lookY, center.z)
    if (controls.minDistance !== undefined) controls.minDistance = distance * 0.45
    if (controls.maxDistance !== undefined) controls.maxDistance = distance * 2.8
    controls.update()
  }
}
