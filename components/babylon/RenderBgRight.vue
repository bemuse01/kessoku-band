<template>
    <div
        :class="classes.wrapper"
    >

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
    wrapper: 'absolute left-0 w-full h-full bg-white',
})


// bg color
const delay = 500
watch(getIdx, debounce(function(cur, pre){
    console.log(cur)
}, delay))
</script>

<style scoped>
    
</style>