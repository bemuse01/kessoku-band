<template>
    <div
        :class="classes.wrapper"
    >

        <div
            :class="classes.box"
            :style="boxStyle"
        >

            <img :class="classes.cover" :src="coverPath" :style="animStyle" :draggable="draggable"/>
            <img :class="classes.img" :src="bgPath" :style="animStyle" :draggable="draggable"/>
            <img :class="classes.img + ' ' + classes.overlay" :src="bgOverlayPath" :draggable="draggable"/>

        </div>
        
    </div>
</template>

<script setup>
import {getImagePath} from '~/utils/method.file.js'
import {VINYL_SCALE} from '~/utils/const.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {getIdx} = storeToRefs(store)


// props
const props = defineProps({
    nowPlaying: Boolean,
    coverName: String,
})
const {nowPlaying, coverName} = toRefs(props)


// class
const classes = reactive({
    wrapper: 'w-full h-full flex justify-center items-center',
    box: 'w-full h-full flex relative justify-center items-center rounded-[50%] drop-shadow-[0_30px_25px_rgba(0,0,0,0.75)] cursor-pointer',
    img: 'w-full h-full absolute select-none',
    cover: 'w-[50%] h-[50%] absolute select-none',
    overlay: 'mix-blend-overlay rotate-[-40deg]'
})


// box
const boxScale = computed(() => nowPlaying.value ? '0.66' : `${VINYL_SCALE}`)
const boxStyle = computed(() => ({transition: 'transform 0.5s', transform: `scale(${boxScale.value})`}))


// vinyl bg
const draggable = ref(false)
const coverPath = computed(() => getImagePath(coverName.value))
const bgPath = getImagePath('vinyl.png')
const bgOverlayPath = getImagePath('vinyl_overlay.png')
const animation = ref('rotating 8s linear infinite reverse')
const animationState = computed(() => nowPlaying.value ? 'running' : 'paused')
const animStyle = computed(() => ({animation: `${animation.value} ${animationState.value}`}))
watch(nowPlaying, () => {
    animation.value = 'rotating 8s linear infinite reverse'
})
watch(getIdx, () => {
    animation.value = 'none'
})


// method
const animate = () => {
    animateVinyl()
    animation.value = requestAnimationFrame(() => animate())
}


// hook
onMounted(() => {

})
</script>

<style scoped>
    
</style>