<template>
    <div
        :class="classes.wrapper"
    >

        <div :class="classes.bg"></div>
        
    </div>
</template>

<script setup>
// import {GLOBAL_DEGREE} from '~/utils/const.js'


// class
const classes = reactive({
    wrapper: 'bg-box-2 absolute left-0 w-[50%] h-full',
    bg: `absolute right-0 w-[100vw] h-full bg-[linear-gradient(hsl(206,15%,9%),hsl(206,15%,4%))] skew-x-[-15deg]`
})
</script>

<style scoped>
    
</style>