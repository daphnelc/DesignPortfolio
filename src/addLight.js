import * as THREE from 'three'

export function addLight() {
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.009, 10)
  keyLight.position.set(-30, 30, 30)

  const fillLight = new THREE.AmbientLight(0xffffff, 0.0015)

  return { keyLight, fillLight }
}

export function addLightHelper(keyLight, fillLight) {
  const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1)
  const fillLightHelper = new THREE.PointLightHelper(fillLight, 1)
  return { keyLightHelper, fillLightHelper }
}