import Method from '~/utils/method.js'
import * as BABYLON from 'babylonjs'

import Quad from './comps/quad.js'

export default class{
    constructor({engine, audio, color}){
        this.engine = engine
        this.audio = audio
        this.color = color

        this.scene = null
        this.camera = null
        this.cameraName = 'waveCamaera'
        this.cameraPos = new BABYLON.Vector3(0, 0, -100)
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.vw = null
        this.vh = null
        
        // const radius = 25
        // const color = BABYLON.Color3.FromHexString('#66faff')
        // const audioBoost = 35

        this.params = [
            {
                module: Quad
            }
        ]
        this.comps = []

        this.init()
    }


    // init
    init(){
        this.create()
        this.render()
    }


    // create
    create(){
        this.createRenderObject()
        this.createObject()
    }
    createRenderObject(){
        this.scene = new BABYLON.Scene(this.engine)
        // this.scene.autoClear = false
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)

        this.camera = new BABYLON.FreeCamera(this.cameraName, this.cameraPos, this.scene)
        this.camera.setTarget(BABYLON.Vector3.Zero())
        
        this.aspect = this.engine.getAspectRatio(this.camera)
        this.vw = Method.getVisibleWidth(this.camera, this.aspect, 0)
        this.vh = Method.getVisibleHeight(this.camera, 0)
    }
    createObject(){
        for(const param of this.params){
            const instance = param.module

            this.comps.push(
                new instance({
                    scene: this.scene, 
                    engine: this.engine, 
                    audio: this.audio, 
                    camera: this.camera,
                    rw: this.rw,
                    rh: this.rh,
                    vw: this.vw,
                    vh: this.vh,
                    ...param
                })
            )
        }
    }


    // render
    render(){
        this.engine.runRenderLoop(() => {
            this.renderScene()
            this.animateComps()
        })
    }
    renderScene(){
        this.scene.render()
    }
    animateComps(){
        // const {audioData} = this.audio

        this.comps.forEach(comp => {
            if(comp.animate) comp.animate()
        })
    }


    // resize
    resize(){
        this.resizeViewports()
        this.resizeComps()
    }
    resizeViewports(){
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.aspect = this.engine.getAspectRatio(this.camera)
        this.vw = Method.getVisibleWidth(this.camera, this.aspect, 0)
        this.vh = Method.getVisibleHeight(this.camera, 0)
    }
    resizeComps(){
        const {rw, rh, vw, vh} = this

        this.comps.forEach(comp => {
            if(comp.resize) comp.resize({rw, rh, vw, vh})
        })
    }
}