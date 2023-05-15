import Circle from '../../objects/circle.js'
import {RADIAN, GLOBAL_DEGREE, VINYL_SCALE, VINYL_SCALE_SMALL, VINYL_SCALE_MIN, SCREEN_SIZE_640, SCREEN_SIZE_480} from '~/utils/const.js'
import Method from '~/utils/method.math.js'

export default class{
    constructor({
        engine,
        scene,
        camera,
        seg,
        rw,
        vh
    }){
        this.engine = engine
        this.scene = scene
        this.camera = camera
        this.seg = seg
        this.rw = rw
        this.vh = vh

        this.boost = 0.5
        this.oPosition = []

        this.lerpVelocity = 0.11
        this.cv = 0
        this.pv = 0

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const {engine, scene, seg, rw, vh} = this

        let scale = VINYL_SCALE

        if(rw < SCREEN_SIZE_480) scale = VINYL_SCALE_MIN
        else if(rw < SCREEN_SIZE_640) scale = VINYL_SCALE_SMALL

        const radius = vh / 2 * scale

        // const node = new BABYLON.TransformNode()

        this.circle = new Circle({
            geometryOpt: {
                radius: 1,
                tessellation: seg,
                updatable: true
            },
            scene,
            engine
        })

        // this.circle.get().parent = node
        // node.position.y = vh * VINYL_POSITION
        // node.position.x = vh * VINYL_POSITION / Math.tan(-(90 + GLOBAL_DEGREE) * RADIAN) / 2
        // console.log(vh * VINYL_POSITION, node.position.y / Math.tan(-(90 + GLOBAL_DEGREE) * RADIAN))

        this.circle.get().rotation.z = -(90 + GLOBAL_DEGREE) * RADIAN
        this.circle.get().scaling.x = radius
        this.circle.get().scaling.y = radius

        this.oPosition = [...this.circle.getVerticesData('position')]
    }


    // event
    show(){
        this.pv = 1
    }
    hide(){
        this.pv = 0
    }


    // resize
    resize({rw, vh}){
        this.vh = vh
        
        if(rw < SCREEN_SIZE_480){
            this.resizeCircle(VINYL_SCALE_MIN)
        }else if(rw < SCREEN_SIZE_640){
            this.resizeCircle(VINYL_SCALE_SMALL)
        }else{
            this.resizeCircle(VINYL_SCALE)
        }
    }
    resizeCircle(scale){
        const radius = this.vh / 2 * scale
        this.circle.get().scaling.x = radius
        this.circle.get().scaling.y = radius
    }


    // animate
    animate(audioData){
        this.cv = Method.lerp(this.cv, this.pv, this.lerpVelocity)

        this.updateCirclePosition(audioData)
        this.updateCircleScale()
    }
    updateCirclePosition(audioData){
        const {oPosition, boost} = this

        const position = this.circle.getVerticesData('position')

        for(let i = 1; i < position.length / 3 - 1; i++){
            const idx = i * 3

            const data = audioData[(i - 1) % audioData.length]

            position[idx + 0] = oPosition[idx + 0] * (1 + data * boost)
            position[idx + 1] = oPosition[idx + 1] * (1 + data * boost)
        }

        this.circle.updateVerticesData('position', position)
    }
    updateCircleScale(){
        const material = this.circle.getMaterial()
        material.alpha = this.cv
    }
}