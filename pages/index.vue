<template>
    <div 
        :class="classes.wrapper"
    >

        <template v-if="isLoaded && !loadingBoxFlag">

            <bg-box-1 />

            <video-box />

            <title-box />

            <render-box />

            <bg-box-2 />

            <vinyl-box />

        </template>

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
// import LayerContainer from '~/components/public/LayerContainer.vue'
import RenderBox from '~/components/babylon/RenderBox.vue'
import BgBox1 from '~/components/bg/BgBox1.vue'
import BgBox2 from '~/components/bg/BgBox2.vue'
import VinylBox from '~/components/music/VinylBox.vue'
import TitleBox from '~/components/music/TitleBox.vue'
import VideoBox from '~/components/bg/VideoBox.vue'
// import PlaylistContainer from '~/components/playlist/PlaylistContainer.vue'
import LoadingBox from '~/components/loading/LoadingBox.vue'
import {useMusicStore} from '~/stores/music.js'
import Player from '~/assets/js/class/audio/player.js'


// store
const store = useMusicStore()
const {setPlayer} = store


// class
const classes = reactive({
    wrapper: 'relative w-[100vw] h-[100vh]'
})


// init audio
const initAudio = () => {
    // initPlayer(new Audio())
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