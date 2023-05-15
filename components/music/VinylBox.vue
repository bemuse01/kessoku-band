<template>
    <div
        :class="classes.container"
    >
        
        <div
            :class="classes.box"
            :style="boxStyle"
        >
            <div
                :class="classes.wheel"
                :style="wheelStyle"
            >

                <Vinyl
                    v-for="vinyl in vinyls"
                    :key="vinyl.key"
                    :coverName="vinyl.coverName"
                    :nowPlaying="vinyl.nowPlaying"
                    @click="() => onVinylClick(vinyl.key, vinyl.nowPlaying)"
                >

                </Vinyl>

            </div>

        </div>

    </div>
</template>

<script setup>
import {GLOBAL_DEGREE, MENU_HEIGHT} from '~/utils/const.js'
import {getAudioPath, getVideoPath} from '~/utils/method.file.js'
import Method from '~/utils/method.math.js'
import Vinyl from './Vinyl.vue'
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import {throttle} from 'lodash'


// store
const store = useMusicStore()
const {setIdx, connectSource, setSrc, getSrc, playMedia, stopMedia, resetCurrentTime} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    container: 'vinyl-box overflow-hidden w-full h-full flex justify-center items-center',
    box: 'h-full aspect-square',
    wheel: 'w-full h-full',
    item: 'w-full h-full bg-[rgba(255,0,0,0.5)] rounded-[25%]'
})


// box
const boxStyle = computed(() => ({transform: `rotate(${GLOBAL_DEGREE}deg)`}))


// vinyls
const vinyls = ref(musics.map(music => ({
    key: music.id,
    coverName: music.cover_filename,
    nowPlaying: false,
    rotate: false
})))
const setVinylState = (key) => {
    vinyls.value.forEach(vinyl => {
        if(vinyl.key === key) vinyl.nowPlaying = true
        else vinyl.nowPlaying = false
    })
}
const resetVinylState = () => {
    vinyls.value.forEach(vinyl => vinyl.nowPlaying = false)
}
watch(getIsPaused, (cur) => {
    if(cur) resetVinylState()
    else setVinylState(getIdx.value)
})


// wheel
const lerpVelocity = 0.11
const cy = ref(0)
const py = ref(0)
const wheelStyle = computed(() => ({transform: `translateY(-${cy.value.toFixed(1)}%)`}))
const updateCy = () => {
    cy.value = Method.lerp(cy.value, py.value, lerpVelocity)
}
const updatePy = () => {
    py.value = getIdx.value * 100
}
const updateIdx = (deltaY) => {
    if(!getIsPaused.value) return

    const direction = Math.sign(deltaY)

    setIdx(direction, 0, vinyls.value.length - 1)
    updatePy(direction)
}
watch(getIdx, () => updatePy())


// touch
const touchable = ref(false)
const startY = ref(0)


// player
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')
const videoPath = computed(() => getVideoPath(musics[getIdx.value].video_filename))
const audioPath = computed(() => getAudioPath(musics[getIdx.value].audio_filename))
watch(getIdx, () => {
    resetVinylState()
    resetCurrentTime()
})
const setMediaSrc = () => {
    if(mediaType.value === 'video'){
        setSrc(mediaType.value, videoPath.value)
    }else{
        setSrc(mediaType.value, audioPath.value)
    }
}
const play = () => {
    playMedia(mediaType.value, 'pause')
}
const stop = () => {
    stopMedia(mediaType.value)
}
const connect = () => {
    connectSource(mediaType.value)
}
const onVinylClick = (idx, nowPlaying) => {
    if(idx !== getIdx.value) return

    // nowPlaying: 현재 재생중인 비닐 이외의 다른 비닐을 클릭 했을 때 rotate를 멈추기 위한 property
    // if(nowPlaying){

        if(getIsPaused.value){

            setMediaSrc()
            play()
            connect()

        }else{

            stop()

        }

    // }else{

    //     stop()
    //     play()
    //     connect()

    // }
    
}


// method
const onMouseWheel = (e) => {
    updateIdx(e.deltaY)
}
const onTouchStart = (e) => {
    startY.value = e.touches[0].clientY
    touchable.value = true
}
const onTouchMove = throttle((e) => {
    if(!touchable.value) return

    const deltaY = e.touches[0].clientY - startY.value

    updateIdx(-deltaY)

}, 100)
const onTouchEnd = () => {
    touchable.value = false
}
const animate = () => {
    updateCy()
    requestAnimationFrame(() => animate())
}
const init = () => {
    animate()
    window.addEventListener('wheel', (e) => onMouseWheel(e))
    window.addEventListener('touchstart', (e) => onTouchStart(e))
    window.addEventListener('touchmove', (e) => onTouchMove(e))
    window.addEventListener('touchend', () => onTouchEnd())
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
</style>