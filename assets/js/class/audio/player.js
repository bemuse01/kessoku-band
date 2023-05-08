import Method from '~/utils/method.math.js'

export default class{
    constructor(){
        this.isPaused = true
        this.isStop = true
        this.masterVolume = 1
        this.volumeStep = 0.03

        this.context = null

        this.audio = null
        this.audioFadeOutFlag = true
        this.audioFadeInFlag = false
        this.audioSource = null
        this.audioAnalyser = null

        this.video = null
        this.videoFadeOutFlag = true
        this.videoFadeInFlag = false
        this.videoSource = null
        this.videoAnalyser = null

        this.lerpVelocity = 0.11
        this.cv = 0
        this.pv = 0

        this.fft = 2 ** 14
        this.smoothingTimeConstant = 0.4
        this.audioData = []
        this.videoData = []

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
        this.audioFadeInFlag = true
        this.audioFadeOutFlag = false
    }
    stopAudio(){
        this.isPaused = true
        this.audioFadeInFlag = false
        this.audioFadeOutFlag = true
    }
    setVideo(video){
        this.video = video
    }
    setVideoSrc(src){
        this.video.src = src
    }
    playVideo(){
        this.isPaused = false
        this.video.play()
        this.videoFadeInFlag = true
        this.videoFadeOutFlag = false
    }
    stopVideo(){
        this.isPaused = true
        this.videoFadeInFlag = false
        this.videoFadeOutFlag = true
    }


    // audio context
    createContext(){
        this.context = new AudioContext()

        this.audioAnalyser = this.context.createAnalyser()
        this.audioAnalyser.fftSize = this.fft
        this.audioAnalyser.smoothingTimeConstant = this.smoothingTimeConstant

        this.videoAnalyser = this.context.createAnalyser()
        this.videoAnalyser.fftSize = this.fft
        this.videoAnalyser.smoothingTimeConstant = this.smoothingTimeConstant
    }
    connectSource(media){
        switch(media){
            case 'audio':
                if(!this.audioSource){
                    this.audioSource = this.context.createMediaElementSource(this.audio)
                }

                this.audioSource.connect(this.audioAnalyser)
                this.audioAnalyser.connect(this.context.destination)
                this.audioData = new Uint8Array(this.audioAnalyser.frequencyBinCount)
                break
            case 'video':
                if(!this.videoSource){
                    this.videoSource = this.context.createMediaElementSource(this.video)
                }

                this.videoSource.connect(this.videoAnalyser)
                this.videoAnalyser.connect(this.context.destination)
                this.videoData = new Uint8Array(this.videoAnalyser.frequencyBinCount)
                break
            default:
                break
        }
    }


    // animate
    animate(){
        this.updateAudioData()
        this.updateVideoData()
        // this.updateAudioVolume()
        this.fadeInVolume('audio')
        this.fadeOutVolume('audio')
        this.fadeInVolume('video')
        this.fadeOutVolume('video')

        requestAnimationFrame(() => this.animate())
    }
    updateAudioData(){
        if(!this.audioSource) return

        this.audioAnalyser.getByteFrequencyData(this.audioData)
    }
    updateVideoData(){
        if(!this.videoSource) return

        this.videoAnalyser.getByteFrequencyData(this.videoData)
    }
    fadeInVolume(media){
        if(!this[media]) return

        if(this[media + 'FadeInFlag']){
            const volume = this[media].volume + this.volumeStep
            this[media].volume = Method.clamp(volume, 0, 1)

            if(this[media].volume >= this.masterVolume){
                this[media + 'FadeInFlag'] = false
            }
        }
    }
    fadeOutVolume(media){
        if(!this[media]) return

        if(this[media + 'FadeOutFlag']){
            const volume = this[media].volume - this.volumeStep
            this[media].volume = Method.clamp(volume, 0, 1)

            if(this[media].volume <= 0){
                this[media + 'FadeOutFlag'] = false
                if(this.isStop) this[media].currentTime = 0
                this[media].pause()
            }
        }
    }
    updateAudioVolume(){
        this.cv = Method.lerp(this.cv, this.pv, this.lerpVelocity)
        this.audio.volume = this.cv
    }
}