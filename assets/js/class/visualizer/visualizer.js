import Method from '~/utils/method.math.js'
import * as BABYLON from 'babylonjs'
import Spline from '~/utils/cubic-spline.js'

import Circle from './comps/circle.js'

export default class{
    constructor({engine, audio, color}){
        this.engine = engine
        this.audio = audio
        this.color = color

        this.scene = null
        this.camera = null
        this.cameraName = 'visualizerCamera'
        this.cameraPos = new BABYLON.Vector3(0, 0, -100)
        this.rw = this.engine.getRenderWidth()
        this.rh = this.engine.getRenderHeight()
        this.vw = null
        this.vh = null
        
        this.count = 120
        this.splineSmooth = 0.25
        // this.spilneAvgBoost = 1.15
        this.spilneAvgBoost = 1.0
        this.xs = Array.from({length: this.count}, (_, i) => i * 1)
        this.audioData = []
        this.audioOffset = ~~(this.audio.fft / 2 * 0.4)
        this.audioDataLen = this.audio.fft / 2 - this.audioOffset
        this.audioStep = ~~(this.audioDataLen / this.count)

        // const radius = 25
        // const color = BABYLON.Color3.FromHexString('#66faff')
        // const audioBoost = 35

        this.params = [
            {
                module: Circle,
                seg: this.count * 4,
            }
        ]
        this.comps = []

        this.init()
    }


    // event
    show(){

    }
    hide(){

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
            this.updateAudioData()
            this.animateComps()
        })
    }
    renderScene(){
        this.scene.render()
    }
    animateComps(){
        this.comps.forEach(comp => {
            if(comp.animate) comp.animate(this.audioData)
        })
    }


    // audio
    updateAudioData(){
        const {audioData} = this.audio

        if(audioData.length === 0) return

        const stepData = this.createStepAudioData([...audioData])
        this.audioData = this.createSplinedAudioData(stepData)
    }
    createStepAudioData(audioData){
        return Array.from({length: this.count}, (_, i) => audioData[~~(this.audioOffset / 2) + i * this.audioStep] / 255)
    }
    createSplinedAudioData(audioData){
        const len = audioData.length
        const ats = []

        const xs = this.xs
        const ys = audioData
        ys[0] = 0

        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            ats.push(spline.at(i * this.splineSmooth))
        }
        
        // const hats = ats.slice(0, ats.length / 2)
        const avg = (ats.reduce((p, c) => p + c) / len) * this.spilneAvgBoost
        const temp = ats.map((e, i) => Math.max(0, e - avg))

        const reverse = [...temp]
        reverse.reverse()

        return [...temp, ...reverse]
        // return temp
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