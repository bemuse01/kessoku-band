<template>
    <div 
        :class="classes.wrapper"
    >

        <render-container />

    </div>
</template>

<script setup>
import RenderContainer from '~/components/babylon/RenderContainer.vue'


// class
const classes = reactive({
    wrapper: 'relative w-full h-full'
})
</script>

<style>
    
</style>