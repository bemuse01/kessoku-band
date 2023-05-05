<template>
    <div
        :class="classes.wrapper"
    >

        <div
            :class="classes.box"
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
    box: 'w-[72%] h-[72%] flex relative justify-center items-center rounded-[50%] drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] cursor-pointer',
    img: 'w-full h-full absolute select-none',
    cover: 'w-[50%] h-[50%] absolute select-none',
    overlay: 'mix-blend-overlay rotate-[-40deg]'
})


// vinyl bg
const coverPath = computed(() => getImagePath(coverName.value))
const bgPath = getImagePath('vinyl.png')
const bgOverlayPath = getImagePath('vinyl_overlay.png')
const animation = computed(() => nowPlaying.value ? 'rotating 9s linear infinite reverse' : 'none')
const animStyle = computed(() => ({animation: animation.value}))
</script>

<style scoped>
    
</style>