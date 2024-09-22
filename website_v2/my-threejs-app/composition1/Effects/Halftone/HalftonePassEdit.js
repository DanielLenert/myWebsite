import {
    ShaderMaterial,
    UniformsUtils
} from 'three';
import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import { HalftoneShaderEdit } from "./HalftoneShaderEdit.js";

/**
 * RGB Halftone pass for three.js effects composer. Requires HalftoneShader.
 */

class HalftonePassEdit extends Pass {

    constructor( width, height, params ) {

        super();

        this.uniforms = UniformsUtils.clone( HalftoneShaderEdit.uniforms );
        this.material = new ShaderMaterial( {
            uniforms: this.uniforms,
            fragmentShader: HalftoneShaderEdit.fragmentShader,
            vertexShader: HalftoneShaderEdit.vertexShader
        } );

        // set params
        this.uniforms.width.value = width;
        this.uniforms.height.value = height;

        for ( const key in params ) {

            if ( params.hasOwnProperty( key ) && this.uniforms.hasOwnProperty( key ) ) {

                this.uniforms[ key ].value = params[ key ];

            }

        }

        this.fsQuad = new FullScreenQuad( this.material );

    }

    render( renderer, writeBuffer, readBuffer/*, deltaTime, maskActive*/ ) {

        this.material.uniforms[ 'tDiffuse' ].value = readBuffer.texture;

        if ( this.renderToScreen ) {

            renderer.setRenderTarget( null );
            this.fsQuad.render( renderer );

        } else {

            renderer.setRenderTarget( writeBuffer );
            if ( this.clear ) renderer.clear();
            this.fsQuad.render( renderer );

        }

    }

    setSize( width, height ) {

        this.uniforms.width.value = width;
        this.uniforms.height.value = height;

    }

    dispose() {

        this.material.dispose();

        this.fsQuad.dispose();

    }

}

export { HalftonePassEdit };
