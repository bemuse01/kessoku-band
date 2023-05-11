<template>
    <div
        :class="classes.container"
    >

        <div 
            :class="classes.canvasBox"
        >

            <canvas 
                :class="classes.canvas" 
                :ref="el => canvasRef = el"
            ></canvas>

        </div>

        <div 
            :class="classes.objectBox"
        >

            <visualizer :engine="engine" />

        </div>

    </div>
</template>

<script setup>
import {Engine} from 'babylonjs'
import Visualizer from './Visualizer.vue'


// class
const classes = reactive({
    container: 'absolute top-0 left-0 w-[100vw] h-[100vh]',
    canvasBox: 'w-full h-full absolute',
    canvas: 'w-full h-full',
    objectBox: 'absolute'
})


// canvas
const canvasRef = ref()


// engine
const engine = ref()
const antialias = true
const option = {preserveDrawingBuffer: true, stencil: true}
const createEngine = () => {
    engine.value = new Engine(canvasRef.value, antialias, option)
}
const resizeEngine = () => {
    engine.value.resize()
}


// method
const onWindowResize = () => {
    resizeEngine()
}
const init = () => {
    createEngine()
    window.addEventListener('resize', () => onWindowResize(), false)
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
    
</style>