import * as THREE from 'three';
// halftoneEffect.js
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js';

export function createHalftoneEffect(renderer, scene, camera) {
    // Erstelle den EffectComposer
    const composer = new EffectComposer(renderer);

    // Erstelle den RenderPass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Parameter für HalftonePass
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

    // Erstelle den HalftonePass
    const halftonePass = new HalftonePass(window.innerWidth, window.innerHeight / 2, params);
    composer.addPass(halftonePass);

    return { composer, halftonePass };
}
