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
    const isPaused = ref(true)
    const initPlayer = (audio) => {
        player.value = audio
        player.value.loop = true
    } 
    const setPlayerSrc = (src) => player.value.src = src 
    const stopPlayer = () => {
        isPaused.value = true
        player.value.pause()
    }
    const playPlayer = () => {
        isPaused.value = false
        player.value.play()
    }
    const getIsPaused = computed(() => isPaused.value)


    return{
        // idx
        idx,
        getIdx,
        setIdx,

        // player
        initPlayer,
        stopPlayer,
        playPlayer,
        setPlayerSrc,
        getIsPaused,
    }
})