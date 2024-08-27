import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three'

export function createSceneControls(scene, camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);

    // Optional: Parameter für Steuerung
    controls.enableDamping = true;  // Trägheitseffekt für sanftere Bewegungen
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 500;

    // GridHelper hinzufügen
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    return controls;
}