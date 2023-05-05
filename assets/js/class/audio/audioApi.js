export default class{
    constructor(){
        this.context = null
        this.analyser = null
        this.source = null

        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.65
        this.audioData = []

        this.init()
    }


    // init
    init(){
        this.createContext()
        this.animate()
    }



    // method
    createContext(){
        this.context = new AudioContext()

        this.analyser = this.context.createAnalyser()
        this.analyser.smoothingTimeConstant = this.smoothingTimeConstant
    }
    connectSource(audio){
        if(!this.source){
            // this.source.disconnect()
            // this.source.disconnect(this.analyser)
            // this.source.
            // this.analyser.disconnect()
            // this.analyser.disconnect(this.context.destination)
            this.source = this.context.createMediaElementSource(audio)
        }

        // this.source = this.context.createMediaElementSource(audio)
        this.source.connect(this.analyser)
        this.analyser.connect(this.context.destination)

        this.audioData = new Uint8Array(this.analyser.frequencyBinCount)
    }


    // animate
    animate(){
        this.updateAudioData()

        requestAnimationFrame(() => this.animate())
    }
    updateAudioData(){
        if(!this.source) return

        this.analyser.getByteFrequencyData(this.audioData)
    }
}