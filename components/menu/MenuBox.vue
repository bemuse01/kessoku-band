<template>
    <div
        :class="classes.box"
    >

        <div :class="classes.boxBg"></div>
    
        <div
            :class="classes.wrapper"
        >

            <div
                :class="classes.menuBg"
                :style="bgStyle"
            >

            </div>

        </div>

    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {GLOBAL_DEGREE} from '~/utils/const.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    box: 'flex-1 w-full h-full',
    boxBg: 'absolute w-full h-full bg-[rgba(255,255,255,0.0)] mix-blend-overlay',
    wrapper: 'absolute w-[50%] h-full',
    menuBg: 'absolute right-0 w-[200%] h-full bg-[#1b1f22]',
})


// box
const boxBg = computed(() => `${musics[getIdx.value].color}`)
// const boxStyle = computed(() => ({background: 'linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent)'}))
// const boxStyle = computed(() => ({background: 'rgba(0, 0, 0, 0.1)'}))


// bg
const bgStyle = computed(() => ({transform: `skewX(-${GLOBAL_DEGREE}deg)`}))
</script>

<style scoped>
    
</style>