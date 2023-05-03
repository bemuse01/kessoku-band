import ShaderMethod from '~/utils/method.shader.js'

export default {
    vertex: `
        attribute vec3 position;
        attribute vec2 uv;

        uniform mat4 worldViewProjection;

        // varying vec2 vUv;

        void main(){
            gl_Position = worldViewProjection * vec4(position, 1.0);

            // vUv = uv;
        }
    `,
    fragment: `
        // uniform vec3 uColor;
        uniform float rw;
        uniform float rh;
        uniform float deg;
        uniform float time;

        // varying vec2 vUv;
        ${ShaderMethod.snoise3D()}
        

        void main(){
            vec2 coord = gl_FragCoord.xy - vec2(rw, rh) * 0.5;

            // float boundX = coord.y / tan(radians(90.0 - deg)) + cos(time * 0.001 + coord.y * 0.01) * 20.0;
            // float opacity = smoothstep(boundX - 1.0, boundX + 1.0, coord.x);
            // gl_FragColor = vec4(vec3(1), opacity);

            vec2 idx = floor(coord / 50.0);
            float opacity = (snoise3D(vec3(idx * 0.05, time * 0.00025)) + 1.0) * 0.5;

            float boundX = coord.y / tan(radians(90.0 - deg));

            if(coord.x < boundX) discard;

            gl_FragColor = vec4(vec3(1), 1.0 - opacity * 0.5);
        }
    `
}