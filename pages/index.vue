<template>
    <div 
        :class="classes.wrapper"
    >

        <render-container />

        <vinyl-container />

    </div>
</template>

<script setup>
import RenderContainer from '~/components/babylon/RenderContainer.vue'
import VinylContainer from '~/components/vinyl/VinylContainer.vue'


// class
const classes = reactive({
    wrapper: 'relative w-full h-full'
})
</script>

<style>
    
</style>