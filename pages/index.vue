<template>
    <div 
        :class="classes.root"
    >

        <div :class="classes.wrapper" v-if="isLoaded && !loadingBoxFlag">

            <box-wrapper class="absolute flex w-full h-full">

                <bg-box-1 />

                <video-box />

                <image-box />

            </box-wrapper>

            <box-wrapper class="relative flex flex-1 w-full">

                <title-box />

                <render-box />

                <bg-box-2 />

                <header-box />

                <playlist-box v-if="playlistFlag" />

                <vinyl-box />

            </box-wrapper>

            <box-wrapper class="relative flex w-full h-[5.5rem]">

                <menu-box />

            </box-wrapper>

        </div>

        <transition name="fade">

            <loading-box
                v-if="!isLoaded || loadingBoxFlag"
                @loadingDone="onLoadingDone" 
                @click="onClickLoadingBox"
            />

        </transition>

    </div>
</template>

<script setup>
import RenderBox from '~/components/babylon/RenderBox.vue'
import BgBox1 from '~/components/bg/BgBox1.vue'
import BgBox2 from '~/components/bg/BgBox2.vue'
import VinylBox from '~/components/music/VinylBox.vue'
import TitleBox from '~/components/music/TitleBox.vue'
import VideoBox from '~/components/bg/VideoBox.vue'
import ImageBox from '~/components/bg/ImageBox.vue'
import PlaylistBox from '~/components/music/PlaylistBox.vue'
import LoadingBox from '~/components/loading/LoadingBox.vue'
import MenuBox from '~/components/menu/MenuBox.vue'
import BoxWrapper from '~/components/public/BoxWrapper.vue'
import HeaderBox from '~/components/header/HeaderBox.vue'
import {useMusicStore} from '~/stores/music.js'
import Player from '~/assets/js/class/audio/player.js'


// store
const store = useMusicStore()
const {setPlayer} = store


// class
const classes = reactive({
    root: 'relative w-[100vw] h-[100vh] overflow-hidden',
    wrapper: 'absolute flex flex-col max-sm:flex-col-reverse w-full h-full'
})


// init audio
const initAudio = () => {
    setPlayer(new Player())
}


// loading
const isLoaded = ref(false)
const loadingBoxFlag = ref(true)
const onClickLoadingBox = async () => {
    loadingBoxFlag.value = false
    initAudio()
}
const onLoadingDone = () => {
    isLoaded.value = true
}


// flag
const playlistFlag = ref(true)


// method
const setFlag = () => {
    const {innerWidth} = window

    if(innerWidth < 1024){
        playlistFlag.value = false
    }else{
        playlistFlag.value = true
    }
}
const onWindowResize = () => {
    setFlag()
}
const init = () => {
    setFlag()
    window.addEventListener('resize', () => onWindowResize(), false)
}


// hook
onMounted(() => init())
</script>

<style>
</style>