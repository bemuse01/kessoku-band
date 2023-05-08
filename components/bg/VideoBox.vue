<template>
    <div
        :class="classes.box"
    >

        <div :class="classes.wrapper" :style="wrapperStyle">
            <video :class="classes.video" :ref="el => video = el">
                <!-- <source :src="videoSrc"/> -->
            </video>
        </div>

    </div>
</template>

<script setup>
import {getVideoPath} from '~/utils/method.file.js'
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import Method from '~/utils/method.math.js'


// store
const store = useMusicStore()
const {setVideo} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    box: 'absolute w-[60%] h-full top-0 right-0 overflow-hidden',
    wrapper: 'relative w-[100vw] h-full ',
    video: 'absolute left-0 w-full h-full object-cover bg-cover'
})


// wrapper
const lerpVelocity = 0.11
const co = ref(0)
const po = ref(0)
const wrapperStyle = computed(() => ({opacity: `${co.value}`, transform: 'translateX(-50%)', left: '50%'}))


// video
const video = ref(null)
const videoName = computed(() => musics[getIdx.value].video_filename)
// const videoSrc = computed(() => videoName.value !== '' ? getVideoPath(videoName.value) : '')
const hasVideo = computed(() => videoName.value === '' ? false : true)
const initVideo = () => {
    video.value.loop = true
    setVideo(video.value)
}
const showVideo = () => {
    if(!hasVideo.value) return
    po.value = 0.5
    // video.value.play()
}
const hideVideo = () => {
    if(!hasVideo.value) return
    po.value = 0
    // video.value.pause()
}
watch(getIsPaused, (cur, pre) => {
    if(cur) hideVideo()
    else showVideo()
})


// method
const animate = () => {
    co.value = Method.lerp(co.value, po.value, lerpVelocity)

    requestAnimationFrame(() => animate())
}


// hook
onMounted(() => {
    initVideo()
    animate()
})
</script>

<style scoped>
    
</style>