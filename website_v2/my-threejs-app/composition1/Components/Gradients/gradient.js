import * as THREE from 'three'
import theme from '../../theme.json'

export function addGradients(scene,numberOfSpheres) {
    const colors = [
        theme.theme.warm.pnik,
        theme.theme.warm.white,
        theme.theme.warm.yellow,
        theme.theme.warm.darkBlue,
        theme.theme.warm.lightBlue,
    ]

    const cylinderGroup = new THREE.Group();

    const cylinderRadius = 50;
    const cylinderHeight = 70;
    const sphereRadius = Math.random()*200;

    //Geom
    for (let i = 0; i < numberOfSpheres; i++) {
        // const jeffTexture = new THREE.TextureLoader().load('Screenshot 2024-08-08 122743.png')
        // const jeff = new THREE.MeshBasicMaterial( { map:jeffTexture } );

        const color = colors[i%colors.length];

        const geometry = new THREE.CircleGeometry(sphereRadius, 32, 32)
        const material = new THREE.MeshStandardMaterial({
            color: color,
        });
        const circle = new THREE.Mesh(geometry, material);

        // const phi = Math.acos(-1 + (2 * i) / numberOfSpheres);
        // const theta = Math.sqrt(numberOfSpheres * Math.PI) * phi;
        //
        // const min = 0;
        //
        // //variance towards center of the sphere
        // const randomRadius = (Math.random() * (radius - min) + min) + radius;
        //
        // const x = randomRadius * Math.cos(theta) * Math.sin(phi);
        // const y = randomRadius * Math.sin(theta) * Math.sin(phi);
        // const z = randomRadius * Math.cos(phi);
        //
        // // const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(120));
        // sphere.position.set(x, y, z);
        // sphereGroup.add(sphere);

        const theta = (i/numberOfSpheres) * Math.PI*2;
        const z = Math.random() * cylinderHeight - cylinderHeight / 2;
        const randomRadius = cylinderRadius + (Math.random() - 0.5) * 5;

        const x = randomRadius * Math.cos(theta);
        const y = randomRadius * Math.sin(theta);

        circle.position.set(x, y, z);


        const centerOfCylinder = new THREE.Vector3(0,0,z);
        circle.lookAt(centerOfCylinder);


        cylinderGroup.add(circle);
    }

    scene.add(cylinderGroup);
    return cylinderGroup;
}