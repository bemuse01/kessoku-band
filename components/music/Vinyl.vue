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
import {VINYL_SCALE, VINYL_SCALE_SMALL, VINYL_SCALE_MIN, SCREEN_SIZE_640, SCREEN_SIZE_480} from '~/utils/const.js'
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


// wrapper
// const wrapperStyle = computed(() => ({transform: `translateY(-${VINYL_POSITION * 100}vh)`}))


// box
const boxSize = ref(VINYL_SCALE)
const boxScale = computed(() => nowPlaying.value ? `${boxSize.value - 0.06}` : `${boxSize.value}`)
const boxStyle = computed(() => ({transition: 'transform 0.5s', transform: `scale(${boxScale.value})`}))
const setBoxSize = () => {
    const {innerWidth} = window

    if(innerWidth < SCREEN_SIZE_480){
        boxSize.value = VINYL_SCALE_MIN
    }else if(innerWidth < SCREEN_SIZE_640){
        boxSize.value = VINYL_SCALE_SMALL
    }else{
        boxSize.value = VINYL_SCALE
    }
}


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
const onWindowResize = () => {
    setBoxSize()
}
const init = () => {
    setBoxSize()
    window.addEventListener('resize', () => onWindowResize(), false)
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
    
</style>