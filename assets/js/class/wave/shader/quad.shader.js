// import ShaderMethod from '../../../method/method.shader.js'
import * as BABYLON from 'babylonjs'

const name = 'waveQuad'

const getShaderName = () => {
    const vertex = `
        attribute vec3 position;
        attribute vec2 uv;

        uniform mat4 worldViewProjection;

        varying vec2 vUv;

        void main(){
            gl_Position = worldViewProjection * vec4(position, 1.0);

            vUv = uv;
        }
    `
    const fragment = `
        // uniform vec3 uColor;

        varying vec2 vUv;

        void main(){
            gl_FragColor = vec4(1);
        }
    `
    
    BABYLON.Effect.ShadersStore[name + 'VertexShader'] = vertex
    BABYLON.Effect.ShadersStore[name + 'FragmentShader'] = fragment

    return name
}

export default getShaderName