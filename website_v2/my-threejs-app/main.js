import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio/4);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const jeffTexture = new THREE.TextureLoader().load('Screenshot 2024-08-08 122743.png')
const jeff = new THREE.MeshBasicMaterial( { map:jeffTexture } );

const geometry = new THREE.TetrahedronGeometry(10,3)
const material = new THREE.MeshStandardMaterial( {color: 0xFFFFFF} );
const tetrahedron = new THREE.Mesh( geometry ,  jeff);

scene.add(tetrahedron);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2,2,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera,renderer.domElement);


function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color:0xFFFFFF } );
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
    star.position.set(x,y,z);
    scene.add(star)
}

Array(200).fill().forEach(addStar)

function animate() {
    requestAnimationFrame(animate);

    tetrahedron.rotation.x += 0.01;
    tetrahedron.rotation.y += 0.005;
    tetrahedron.rotation.z += 0.01;

    controls.update();

    renderer.render(scene,camera);
}

animate()