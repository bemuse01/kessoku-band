<template>
    <div 
        :class="classes.wrapper"
    >

        <transition-group name="fade" >

            <loading-container 
                v-if="!isLoaded || loadingContainerFlag" 
                @loadingDone="onLoadingDone" 
                @click="onClickLoadingContainer"
            />


            <template v-else>

                <render-container />

                <!-- <bg-container /> -->

                <vinyl-container />

                <playlist-container />

            </template>
        
    </transition-group>


    </div>
</template>

<script setup>
import RenderContainer from '~/components/babylon/RenderContainer.vue'
import VinylContainer from '~/components/vinyl/VinylContainer.vue'
import PlaylistContainer from '~/components/playlist/PlaylistContainer.vue'
import LoadingContainer from '~/components/loading/LoadingContainer.vue'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {} = store
const {getIdx, getPlayerState} = storeToRefs(store)


// class
const classes = reactive({
    wrapper: 'relative w-full h-full'
})


// loading
const isLoaded = ref(false)
const loadingContainerFlag = ref(true)
const onClickLoadingContainer = () => {
    loadingContainerFlag.value = false
}
const onLoadingDone = () => {
    isLoaded.value = true
}
</script>

<style>
</style>