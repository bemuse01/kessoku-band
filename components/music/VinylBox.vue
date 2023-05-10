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
import {GLOBAL_DEGREE} from '~/utils/const.js'
import {getAudioPath, getVideoPath} from '~/utils/method.file.js'
import Method from '~/utils/method.math.js'
import Vinyl from './Vinyl.vue'
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {setIdx, connectSource, setSrc, playMedia, stopMedia} = store
const {getIdx, getIsPaused} = storeToRefs(store)


// class
const classes = reactive({
    container: 'absolute overflow-hidden w-[100vh] h-[100vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center',
    box: 'w-full h-full aspect-square',
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
watch(getIdx, () => updatePy())


// player
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')
const videoPath = computed(() => getVideoPath(musics[getIdx.value].video_filename))
const audioPath = computed(() => getAudioPath(musics[getIdx.value].audio_filename))
watch(getIdx, () => resetVinylState())
const play = () => {
    if(mediaType.value === 'video'){
        setSrc(mediaType.value, videoPath.value)
    }else{
        setSrc(mediaType.value, audioPath.value)
    }

    playMedia(mediaType.value)
}
const stop = () => {
    stopMedia(mediaType.value)
}
const connect = () => {
    connectSource(mediaType.value)
}
const onVinylClick = (idx, nowPlaying) => {

    // nowPlaying: 현재 재생중인 비닐 이외의 다른 비닐을 클릭 했을 때 rotate를 멈추기 위한 property
    if(nowPlaying){

        if(getIsPaused.value){

            play()
            setVinylState(idx)
            connect()

        }else{

            stop()
            resetVinylState()

        }

    }else{

        stop()
        play()
        setVinylState(idx)
        connect()

    }
    
}


// method
const onMouseWheel = (e) => {
    if(!getIsPaused.value) return

    const direction = Math.sign(e.deltaY)

    setIdx(direction, 0, vinyls.value.length - 1)
    updatePy(direction)
}
const animate = () => {
    updateCy()
    requestAnimationFrame(() => animate())
}
const init = () => {
    animate()
    window.addEventListener('wheel', (e) => onMouseWheel(e))
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
</style>