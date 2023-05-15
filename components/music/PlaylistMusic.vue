<template>
    <div
        :class="classes.music"
        :style="musicStyle"
    >

        <div
            :class="classes.bg + ' ' + bgClass"
            :style="bgStyle"
        >
        </div>

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
import {GLOBAL_DEGREE} from '~/utils/const.js'


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
const opacity = computed(() => idx.value === currentIdx.value ? '1' : Method.clamp(0.5 - Math.abs(currentIdx.value - idx.value) * 0.15, 0, 1))
const events = computed(() => opacity.value === 0 ? ({cursor: 'default', pointerEvents: 'none', touchAction: 'none'}) : ({cursor: 'pointer', pointerEvents: 'auto', touchAction: 'auto'}))
const musicStyle = computed(() => ({opacity: `${opacity.value}`, ...events.value}))


// bg
const bgColor = computed(() => currentIdx.value === idx.value ? 'bg-[rgba(255,255,255,0.05)]' : 'bg-transparent')
const bgClass = computed(() => `${bgColor.value} hover:bg-[rgba(255,255,255,0.05)]`)
const bgStyle = computed(() => ({transform: `translate(-50%, -50%) skewX(-${GLOBAL_DEGREE}deg)`}))


// num
const computedNum = computed(() => num.value < 10 ? '0' + num.value : num.value)


// thumb
const thumbPath = computed(() => getImagePath(thumbName.value))


// class
const classes = reactive({
    music: 'flex flex-row relative w-full h-[3rem] items-center text-white gap-4 my-4',
    bg: 'absolute flex w-[110%] h-[150%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] skew-x-[-15deg]',
    num: 'flex justify-center items-center px-0.5 text-sm',
    thumb: 'flex h-full aspect-square rounded-md overflow-hidden',
    info: 'flex w-[12rem] xl:w-[15rem] overflow-hidden flex-col justify-center',
    title: 'overflow-hidden whitespace-nowrap text-ellipsis text-sm',
    artist: 'overflow-hidden whitespace-nowrap text-ellipsis text-xs text-[#6e6e6e]',
    duration: 'text-[#6e6e6e] flex text-sm'
})
</script>

<style scoped>
</style>