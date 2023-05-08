<template>
    <div></div>
</template>

<script setup>
import Visualizer from '~/assets/js/class/visualizer/visualizer.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import musics from '~/assets/src/data/musics.json'


// store
const store = useMusicStore()
const {getPlayer, getIsPaused, getIdx} = storeToRefs(store)
const mediaType = computed(() => musics[getIdx.value].video_filename === '' ? 'audio' : 'video')


// props
const props = defineProps({
    engine: Object
})
const {engine} = toRefs(props)


// object
let visualizer = null
const createObject = () => {
    visualizer = new Visualizer({engine: engine.value, player: getPlayer.value, mediaType: mediaType.value})
}
const resizeObject = () => {
    visualizer.resize()
}
const updateMediaType = () => {
    visualizer.setMediaType(mediaType.value)
}
watch(mediaType, (cur, pre) => {
    updateMediaType()
})
watch(getIsPaused, (cur, pre) => {
    if(cur) visualizer.hide()
    else visualizer.show()
})


// engine
const engineFlag = computed(() => engine.value ? true : false)
const onEngineCreated = () => {
    createObject()
}
const onEngineResize = () => {
    resizeObject()
}
watch(engineFlag, (cur, pre) => {
    if(cur){
        onEngineCreated()
        engine.value.onResizeObservable.add(() => onEngineResize())
    }
})
</script>

<style>
    
</style>