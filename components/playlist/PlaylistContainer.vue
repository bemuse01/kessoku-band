<template>
    <div>
        
    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {getAudioPath} from '~/utils/method.file.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
// import * as Tone from 'tone'


// store
const store = useMusicStore()
const {initPlayer, setIdx, playPlayer, stopPlayer, setPlayerSrc} = store
const {getIdx, isPaused} = storeToRefs(store)

</script>

<style scoped>
    
</style>