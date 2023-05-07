import Circle from '../../objects/circle.js'

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
                tessellation: seg
            },
            scene,
            engine
        })
    }
}