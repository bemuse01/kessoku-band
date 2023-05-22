<template>
    <div
        :class="classes.box"
        @mousedown="(e) => onMouseDownThumb(e)"
        @touchstart="() => onTouchStartThumb()"
    >

        <div :class="classes.wrapper" :ref="el => track = el">

            <div :class="classes.trackWrapper">
    
                <div :class="classes.track" :style="trackStyle"></div>

                <div :class="classes.progress" :style="progressStyle"></div>

            </div>
        
            <div :class="classes.thumb" :style="thumbStyle" :ref="el => thumb = el"></div>

        </div>

    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import Method from '~/utils/method.math.js'


// props
const props = defineProps({
    mainColor: String
})
const {mainColor} = toRefs(props)


// store
const store = useMusicStore()
const {getProgress, setProgress} = store
const {getIdx, getIsPaused, getStopFlag} = storeToRefs(store)


// class
const classes = reactive({
    box: 'box w-[14rem] h-full flex justify-center items-center cursor-pointer',
    wrapper: 'relative w-full h-[3px] flex justify-center items-center',
    trackWrapper: 'absolute w-full h-full rounded-md overflow-hidden',
    track: 'absolute w-full h-full opacity-20 rounded-md',
    thumb: 'thumb absolute translate-x-[-50%] h-full aspect-square rounded-[50%]',
    progress: 'absolute w-full h-full',
})


// player
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')


// track
const track = ref(null)
const trackStyle = computed(() => ({background: mainColor.value}))


// thumb
const thumb = ref(null)
const thumbStyle = computed(() => ({background: mainColor.value, left: '0'}))
let draggable = false
let touchable = false
const updateThumbPosition = (e) => {
    if(getIsPaused.value) return

    const {clientX} = e
    const thumbWidth = thumb.value.offsetWidth
    const trackWidth = track.value.offsetWidth
    const {left} = track.value.getBoundingClientRect()
    const thumbPosition = clientX - left - thumbWidth / 2
    const progress = Method.clamp(thumbPosition, 0, trackWidth) / trackWidth

    setProgress(mediaType.value, progress)
}
const updateThumbPosition2 = () => {
    if(getIsPaused.value) return

    const thumbWidth = thumb.value.offsetWidth
    const trackWidth = track.value.offsetWidth

    const left = getProgress(mediaType.value) * trackWidth - thumbWidth / 2
    thumbStyle.value.left = left.toFixed(1) + 'px'
}
const resetThumb = () => {
    thumbStyle.value.left = '0'
}
// mouse
const onMouseDownThumb = (e) => {
    draggable = true
    updateThumbPosition(e)
}
const onMouseMoveThumb = (e) => {
    if(draggable){
        updateThumbPosition(e)
    }
}
const onMouseUpThumb = () => {
    draggable = false
}
// touch
const onTouchStartThumb = () => {
    touchable = true
}
const onTouchMoveThumb = (e) => {
    if(touchable){
        updateThumbPosition(e)
    }
}
const onTouchEndThumb = () => {
    touchable = false
}


// progress
const progressScale = ref(0)
const progressStyle = computed(() => ({background: mainColor.value, transform: `scaleX(${progressScale.value.toFixed(3)})`, transformOrigin: 'left'}))
const updateProgress = () => {
    if(getIsPaused.value) return
    
    progressScale.value = getProgress(mediaType.value)
}
const resetProgress = () => {
    progressScale.value = 0
}
watch(getIdx, () => {
    resetProgress()
})


// stop flag
watch(getStopFlag, () => {
    resetProgress()
    resetThumb()
})



// method
const animate = () => {
    updateProgress()
    updateThumbPosition2()
    requestAnimationFrame(() => animate())
}
// mouse
const onMouseMove = (e) => {
    onMouseMoveThumb(e)
}
const onMouseUp = () => {
    onMouseUpThumb()
}
// touch
const onTouchmove = (e) => {
    const event = e.touches[0]
    onTouchMoveThumb(event)
    updateProgress()
    updateThumbPosition2()
}
const onTouchend = () => {
    onTouchEndThumb()
}
const init = () => {
    animate()
    document.addEventListener('mousemove', (e) => onMouseMove(e))
    document.addEventListener('mouseup', () => onMouseUp())
    window.addEventListener('touchmove', (e) => onTouchmove(e))
    window.addEventListener('touchend', () => onTouchend())
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
.thumb{
    transition: transform 0.1s;
    transform: scale(0);
}
.box:hover .thumb{
    transform: scale(4.5);
}
</style>