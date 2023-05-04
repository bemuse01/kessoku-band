<template>
    <div
        :class="classes.wrapper"
    >

        <div
            :class="classes.box"
        >

            <img :class="classes.cover" :src="coverPath"/>
            <img :class="classes.img" :src="bgPath"/>
            <img :class="classes.img + ' ' + classes.overlay" :src="bgOverlayPath"/>

        </div>
        
    </div>
</template>

<script setup>
import {getImagePath} from '~/utils/method.file.js'


// props
const props = defineProps({
    coverName: String
})
const {coverName} = toRefs(props)


// class
const classes = reactive({
    wrapper: 'w-full h-full flex justify-center items-center',
    box: 'w-[75%] h-[75%] flex relative justify-center items-center',
    img: 'w-full h-full absolute select-none',
    cover: 'w-[50%] h-[50%] absolute select-none',
    overlay: 'mix-blend-overlay rotate-[-40deg]'
})


// vinyl bg
const coverPath = computed(() => getImagePath(coverName.value))
const bgPath = getImagePath('vinyl.png')
const bgOverlayPath = getImagePath('vinyl_overlay.png')
</script>

<style scoped>
    
</style>