<template>
    <div></div>
</template>

<script setup>
import Visualizer from '~/assets/js/class/visualizer/visualizer.js'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {getAudioApi} = storeToRefs(store)


// props
const props = defineProps({
    engine: Object
})
const {engine} = toRefs(props)


// object
let visualizer = null
const createObject = () => {
    visualizer = new Visualizer({engine: engine.value, audio: getAudioApi.value})
}
const resizeObject = () => {
    visualizer.resize()
}


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