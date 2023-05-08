import Method from '~/utils/method.math.js'

export default class{
    constructor(){
        this.audio = null
        this.isPaused = true
        this.isStop = true
        this.masterVolume = 1
        this.volumeStep = 0.03
        this.fadeOutFlag = true
        this.fadeInFlag = false
        this.lerpVelocity = 0.11
        this.cv = 0
        this.pv = 0

        this.context = null
        this.analyser = null
        this.source = null

        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.4
        this.audioData = []

        this.init()
    }


    // init
    init(){
        this.createContext()
        this.createAudio()
        this.animate()
    }


    // audio
    createAudio(){
        this.audio = new Audio()
        this.audio.loop = true
    }
    getIsPaused(){
        return this.isPaused
    }
    setAudioSrc(src){
        this.audio.src = src
    }
    playAudio(){
        this.isPaused = false
        this.audio.play()
        this.fadeInFlag = true
        this.fadeOutFlag = false
    }
    stopAudio(){
        this.isPaused = true
        this.fadeInFlag = false
        this.fadeOutFlag = true
    }


    // audio context
    createContext(){
        this.context = new AudioContext()

        this.analyser = this.context.createAnalyser()
        this.analyser.fftSize = this.fft
        this.analyser.smoothingTimeConstant = this.smoothingTimeConstant
    }
    connectSource(){
        if(!this.source){
            this.source = this.context.createMediaElementSource(this.audio)
        }

        this.source.connect(this.analyser)
        this.analyser.connect(this.context.destination)

        this.audioData = new Uint8Array(this.analyser.frequencyBinCount)
    }


    // animate
    animate(){
        this.updateAudioData()
        // this.updateAudioVolume()
        this.fadeInVolume()
        this.fadeOutVolume()

        requestAnimationFrame(() => this.animate())
    }
    updateAudioData(){
        if(!this.source) return

        this.analyser.getByteFrequencyData(this.audioData)
    }
    fadeInVolume(){
        if(this.fadeInFlag){
            const volume = this.audio.volume + this.volumeStep
            this.audio.volume = Method.clamp(volume, 0, 1)

            if(this.audio.volume >= this.masterVolume){
                this.fadeInFlag = false
            }
        }
    }
    fadeOutVolume(){
        if(this.fadeOutFlag){
            const volume = this.audio.volume - this.volumeStep
            this.audio.volume = Method.clamp(volume, 0, 1)

            if(this.audio.volume <= 0){
                this.fadeOutFlag = false
                if(this.isStop) this.audio.currentTime = 0
                this.audio.pause()
            }
        }
    }
    updateAudioVolume(){
        this.cv = Method.lerp(this.cv, this.pv, this.lerpVelocity)
        this.audio.volume = this.cv
    }
}