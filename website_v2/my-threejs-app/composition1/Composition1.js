import '../style.css'
import * as THREE from 'three';
import theme from '/composition1/theme.json'
import {createSceneControls} from "./Components/OrbitControl/OrbitControl.js";
import {addLights} from "./Components/Lights/StandardLighting.js";
import {addGradients} from "./Components/Gradients/gradient.js";
import {createHalftoneEffect} from "./Effects/Halftone/halftone.js";
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(theme.theme.warm.orange);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);

const clock = new THREE.Clock();

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio/1);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene,camera);

//Geom
const sphereGroup = addGradients(scene,15);

//light
addLights(scene)

//controls
const controls = createSceneControls(scene, camera,renderer)

const { composer, halftonePass } = createHalftoneEffect(renderer,scene, camera);

window.onresize = function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

// GUI für HalftonePass
const controller = {
    radius: halftonePass.uniforms['radius'].value,
    rotateR: halftonePass.uniforms['rotateR'].value / (Math.PI / 180),
    rotateG: halftonePass.uniforms['rotateG'].value / (Math.PI / 180),
    rotateB: halftonePass.uniforms['rotateB'].value / (Math.PI / 180),
    scatter: halftonePass.uniforms['scatter'].value,
    shape: halftonePass.uniforms['shape'].value,
    greyscale: halftonePass.uniforms['greyscale'].value,
    blending: halftonePass.uniforms['blending'].value,
    blendingMode: halftonePass.uniforms['blendingMode'].value,
    disable: halftonePass.uniforms['disable'].value
};

function onGUIChange() {
    halftonePass.uniforms['radius'].value = controller.radius;
    halftonePass.uniforms['rotateR'].value = controller.rotateR * (Math.PI / 180);
    halftonePass.uniforms['rotateG'].value = controller.rotateG * (Math.PI / 180);
    halftonePass.uniforms['rotateB'].value = controller.rotateB * (Math.PI / 180);
    halftonePass.uniforms['scatter'].value = controller.scatter;
    halftonePass.uniforms['shape'].value = controller.shape;
    halftonePass.uniforms['greyscale'].value = controller.greyscale;
    halftonePass.uniforms['blending'].value = controller.blending;
    halftonePass.uniforms['blendingMode'].value = controller.blendingMode;
    halftonePass.uniforms['disable'].value = controller.disable;
}

const gui = new GUI();
gui.add(controller, 'shape', { 'Dot': 1, 'Ellipse': 2, 'Line': 3, 'Square': 4 }).onChange(onGUIChange);
gui.add(controller, 'radius', 1, 25).onChange(onGUIChange);
gui.add(controller, 'rotateR', 0, 90).onChange(onGUIChange);
gui.add(controller, 'rotateG', 0, 90).onChange(onGUIChange);
gui.add(controller, 'rotateB', 0, 90).onChange(onGUIChange);
gui.add(controller, 'scatter', 0, 1, 0.01).onChange(onGUIChange);
gui.add(controller, 'greyscale').onChange(onGUIChange);
gui.add(controller, 'blending', 0, 1, 0.01).onChange(onGUIChange);
gui.add(controller, 'blendingMode', { 'Linear': 1, 'Multiply': 2, 'Add': 3, 'Lighter': 4, 'Darker': 5 }).onChange(onGUIChange);
gui.add(controller, 'disable').onChange(onGUIChange);

function animate() {
    requestAnimationFrame(animate);

    sphereGroup.rotation.z -= 0.005;
    // sphereGroup.rotation.y += 0.001;

    controls.update();
    const delta = clock.getDelta();
    renderer.render(scene,camera);
    composer.render(delta);
}

animate()