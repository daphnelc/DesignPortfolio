import './style.css'
import * as THREE from 'three'

export function addDefaultMeshes() {

    //making a cube shape, defining the shape
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;

}

export function addStandardMeshes() {

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x42E3EB,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x0a0a0a,
        emissiveIntensity: 0.2,
    })
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
}