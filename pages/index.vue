<template>
    <div 
        :class="classes.wrapper"
    >

        <template v-if="isLoaded && !loadingContainerFlag">

            <render-container />

            <vinyl-container />

            <playlist-container />

        </template>

        <transition name="fade">

            <loading-container 
                v-if="!isLoaded || loadingContainerFlag"
                @loadingDone="onLoadingDone" 
                @click="onClickLoadingContainer"
            />

        </transition>

    </div>
</template>

<script setup>
import RenderContainer from '~/components/babylon/RenderContainer.vue'
import VinylContainer from '~/components/vinyl/VinylContainer.vue'
import PlaylistContainer from '~/components/playlist/PlaylistContainer.vue'
import LoadingContainer from '~/components/loading/LoadingContainer.vue'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import AudioApi from '~/assets/js/class/audio/audioApi.js'
// import * as Tone from 'tone'


// store
const store = useMusicStore()
const {initPlayer, setAudioApi} = store
const {getIdx, getPlayerState} = storeToRefs(store)


// class
const classes = reactive({
    wrapper: 'relative w-full h-full'
})


// init audio
const initAudio = () => {
    initPlayer(new Audio())
    setAudioApi(new AudioApi())
}


// loading
const isLoaded = ref(false)
const loadingContainerFlag = ref(true)
const onClickLoadingContainer = async () => {
    loadingContainerFlag.value = false
    initAudio()
}
const onLoadingDone = () => {
    isLoaded.value = true
}
</script>

<style>
</style>