import {RADIAN} from '~/utils/const.js'
import Plane from '~/assets/js/class/objects/plane.js'
import GetShaderName from '../shader/quad.shader.js'

export default class{
    constructor({
        engine,
        scene,
        camera,
        color,
        vw,
        vh,
    }){
        this.engine = engine
        this.scene = scene
        this.camera = camera
        this.color = color
        this.vw = vw
        this.vh = vh

        this.sizeRatio = 1.5
        this.deg = 14

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const {scene, engine, vw, vh} = this

        const {material} = this.createMaterial()

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
        const shaderName = GetShaderName()

        const material = new BABYLON.ShaderMaterial('material', this.scene,
            {
                vertex: shaderName,
                fragment: shaderName
            },
            {
                attributes: ['position', 'normal', 'uv'],
                uniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection', 'viewProjection', 'uColor'],
                needAlphaBlending: true,
                needAlphaTesting: true,
            }
        )

        // material.setColor3('uColor', this.color)

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