<template>
    <div
        :class="classes.wrapper"
    >

        <transition-group name="translate">
            <div
                v-for="bg in bgs"
                :key="bg.key"
                v-show="bg.show"
                :class="classes.bg"
                :style="bg.style"
            >
            </div>
        </transition-group>


    </div>
</template>

<script setup>
import {debounce} from 'lodash'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import musics from '~/assets/src/data/musics.json'


// store
const store = useMusicStore()
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    wrapper: 'absolute left-0 w-full h-full bg-white overflow-hidden',
    bg: 'w-full h-full absolute'
})


// bg color
const bgs = ref(Array.from({length: 2}, (_, key) => ({
    key,
    show: key === 0 ? true : false,
    style: {
        background: musics[getIdx.value].color
    }
})))
const delay = 500
const changeBg = () => {
    bgs.value.forEach(bg => {
        if(bg.show === true){
            bg.show = false
        }else{
            bg.show = true
            bg.style.background = musics[getIdx.value].color
        }
    })
}
watch(getIdx, debounce(function(cur, pre){
    // console.log(cur)
    changeBg()
}, delay))
</script>

<style scoped>
    
</style>