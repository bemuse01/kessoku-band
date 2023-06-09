import Method from '~/utils/method.math.js'

export default class{
    constructor(){
        this.isPaused = true
        // this.isStop = true
        this.masterVolume = 1
        this.volumeStep = 0.03
        this.stopFlag = true

        this.context = null

        this.media = {
            audio: {
                el: null,
                fadeOutFlag: true,
                fadeInFlag: false,
                source: null,
                analyser: null,
                data: [],
                currentTime: 0
            },
            video: {
                el: null,
                fadeOutFlag: true,
                fadeInFlag: false,
                source: null,
                analyser: null,
                data: [],
                currentTime: 0
            }
        }

        this.lerpVelocity = 0.11
        this.cv = 0
        this.pv = 0

        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.4

        this.init()
    }


    // init
    init(){
        this.createContext()
        this.createAudio()
        this.animate()
    }


    // media
    createAudio(){
        this.media.audio.el = new Audio()
        this.media.audio.el.loop = true
    }
    setVideo(video){
        this.media.video.el = video
        this.media.video.el.loop = true
    }
    getIsPaused(){
        return this.isPaused
    }
    play(type, playType = 'pause'){
        this.media[type].el.play()

        switch(playType){
            case 'pause':
                this.media[type].el.currentTime = this.media[type].currentTime
                break

            case 'stop':
                this.media[type].el.currentTime = 0
                break

            default:
                break
        }

        this.isPaused = false
        this.media[type].fadeInFlag = true
        this.media[type].fadeOutFlag = false
    }
    pause(type){
        this.isPaused = true

        // this.isStop = false
        this.media[type].fadeInFlag = false
        this.media[type].fadeOutFlag = true
    }
    stop(type){
        this.isPaused = true

        // this.isStop = true
        this.media[type].fadeInFlag = false
        this.media[type].fadeOutFlag = true
    }
    setSrc(type, src){
        this.media[type].el.src = src
    }
    getSrc(type){
        return this.media[type].el.src
    }
    resetCurrentTime(){
        for(const key in this.media){
            this.media[key].currentTime = 0
        }
    }
    getProgress(type){
        return this.media[type].el.currentTime / this.media[type].el.duration
    }
    setProgress(type, value){
        this.media[type].el.currentTime = this.media[type].el.duration * value
    }
    getVolume(){
        return this.masterVolume
    }
    setVolume(type, value){
        this.masterVolume = value
        this.media[type].el.volume = value
    }
    toggleStopFlag(){
        this.stopFlag = !this.stopFlag
    }
    getStopFlag(){
        return this.stopFlag
    }


    // audio context
    createContext(){
        this.context = new AudioContext()

        for(const key in this.media){
            this.media[key].analyser = this.context.createAnalyser()
            this.media[key].analyser.fftSize = this.fft
            this.media[key].analyser.smoothingTimeConstant = this.smoothingTimeConstant
        }
    }
    connectSource(type){
        const media = this.media[type]

        if(!media.source){
            media.source = this.context.createMediaElementSource(media.el)
        }

        media.source.connect(media.analyser)
        media.analyser.connect(this.context.destination)
        media.data = new Uint8Array(media.analyser.frequencyBinCount)
    }


    // animate
    animate(){
        for(const key in this.media){
            this.updateData(this.media[key])
            this.fadeInVolume(this.media[key])
            this.fadeOutVolume(this.media[key])
            this.updateCurrentTime(this.media[key])
        }

        requestAnimationFrame(() => this.animate())
    }
    updateCurrentTime(media){
        if(!media.el || this.isPaused) return
        media.currentTime = media.el.currentTime
    }
    updateData(media){
        if(!media.source) return

        media.analyser.getByteFrequencyData(media.data)
    }
    fadeInVolume(media){
        if(!media.el) return

        if(media.fadeInFlag){
            const volume = media.el.volume + this.volumeStep
            media.el.volume = Method.clamp(volume, 0, 1)

            if(media.el.volume >= this.masterVolume){
                media.fadeInFlag = false
            }
        }
    }
    fadeOutVolume(media){
        if(!media.el) return

        if(media.fadeOutFlag){
            const volume = media.el.volume - this.volumeStep
            media.el.volume = Method.clamp(volume, 0, 1)

            if(media.el.volume <= 0){
                media.fadeOutFlag = false
                // if(this.isStop) media.el.currentTime = 0
                media.el.pause()
            }
        }
    }
}