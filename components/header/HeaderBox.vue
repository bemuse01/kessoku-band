<template>
    <div
        :class="classes.box"
    >

        <header-title />
        
    </div>
</template>

<script setup>
import HeaderTitle from './HeaderTitle.vue';


// class
const classes = reactive({
    box: 'absolute top-0 w-full h-auto'
})
</script>

<style scoped>
    
</style>