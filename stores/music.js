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

    return{
        idx,
        getIdx,
        setIdx,
    }
})