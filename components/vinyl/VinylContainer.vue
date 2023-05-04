<template>
    <div
        :class="classes.container"
    >
        
        <div
            :class="classes.box"
        >
            <div
                :class="classes.scroll"
                :style="scrollStyle"
            >

                <Vinyl
                    v-for="vinyl in vinyls"
                    :key="vinyl.key"
                    :coverName="vinyl.coverName"
                >

                </Vinyl>

            </div>

        </div>

    </div>
</template>

<script setup>
// import {GLOBAL_DEGREE} from '~/utils/const.js'
import Method from '~/utils/method.math.js'
import Vinyl from './Vinyl.vue'
import musics from '~/assets/src/data/musics.json'
import {useMusicStore} from '~/stores/music.js'
import {storeToRefs} from 'pinia'


// store
const store = useMusicStore()
const {setIdx} = store
const {getIdx} = storeToRefs(store)


// class
const classes = reactive({
    container: 'absolute overflow-hidden w-[100vw] h-[100vh] flex justify-center items-center',
    box: 'w-[100vh] aspect-square rotate-[15deg]',
    scroll: 'w-full h-full',
    item: 'w-full h-full bg-[rgba(255,0,0,0.5)] rounded-[25%]'
})


// vinyls
const vinyls = ref(musics.map(music => ({
    key: music.id,
    coverName: music.cover_filename
})))


// scroll
const lerpVelocity = 0.11
const idx = ref(0)
const cy = ref(0)
const py = ref(0)
const scrollStyle = computed(() => ({transform: `translateY(-${cy.value}%)`}))
const updateCy = () => {
    cy.value = Method.lerp(cy.value, py.value, lerpVelocity)
}
const updatePy = (direction) => {
    setIdx(direction, 0, vinyls.value.length - 1)

    py.value = getIdx.value * 100
}


// method
const onMouseWheel = (e) => {
    const direction = Math.sign(e.deltaY)

    updatePy(direction)
}
const animate = () => {
    updateCy()
    requestAnimationFrame(() => animate())
}
const init = () => {
    animate()
    window.addEventListener('wheel', (e) => onMouseWheel(e))
}


// hook
onMounted(() => {
    init()
})
</script>

<style scoped>
</style>