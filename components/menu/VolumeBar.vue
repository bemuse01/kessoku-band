<template>
    <div
        :class="classes.box"
        @mousedown="(e) => onMouseDownThumb(e)"
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
const {getVolume, setVolume} = store
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    box: 'w-[4rem] h-full flex justify-center items-center cursor-pointer',
    wrapper: 'relative w-full h-[3px] flex justify-center items-center',
    trackWrapper: 'absolute w-full h-full rounded-md overflow-hidden',
    track: 'absolute w-full h-full opacity-20 rounded-md',
    thumb: 'absolute scale-[4.5] translate-x-[-50%] h-full aspect-square rounded-[50%]',
    progress: 'absolute w-full h-full',
})


// player
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')


// track
const track = ref(null)
const trackStyle = computed(() => ({background: mainColor.value}))


// progress
const progressScale = ref(getVolume())
const progressStyle = computed(() => ({background: mainColor.value, transform: `scaleX(${progressScale.value.toFixed(3)})`, transformOrigin: 'left'}))
const updateProgress = () => {
    // if(getIsPaused.value) return
    
    progressScale.value = getVolume()
}


// thumb
const thumb = ref(null)
const thumbLeft = ref('0')
const thumbStyle = computed(() => ({background: mainColor.value, left: thumbLeft.value}))
let draggable = false
const updateThumbPosition = (e) => {
    // if(getIsPaused.value) return

    const {clientX} = e
    const thumbWidth = thumb.value.offsetWidth
    const trackWidth = track.value.offsetWidth
    const {left} = track.value.getBoundingClientRect()
    const thumbPosition = clientX - left - thumbWidth / 2
    const progress = Method.clamp(thumbPosition, 0, trackWidth) / trackWidth

    setVolume(mediaType.value, progress)
}
const updateThumbPosition2 = () => {
    // if(getIsPaused.value) return

    const thumbWidth = thumb.value.offsetWidth
    const trackWidth = track.value.offsetWidth

    const left = getVolume() * trackWidth - thumbWidth / 2
    thumbLeft.value = left.toFixed(1) + 'px'
}
const onMouseDownThumb = (e) => {
    draggable = true
    updateThumbPosition(e)
    updateProgress()
    updateThumbPosition2()
}
const onMouseMoveThumb = (e) => {
    if(draggable){
        updateThumbPosition(e)
    }
}
const onMouseUpThumb = () => {
    draggable = false
}


// method
const onMouseMove = (e) => {
    onMouseMoveThumb(e)
    updateProgress()
    updateThumbPosition2()
}
const onMouseUp = () => {
    onMouseUpThumb()
}
const onWindowResize = () => {
    updateThumbPosition2()
}
const init = () => {
    updateThumbPosition2()
    updateProgress()
    document.addEventListener('mousemove', (e) => onMouseMove(e))
    document.addEventListener('mouseup', () => onMouseUp())
    window.addEventListener('resize', () => onWindowResize(), false)
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
</style>