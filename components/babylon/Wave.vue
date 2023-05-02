<template>
    <div></div>
</template>

<script setup>
import Wave from '~/assets/js/class/wave/wave.js'


// props
const props = defineProps({
    engine: Object
})
const {engine} = toRefs(props)


// object
let wave = null
const createObject = () => {
    wave = new Wave({engine: engine.value})
}
const resizeObject = () => {
    wave.resize()
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