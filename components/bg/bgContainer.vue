<template>
    <div
        :class="classes.container"
    >
        
        <bg-left />

    </div>
</template>

<script setup>
import BgLeft from './bgLeft.vue'


// class
const classes = reactive({
    container: 'absolute w-[100vw] h-[100vh] bg-white'
})
</script>

<style scoped>
    
</style>