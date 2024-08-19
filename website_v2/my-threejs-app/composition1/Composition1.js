import '../style.css'
import * as THREE from 'three';
import theme from '/composition1/theme.json'

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

let g = new THREE.PlaneGeometry(2, 2);
let m = new THREE.ShaderMaterial({
    uniforms: {
        color1: { value: new THREE.Color(0xff00ff)},
        color2: { value: new THREE.Color(0xff0000)},
        ratio: {value: innerWidth / innerHeight}
    },
    vertexShader: `varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = vec4(position, 1.);
      }`,
    fragmentShader: `varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float ratio;
        void main(){
        	vec2 uv = (vUv - 0.5) * vec2(ratio, 1.);
          gl_FragColor = vec4( mix( color1, color2, length(uv)), 1. );
        }`
})
let p = new THREE.Mesh(g,m);
scene.add(p)

// //light
// const pointlight = new THREE.PointLight(0xffffff)
// pointlight.position.set(2,2,10)
//
// const ambientLight = new THREE.AmbientLight(0xffffff)
// scene.add(pointlight,ambientLight);
//
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper, gridHelper);

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelat();
    rerender.render(scene,camera);
    composer.render(delta);
}

animate()