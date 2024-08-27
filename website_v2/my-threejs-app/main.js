import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let composer;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio/1);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

//Geom
const jeffTexture = new THREE.TextureLoader().load('Screenshot 2024-08-08 122743.png')
const jeff = new THREE.MeshBasicMaterial( { map:jeffTexture } );

const geometry = new THREE.TetrahedronGeometry(10,5)
const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF} );
const tetrahedron = new THREE.Mesh( geometry ,  jeff);

scene.add(tetrahedron);

//light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2,2,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//orbitControl
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera,renderer.domElement);

//halftone
composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
const params = {
    shape: 1,
    radius: 20,
    rotateR: Math.PI / 12,
    rotateB: Math.PI / 12 * 2,
    rotateG: Math.PI / 12 * 3,
    scatter: 0,
    blending: 1,
    blendingMode: 1,
    greyscale: false,
    disable: false
};
const halftonePass = new HalftonePass( window.innerWidth, window.innerHeight/2, params );
composer.addPass( renderPass );
composer.addPass( halftonePass );

window.onresize = function () {

    // resize composer
    renderer.setSize( window.innerWidth, window.innerHeight );
    composer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

};

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color:0xFFFFFF } );
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
    star.position.set(x,y,z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)

//gui-haftone
const controller = {
    radius: halftonePass.uniforms[ 'radius' ].value,
    rotateR: halftonePass.uniforms[ 'rotateR' ].value / ( Math.PI / 180 ),
    rotateG: halftonePass.uniforms[ 'rotateG' ].value / ( Math.PI / 180 ),
    rotateB: halftonePass.uniforms[ 'rotateB' ].value / ( Math.PI / 180 ),
    scatter: halftonePass.uniforms[ 'scatter' ].value,
    shape: halftonePass.uniforms[ 'shape' ].value,
    greyscale: halftonePass.uniforms[ 'greyscale' ].value,
    blending: halftonePass.uniforms[ 'blending' ].value,
    blendingMode: halftonePass.uniforms[ 'blendingMode' ].value,
    disable: halftonePass.uniforms[ 'disable' ].value
};

function onGUIChange() {

    // update uniforms
    halftonePass.uniforms[ 'radius' ].value = controller.radius;
    halftonePass.uniforms[ 'rotateR' ].value = controller.rotateR * ( Math.PI / 180 );
    halftonePass.uniforms[ 'rotateG' ].value = controller.rotateG * ( Math.PI / 180 );
    halftonePass.uniforms[ 'rotateB' ].value = controller.rotateB * ( Math.PI / 180 );
    halftonePass.uniforms[ 'scatter' ].value = controller.scatter;
    halftonePass.uniforms[ 'shape' ].value = controller.shape;
    halftonePass.uniforms[ 'greyscale' ].value = controller.greyscale;
    halftonePass.uniforms[ 'blending' ].value = controller.blending;
    halftonePass.uniforms[ 'blendingMode' ].value = controller.blendingMode;
    halftonePass.uniforms[ 'disable' ].value = controller.disable;

}

const gui = new GUI();
gui.add( controller, 'shape', { 'Dot': 1, 'Ellipse': 2, 'Line': 3, 'Square': 4 } ).onChange( onGUIChange );
gui.add( controller, 'radius', 1, 25 ).onChange( onGUIChange );
gui.add( controller, 'rotateR', 0, 90 ).onChange( onGUIChange );
gui.add( controller, 'rotateG', 0, 90 ).onChange( onGUIChange );
gui.add( controller, 'rotateB', 0, 90 ).onChange( onGUIChange );
gui.add( controller, 'scatter', 0, 1, 0.01 ).onChange( onGUIChange );
gui.add( controller, 'greyscale' ).onChange( onGUIChange );
gui.add( controller, 'blending', 0, 1, 0.01 ).onChange( onGUIChange );
gui.add( controller, 'blendingMode', { 'Linear': 1, 'Multiply': 2, 'Add': 3, 'Lighter': 4, 'Darker': 5 } ).onChange( onGUIChange );
gui.add( controller, 'disable' ).onChange( onGUIChange );


function animate() {
    requestAnimationFrame(animate);

    tetrahedron.rotation.x += 0.001;
    // tetrahedron.rotation.y += 0.0005;
    // tetrahedron.rotation.z += 0.001;
    controls.update();

    const delta = clock.getDelta();
    renderer.render(scene,camera);
    composer.render( delta );
}

animate()