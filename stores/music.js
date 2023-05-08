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
    const connectSource = () => player.value.connectSource()
    const getIsPaused = computed(() => player.value.getIsPaused())
    const setAudioSrc = (src) => player.value.setAudioSrc(src)
    const playAudio = () => player.value.playAudio()
    const stopAudio = () => player.value.stopAudio()


    return{
        // idx
        idx,
        getIdx,
        setIdx,

        // player
        setPlayer,
        getPlayer,
        getIsPaused,
        connectSource,
        setAudioSrc,
        playAudio,
        stopAudio
    }
})