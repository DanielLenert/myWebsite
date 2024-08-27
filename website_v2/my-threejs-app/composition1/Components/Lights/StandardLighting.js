// lights.js
import * as THREE from 'three';

export function addLights(scene) {
    // Punktlicht hinzufügen
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(2, 2, 10);
    scene.add(pointLight);

    // Ambient Light hinzufügen
    const ambientLight = new THREE.AmbientLight(0xffffff,4);
    scene.add(ambientLight);

    // Licht-Helper hinzufügen (optional)
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);
}
