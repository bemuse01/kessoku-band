<template>
    <div>
        
    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json' 
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {initPlayer, setIdx, playPlayer, stopPlayer, setPlayerSrc} = store
const {getIdx, isPaused} = storeToRefs(store)


// player
// const currentMusicPath = computed(() => musics[getIdx.value].audio_filename)
// watch(getIdx, (cur, pre) => {
//     player.src = currentMusicPath.value
// })
// const play = () => {
//     setPlayerSrc(currentMusicPath.value)
//     playPlayer()
// }
// const stop = () => {
//     stopPlayer()
// }
// watch(isPaused, (cur, pre) => {
//     if(cur) play()
//     else stop()
// })


// hook
onMounted(() => initPlayer(new Audio()))
</script>

<style scoped>
    
</style>