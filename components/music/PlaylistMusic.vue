<template>
    <div
        :class="classes.music"
        :style="musicStyle"
    >

        <div
            :class="classes.num"
        >
            <span>{{computedNum}}</span>
        </div>

        <div
            :class="classes.thumb"
        >
            <img :src="thumbPath"/>
        </div>

        <div
            :class="classes.info"
        >

            <span :class="classes.title">{{title}}</span>
            <span :class="classes.artist">{{artist}}</span>
        </div>

        <div
            :class="classes.duration"
        >
            <span>00:00</span>
        </div>
        
    </div>
</template>

<script setup>
import {getImagePath} from '~/utils/method.file.js'
import Method from '~/utils/method.math.js'


const props = defineProps({
    thumbName: String,
    num: Number,
    idx: Number,
    artist: String,
    title: String,
    currentIdx: Number
})
const {thumbName, idx, num, artist, title, currentIdx} = toRefs(props)


// music
const opacity = computed(() => idx.value === currentIdx.value ? '1' : 0.5 - Math.abs(currentIdx.value - idx.value) * 0.15)
// const show = ref(Math.abs(currentIdx.value - idx.value) < 4 ? true : false)
const musicStyle = computed(() => ({opacity: `${Method.clamp(opacity.value, 0, 1)}`}))


// num
const computedNum = computed(() => num.value < 10 ? '0' + num.value : num.value)


// thumb
const thumbPath = computed(() => getImagePath(thumbName.value))


// class
const classes = reactive({
    music: 'flex flex-row w-full h-auto overflow-hidden items-center text-white gap-4 py-3',
    num: 'flex justify-center items-center px-0.5 text-sm',
    thumb: 'flex w-[2.5rem] h-auto rounded-md overflow-hidden',
    info: 'flex w-[14rem] overflow-hidden flex-col justify-center',
    title: 'overflow-hidden whitespace-nowrap text-ellipsis text-sm',
    artist: 'overflow-hidden whitespace-nowrap text-ellipsis text-xs text-[#6e6e6e]',
    duration: 'text-[#6e6e6e] flex text-sm'
})
</script>

<style scoped>
    
</style>