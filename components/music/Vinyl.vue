<template>
    <div
        :class="classes.wrapper"
    >

        <div
            :class="classes.box"
            :style="boxStyle"
        >

            <img :class="classes.cover" :src="coverPath" :style="animStyle"/>
            <img :class="classes.img" :src="bgPath" :style="animStyle"/>
            <img :class="classes.img + ' ' + classes.overlay" :src="bgOverlayPath"/>

        </div>
        
    </div>
</template>

<script setup>
import {getImagePath, getAudioPath} from '~/utils/method.file.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {setIdx, playPlayer, stopPlayer, setPlayerSrc} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// props
const props = defineProps({
    nowPlaying: Boolean,
    coverName: String,
})
const {nowPlaying, coverName} = toRefs(props)


// class
const classes = reactive({
    wrapper: 'w-full h-full flex justify-center items-center',
    box: 'w-full h-full flex relative justify-center items-center rounded-[50%] drop-shadow-[0_30px_25px_rgba(0,0,0,0.7)] cursor-pointer',
    img: 'w-full h-full absolute select-none',
    cover: 'w-[50%] h-[50%] absolute select-none',
    overlay: 'mix-blend-overlay rotate-[-40deg]'
})


// box
const boxScale = computed(() => nowPlaying.value ? '0.66' : '0.72')
const boxStyle = computed(() => ({transition: 'transform 0.4s', transform: `scale(${boxScale.value})`}))


// vinyl bg
const coverPath = computed(() => getImagePath(coverName.value))
const bgPath = getImagePath('vinyl.png')
const bgOverlayPath = getImagePath('vinyl_overlay.png')
const animation = computed(() => nowPlaying.value ? 'rotating 9s linear infinite reverse' : 'none')
const animStyle = computed(() => ({animation: animation.value}))
</script>

<style scoped>
    
</style>