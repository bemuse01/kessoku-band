<template>
    <div
        :class="classes.box"
        :style="boxStyle"
        @click="() => onClickButton()"
    >
        <svg width="100%" height="100%" viewBox="0 0 50 50">

            <template v-if="getIsPaused">
                <!-- <path  d="M8 5v14l11-7z"/> -->
                <path fill="currentColor" d="M50,25 L0,50 L0,0 L50,25 Z"/>
            </template>

            <template v-else>
                <path fill="currentColor" d="M0,0 L19,0 L19,50 L0,50 L0,0 Z"/>
                <path fill="currentColor" d="M31,0 L50,0 L50,50 L31,50 L31,0 Z"/>
            </template>

        </svg>
    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// props
const props = defineProps({
    mainColor: String
})
const {mainColor} = toRefs(props)


// store
const store = useMusicStore()
const {connectSource, setSrc, playMedia, stopMedia} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    box: 'h-full aspect-square cursor-pointer opacity-50 hover:opacity-100'
})


// box
const boxStyle = computed(() => ({color: mainColor.value}))


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