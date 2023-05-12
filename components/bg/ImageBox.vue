<template>
    <div
        :class="classes.box"
        :style="boxStyle"
    >

        <div :class="classes.wrapper" :style="wrapperStyle">
            <img :class="classes.img" :ref="el => img = el"/>
        </div>

    </div>
</template>

<script setup>
import {getImagePath} from '~/utils/method.file.js'
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import Method from '~/utils/method.math.js'
import {RADIAN, GLOBAL_DEGREE} from '~/utils/const.js'


// store
const store = useMusicStore()
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    box: 'image-box absolute h-full top-0 right-0 overflow-hidden',
    wrapper: 'relative w-[100vw] h-full flex items-center',
    img: 'absolute w-full h-full object-cover blur'
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
const wrapperStyle = computed(() => ({opacity: `${co.value.toFixed(3)}`, transform: 'translateX(-50%)', left: '50%'}))


// img
const img = ref(null)
const imgPath = computed(() => getImagePath(musics[getIdx.value].cover_filename))
const hasVideo = computed(() => musics[getIdx.value].video_filename === '' ? false : true)
const setImgSrc = () => {
    img.value.setAttribute('src', imgPath.value)
}
const showImage = () => {
    if(hasVideo.value) return
    setImgSrc()
    po.value = maxOpacity
}
const hideImage = () => {
    if(hasVideo.value) return
    po.value = 0
}
const hideImageByIdx = () => {
    po.value = 0
}
watch(getIdx, () => {
    hideImageByIdx()
})
watch(getIsPaused, (cur, pre) => {
    if(cur) hideImage()
    else showImage()
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