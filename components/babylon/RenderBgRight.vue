<template>
    <div
        :class="classes.wrapper"
    >

        <!-- <transition-group name="translate"> -->
        <div
            v-for="bg in bgs"
            :key="bg.key"
            :class="classes.bg"
            :style="bg.style"
        >
        </div>
        <!-- </transition-group> -->


    </div>
</template>

<script setup>
import {debounce} from 'lodash'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import musics from '~/assets/src/data/musics.json'
import {v4 as uuidv4} from 'uuid'
import {gsap} from 'gsap'


// store
const store = useMusicStore()
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    wrapper: 'absolute left-0 w-full h-full bg-white overflow-hidden',
    bg: 'w-full h-full absolute'
})


// bg color
const delay = 500
const tweenTime = 1
const bgs = ref(Array.from({length: 1}, (_, key) => ({
    key: uuidv4(),
    style: {
        // transform: '',
        background: musics[getIdx.value].color
    }
})))
const addBg = () => {
    const key = uuidv4()

    bgs.value.push({
        key,
        style: {
            transform: 'translateX(-100%)',
            background: musics[getIdx.value].color
        }
    })

    return key
}
const createTween = (key) => {
    const start = {x: -100}
    const end = {x: 0}

    console.log(bgs.value)

    const to = {
        ...end,
        duration: tweenTime,
        ease: "power4.out",
        onUpdate: () => onUpdateTween(start, key),
        onComplete: () => onCompleteTween(key)
    }

    gsap.to(start, to)
}
const onUpdateTween = (start, key) => {
    const idx = bgs.value.findIndex(bg => bg.key === key)

    bgs.value[idx].style.transform  = `translateX(${start.x}%)`
}
const onCompleteTween = () => {
    bgs.value.splice(0, bgs.value.length - 2)
}
const slideBg = () => {
    const key = addBg()
    createTween(key)
}
// const bgs = ref(Array.from({length: 2}, (_, key) => ({
//     key,
//     show: key === 0 ? true : false,
//     style: {
//         background: musics[getIdx.value].color
//     }
// })))
// const changeBg = () => {
    // bgs.value.forEach(bg => {
    //     if(bg.show === true){
    //         bg.show = false
    //     }else{
    //         bg.show = true
    //         bg.style.background = musics[getIdx.value].color
    //     }
    // })
// }
onMounted(() => slideBg())
watch(getIdx, debounce(function(cur, pre){
    // console.log(cur)
    // changeBg()
    slideBg()
}, delay))
</script>

<style scoped>
    
</style>