<template>
    <div
        :class="classes.box"
        :style="boxStyle"
        @click="() => onClickButton()"
    >
        <div :class="classes.shape">

            <svg width="100%" height="100%" viewBox="0 0 24 24">
                <rect x="0" y="0" width="24" height="24" fill="currentColor"/>
            </svg>

        </div>
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
const {stopMedia, resetCurrentTime, toggleStopFlag} = store
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    box: 'h-full aspect-square flex justify-center items-center cursor-pointer opacity-50 hover:opacity-100',
    shape: 'w-full h-full'
})


// shape
const boxStyle = computed(() => ({color: mainColor.value}))


// player
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')
const stop = () => {
    stopMedia(mediaType.value)
}
const onClickButton = () => {

    stop()
    resetCurrentTime()
    toggleStopFlag()
    
}
</script>

<style scoped>
</style>