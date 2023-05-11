<template>
    <div
        :class="classes.container"
    >

        <div
            :class="classes.box"
        >

                <div 
                    :class="classes.wrapper"
                    :style="wrapperStyle"
                >

                    <playlist-music 
                        v-for="music in musics"
                        :key="music.key"
                        :idx="music.key"
                        :num="music.num"
                        :thumbName="music.thumbName"
                        :title="music.title"
                        :artist="music.artist"
                        :currentIdx="getIdx"
                        @click="() => onClickMusic(music.key)"
                    />

                </div>

        </div>
        
    </div>
</template>

<script setup>
import Musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'
import PlaylistMusic from './PlaylistMusic.vue'


// store
const store = useMusicStore()
const {setIdx2, stopMedia} = store
const {getIdx, isPaused} = storeToRefs(store)


// class
const classes = reactive({
    container: 'absolute w-[32rem] h-[100%] top-[50%] translate-y-[-50%] overflow-hidden flex',
    box: 'absolute top-[48%] w-full h-[50%] flex justify-center items-center',
    wrapper: 'absolute top-0 flex flex-col h-auto'
})


// wrapper
const y = computed(() => (100 / Musics.length) * getIdx.value)
const wrapperStyle = computed(() => ({transform: `translateY(${-y.value}%)`}))


// player
// const mediaType = computed(() => Musics[getIdx.value].video_filename === '' ? 'audio' : 'video')
const stop = () => {
    stopMedia('audio')
    stopMedia('video')
}


// musics
const musics = ref(Musics.map(music => ({
    key: music.id,
    num: music.id + 1,
    thumbName: music.cover_filename,
    title: music.title_en,
    artist: music.artist_en
})))
const onClickMusic = (idx) => {
    setIdx2(idx)
    stop()
}
</script>

<style scoped>
    
</style>