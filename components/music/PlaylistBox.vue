<template>
    <div
        :class="classes.container"
    >

        <div
            :class="classes.box"
        >

            <div
                :class="classes.wrapper"
            >

                <div 
                    :class="classes.wrapper2"
                    :style="wrapper2Style"
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
                    />

                </div>

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
const {initPlayer, setIdx, playPlayer, stopPlayer, setPlayerSrc} = store
const {getIdx, isPaused} = storeToRefs(store)


// class
const classes = reactive({
    container: 'absolute w-[28rem] h-[100%] top-[50%] translate-y-[-50%] overflow-hidden flex',
    box: 'absolute top-[50%] w-full h-[50%] flex justify-center items-center',
    wrapper: 'w-auto h-full',
    wrapper2: 'flex flex-col w-full h-auto'
})


// wrapper
const y = computed(() => (100 / Musics.length) * getIdx.value)
const wrapper2Style = computed(() => ({transform: `translateY(${-y.value}%)`}))


// musics
const musics = ref(Musics.map(music => ({
    key: music.id,
    num: music.id + 1,
    thumbName: music.cover_filename,
    title: music.title_en,
    artist: music.artist_en
})))
</script>

<style scoped>
    
</style>