// import ShaderMethod from '../../../method/method.shader.js'

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

        // varying vec2 vUv;

        void main(){
            vec2 coord = gl_FragCoord.xy - vec2(rw, rh) * 0.5;

            float boundX = coord.y / tan(radians(90.0 - deg));

            float opacity = step(boundX, coord.x);

            gl_FragColor = vec4(vec3(1), opacity);
        }
    `
}