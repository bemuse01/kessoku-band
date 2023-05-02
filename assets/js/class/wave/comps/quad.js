import {RADIAN} from '~/utils/const.js'
import Plane from '~/assets/js/class/objects/plane.js'
import Shader from '../shader/quad.shader.js'

import * as BABYLON from 'babylonjs'

export default class{
    constructor({
        engine,
        scene,
        camera,
        color,
        rw,
        rh,
        vw,
        vh,
    }){
        this.engine = engine
        this.scene = scene
        this.camera = camera
        this.color = color
        this.rw = rw
        this.rh = rh
        this.vw = vw
        this.vh = vh

        this.sizeRatio = 1.5
        this.deg = 15

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const {scene, engine, vw, vh} = this

        const material = this.createMaterial()

        this.quad = new Plane({
            geometryOpt: {
                width: vw,
                height: vh,
            },
            scene,
            engine
        })

        this.quad.setMaterial(material)
    }
    createMaterial(){
        const {scene, rw, rh, deg} = this

        const material = new BABYLON.ShaderMaterial('material', scene,
            {
                vertexSource: Shader.vertex,
                fragmentSource: Shader.fragment
            },
            {
                attributes: ['position', 'normal', 'uv'],
                uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'viewProjection', 'rw', 'rh', 'deg'],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        )

        // material.setColor3('uColor', this.color)
        material.setFloat('rw', rw)
        material.setFloat('rh', rh)
        material.setFloat('deg', deg)

        return material
    }



    // dispose
    dispose(){
        this.quad.dispose()
    }


    // resize
    resize({rw, rh, vw, vh}){
        this.vw = vw
        this.vh = vh

        this.dispose()
        this.create()
    }
    

    // animate
    animate(){
        this.render()
    }
    render(){
    }
}