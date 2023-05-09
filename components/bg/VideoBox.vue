<template>
    <div
        :class="classes.box"
        :style="boxStyle"
    >

        <div :class="classes.wrapper" :style="wrapperStyle">
            <video :class="classes.video" :ref="el => video = el">
                <!-- <source :src="videoSrc"/> -->
            </video>
        </div>

    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import Method from '~/utils/method.math.js'
import {RADIAN, GLOBAL_DEGREE} from '~/utils/const.js'


// store
const store = useMusicStore()
const {setVideo} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    box: 'absolute h-full top-0 right-0 overflow-hidden',
    wrapper: 'relative w-[100vw] h-full ',
    video: 'absolute left-0 w-full h-full object-cover bg-cover'
})


// box
const boxWidth = ref(0)
const boxStyle = computed(() => ({width: `${boxWidth.value}px`}))
const setBoxWidth = () => {
    const {innerWidth, innerHeight} = window
    
    const halfw = innerWidth / 2
    const halfh = innerHeight / 2

    const y = halfh
    const x = Math.abs(y / Math.tan((90 - GLOBAL_DEGREE) * RADIAN))

    boxWidth.value = x + halfw + 5
}


// wrapper
const lerpVelocity = 0.11
const co = ref(0)
const po = ref(0)
const maxOpacity = 0.3
const wrapperStyle = computed(() => ({opacity: `${co.value}`, transform: 'translateX(-50%)', left: '50%'}))


// video
const video = ref(null)
const videoName = computed(() => musics[getIdx.value].video_filename)
const hasVideo = computed(() => videoName.value === '' ? false : true)
const initVideo = () => {
    setVideo(video.value)
}
const showVideo = () => {
    if(!hasVideo.value) return
    po.value = maxOpacity
}
const hideVideo = () => {
    if(!hasVideo.value) return
    po.value = 0
}
watch(getIsPaused, (cur, pre) => {
    if(cur) hideVideo()
    else showVideo()
})


// method
const onWindowResize = () => {
    setBoxWidth()
}
const animate = () => {
    co.value = Method.lerp(co.value, po.value, lerpVelocity)

    requestAnimationFrame(() => animate())
}
const init = () => {
    initVideo()
    setBoxWidth()
    animate()
    window.addEventListener('resize', () => onWindowResize(), false)
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
    
</style>