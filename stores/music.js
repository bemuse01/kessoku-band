import {defineStore} from 'pinia'
import Method from '~/utils/method.math.js'

export const useMusicStore = defineStore('music', () => {
    // selected music idx
    const idx = ref(0)
    const getIdx = computed(() => idx.value)
    const setIdx = (val, min, max) => {
        idx.value += val
        idx.value = Method.clamp(idx.value, min, max)
    }
    const setIdx2 = (val) => {
        idx.value = val
    }


    // player
    const player = ref(null)
    const getPlayer = computed(() => player.value)
    const setPlayer = (newPlayer) => {
        player.value = newPlayer
    }
    const setVideo = (video) => player.value.setVideo(video)
    const connectSource = (type) => player.value.connectSource(type)
    const getIsPaused = computed(() => player.value.getIsPaused())
    const setSrc = (type, src) => player.value.setSrc(type, src)
    const getSrc = (type) => player.value.getSrc(type)
    const playMedia = (type, playType) => player.value.play(type, playType)
    const pauseMedia = (type) => player.value.pause(type)
    const stopMedia = (type) => player.value.stop(type)
    const resetCurrentTime = () => player.value.resetCurrentTime()
    const getProgress = (type) => player.value.getProgress(type)
    const setProgress = (type, value) => player.value.setProgress(type, value)


    return{
        // idx
        idx,
        getIdx,
        setIdx,
        setIdx2,

        // player
        setPlayer,
        getPlayer,
        setVideo,
        getIsPaused,
        connectSource,
        setSrc,
        getSrc,
        playMedia,
        pauseMedia,
        stopMedia,
        resetCurrentTime,
        getProgress,
        setProgress
    }
})