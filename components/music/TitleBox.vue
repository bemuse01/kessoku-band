<template>
    <div
        :class="classes.box"
    >

        <transition-group name="fade-x">
            <div
                v-for="title in titles"
                :key="title.key"
                :class="classes.title"
            >
                <!-- <span :class="classes.artist">{{title.artist}}</span> -->
                <span>{{title.name}}</span>
            </div>
        </transition-group>
        
    </div>
</template>

<script setup>
import musics from '~/assets/src/data/musics.json'
import {debounce} from 'lodash'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import {v4 as uuidv4} from 'uuid'


// store
const store = useMusicStore()
const {getIdx} = storeToRefs(store)
const test = computed(() => musics[getIdx.value].title_jp)


// class
const classes = reactive({
    box: 'absolute w-full h-full py-2 font-[NotoSansJPBlack] flex justify-end items-end text-[9rem] text-[rgba(0,0,0,0.125)] tracking-[-0.01em] overflow-hidden whitespace-nowrap',
    title: 'absolute right-0 flex flex-col text-right leading-none',
    artist: 'text-[6rem]'
})


// title
const delay = 500
const titles = ref(Array.from({length: 1}, () => ({
    key: uuidv4(),
    artist: musics[getIdx.value].artist_jp,
    name: musics[getIdx.value].title_jp
})))
const addTitle = () => {
    titles.value.pop()
    titles.value.push({
        key: uuidv4(),
        artist: musics[getIdx.value].artist_jp,
        name: musics[getIdx.value].title_jp
    })
}
watch(getIdx, debounce(function(cur, pre){
    addTitle()
}, delay))
</script>

<style scoped>
    
</style>