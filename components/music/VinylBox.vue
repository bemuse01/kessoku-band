<template>
    <div
        :class="classes.container"
    >
        
        <div
            :class="classes.box"
        >
            <div
                :class="classes.scroll"
                :style="scrollStyle"
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
// import {GLOBAL_DEGREE} from '~/utils/const.js'
import {getAudioPath} from '~/utils/method.file.js'
import Method from '~/utils/method.math.js'
import Vinyl from './Vinyl.vue'
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {setIdx, playPlayer, stopPlayer, setPlayerSrc} = store
const {getIdx, getIsPaused, getPlayer, getAudioApi} = storeToRefs(store)


// class
const classes = reactive({
    container: 'absolute overflow-hidden w-[100vw] h-[100vh] flex justify-center items-center',
    box: 'w-[100vh] aspect-square rotate-[15deg]',
    scroll: 'w-full h-full',
    item: 'w-full h-full bg-[rgba(255,0,0,0.5)] rounded-[25%]'
})


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


// scroll
const lerpVelocity = 0.11
const idx = ref(0)
const cy = ref(0)
const py = ref(0)
const scrollStyle = computed(() => ({transform: `translateY(-${cy.value}%)`}))
const updateCy = () => {
    cy.value = Method.lerp(cy.value, py.value, lerpVelocity)
}
const updatePy = () => {
    py.value = getIdx.value * 100
}


// player
const musicPath = computed(() => getAudioPath(musics[getIdx.value].audio_filename))
const play = () => {
    setPlayerSrc(musicPath.value)
    playPlayer()
}
const stop = () => {
    stopPlayer()
}
const onVinylClick = (idx, nowPlaying) => {

    // nowPlaying: 현재 재생중인 비닐 이외의 다른 비닐을 클릭 했을 때 rotate를 멈추기 위한 property
    if(nowPlaying){

        if(getIsPaused.value){

            play()
            setVinylState(idx)
            getAudioApi.value.connectSource(getPlayer.value)

        }else{

            stop()
            resetVinylState()

        }

    }else{

        stop()
        play()
        setVinylState(idx)
        getAudioApi.value.connectSource(getPlayer.value)

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