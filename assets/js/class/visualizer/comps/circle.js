import Circle from '../../objects/circle.js'
import {RADIAN} from '~/utils/const.js'

export default class{
    constructor({
        engine,
        scene,
        camera,
        seg,
        vw,
        vh
    }){
        this.engine = engine
        this.scene = scene
        this.camera = camera
        this.seg = seg
        this.vw = vw
        this.vh = vh

        this.boost = 0.5
        this.oPosition = []

        this.init()
    }


    // init
    init(){
        this.create()
    }


    // create
    create(){
        const {engine, scene, seg, vh} = this

        const radius = vh / 2 * 0.72

        this.circle = new Circle({
            geometryOpt: {
                radius: radius,
                tessellation: seg,
                updatable: true
            },
            scene,
            engine
        })

        this.circle.get().rotation.z = -120 * RADIAN

        this.oPosition = [...this.circle.getVerticesData('position')]
    }


    // animate
    animate(audioData){
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
}