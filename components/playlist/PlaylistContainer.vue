<template>
    <div>
        
    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {getAudioPath} from '~/utils/method.file.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import * as Tone from 'tone'


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


// const init = async () => {
//     await Tone.start()

//     const path = getAudioPath('rockn_roll.mp3')
//     const player = new Tone.Player({loop: true, autostart: false}).toDestination()
//     await player.load(path)

//     player.start()
// }


// hook
onMounted(() => {
    initPlayer(new Audio())
    // window.addEventListener('click', () => init())
})
</script>

<style scoped>
    
</style>