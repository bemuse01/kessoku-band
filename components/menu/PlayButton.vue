<template>
    <div
        :class="classes.box"
        :style="boxStyle"
        @click="() => onClickButton()"
    >
        <svg width="100%" height="100%" viewBox="0 0 24 24">

            <template v-if="getIsPaused">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
            </template>

            <template v-else>
                <rect x="6" y="5" width="4" height="14" fill="currentColor"/>
                <rect x="14" y="5" width="4" height="14" fill="currentColor"/>
            </template>

        </svg>
    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {setIdx, connectSource, setSrc, playMedia, stopMedia} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    box: 'h-full aspect-square cursor-pointer opacity-50 hover:opacity-100'
})


// box
const boxColor = computed(() => musics[getIdx.value].color)
const boxStyle = computed(() => ({color: boxColor.value}))


// player
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')
const videoPath = computed(() => getVideoPath(musics[getIdx.value].video_filename))
const audioPath = computed(() => getAudioPath(musics[getIdx.value].audio_filename))
const setMediaSrc = () => {
    if(mediaType.value === 'video'){
        setSrc(mediaType.value, videoPath.value)
    }else{
        setSrc(mediaType.value, audioPath.value)
    }
}
const play = () => {
    playMedia(mediaType.value)
}
const stop = () => {
    stopMedia(mediaType.value)
}
const connect = () => {
    connectSource(mediaType.value)
}
const onClickButton = () => {

    if(getIsPaused.value){

        setMediaSrc()
        play()
        connect()

    }else{

        stop()

    }
    
}
</script>

<style scoped>
</style>