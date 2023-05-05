<template>
    <div
        :class="classes.box"
    >

        <div
            :class="classes.logo"
        >
            <img :src="logoPath"/>
        </div>

        <span>CLICK ANYWHERE</span>
        
    </div>
</template>

<script setup>
import {getImagePath} from '~/utils/method.file.js'


// class
const classes = reactive({
    box: 'absolute w-full h-full flex justify-center items-center text-black flex-col gap-6 text-lg',
    logo: 'w-[12rem] h-auto flex',
    img: ''
})


// logo
const logoPath = getImagePath('logo.png')
</script>

<style scoped>
    
</style>