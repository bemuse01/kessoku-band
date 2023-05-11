<template>
    <div
        :class="classes.box"
    >
    
        <div
            :class="classes.wrapper"
        >

            <div
                :class="classes.bg"
                :style="bgStyle"
            >

            </div>

        </div>

    </div>
</template>

<script setup>
import {GLOBAL_DEGREE} from '~/utils/const.js'


const classes = reactive({
    box: 'left-0 bottom-0 w-full h-[90px]',
    wrapper: 'relative w-[50%] h-full',
    bg: 'absolute right-0 w-[100%] h-full bg-[#1b1f22]',
})


// bg
const bgStyle = computed(() => ({transform: `skewX(-${GLOBAL_DEGREE}deg)`}))
</script>

<style scoped>
    
</style>