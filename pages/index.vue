<template>
    <div 
        :class="classes.wrapper"
    >

        <render-container />

        <!-- <bg-container /> -->

        <vinyl-container />

        <playlist-container />

    </div>
</template>

<script setup>
import RenderContainer from '~/components/babylon/RenderContainer.vue'
import VinylContainer from '~/components/vinyl/VinylContainer.vue'
import PlaylistContainer from '~/components/playlist/PlaylistContainer.vue'
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
</script>

<style>
</style>