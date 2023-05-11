<template>
    <div 
        :class="classes.root"
    >

        <div :class="classes.wrapper" v-if="isLoaded && !loadingBoxFlag">

            <box-wrapper class="absolute flex w-full h-full">

                <bg-box-1 />

                <video-box />

            </box-wrapper>

            <box-wrapper class="relative flex flex-1 w-full">

                <title-box />

                <render-box />

                <bg-box-2 />

                <playlist-box />

                <vinyl-box />

            </box-wrapper>

            <box-wrapper class="relative flex w-full h-[90px]">

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
import PlaylistBox from '~/components/music/PlaylistBox.vue'
import LoadingBox from '~/components/loading/LoadingBox.vue'
import MenuBox from '~/components/menu/MenuBox.vue'
import BoxWrapper from '~/components/public/BoxWrapper.vue'
import {useMusicStore} from '~/stores/music.js'
import Player from '~/assets/js/class/audio/player.js'


// store
const store = useMusicStore()
const {setPlayer} = store


// class
const classes = reactive({
    root: 'relative w-[100vw] h-[100vh] overflow-hidden',
    wrapper: 'absolute flex flex-col w-full h-full'
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
</script>

<style>
</style>