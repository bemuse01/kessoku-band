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
    const playMedia = (type) => player.value.play(type)
    const stopMedia = (type) => player.value.stop(type)


    return{
        // idx
        idx,
        getIdx,
        setIdx,

        // player
        setPlayer,
        getPlayer,
        setVideo,
        getIsPaused,
        connectSource,
        setSrc,
        playMedia,
        stopMedia
    }
})