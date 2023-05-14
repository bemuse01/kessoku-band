<template>
    <div
        :class="classes.box"
    >

        <div :class="classes.boxBg"></div>

        <div :class="classes.logoBg" :style="logoStyle"></div>
    
        <div
            :class="classes.wrapper"
        >

            <div :class="classes.menuBg" :style="menuBgStyle"></div>

            <div :class="classes.controls">

                <play-button />

                <stop-button />

                <progress-bar />

                <volume-bar />

            </div>

        </div>

    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {GLOBAL_DEGREE} from '~/utils/const.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import PlayButton from './PlayButton.vue'
import StopButton from './StopButton.vue'
import ProgressBar from './ProgressBar.vue'
import VolumeBar from './VolumeBar.vue'


// store
const store = useMusicStore()
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    box: 'menu-box flex-1 w-full h-full',
    boxBg: 'absolute w-full h-full bg-[rgba(255,255,255,0.1)] mix-blend-overlay backdrop-blur',
    logoBg: 'absolute right-[-1rem] w-[10rem] h-full bg-[hsl(206,15%,7%)]',
    wrapper: 'absolute w-[50%] h-full flex justify-center items-center',
    menuBg: 'absolute right-0 w-[200%] h-full bg-[hsl(206,15%,7%)]',
    controls: 'absolute w-auto h-[1.25rem] flex gap-4'
})


// box
// const boxBg = computed(() => `${musics[getIdx.value].color}`)
// const boxStyle = computed(() => ({background: 'linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent)'}))
// const boxStyle = computed(() => ({background: 'rgba(0, 0, 0, 0.1)'}))


// menu
const menuBgStyle = computed(() => ({transform: `skewX(-${GLOBAL_DEGREE}deg)`}))


// logo
const logoStyle = computed(() => ({transform: `skewX(-${GLOBAL_DEGREE}deg)`}))
</script>

<style scoped>
    
</style>