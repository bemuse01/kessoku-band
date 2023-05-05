<template>
    <div :class="classes.box">
        <div
            v-for="char in chars"
            :key="char.key"
            :style="charStyle(char.key, char.cw)"
            :class="classes.char"
        >

            <img :src="char.path" :class="classes.img"/>

        </div>
    </div>
</template>

<script setup>
import Method from '~/utils/method.math.js'
import {getImagePath} from '~/utils/method.file.js'


// emit
const emit = defineEmits(['animDone'])


// class
const classes = reactive({
    box: 'absolute w-full h-full flex gap-2 justify-center items-center',
    char: 'w-[6rem] h-[6rem] overflow-hidden rounded-lg',
    img: 'translate-y-[-10%] opacity-[0.2]'
})


// characters
const delay = 100
const lerpVelocity = 0.11
const colors = ['#ed709a', '#f7b41b', '#1a7cc3', '#e81a5b']
const files = ['hitori.webp', 'nijika.webp', 'ryo.webp', 'kita.webp']
const chars = ref(files.map((file, key) => ({
    key,
    path: getImagePath(file),
    cw: 0,
    pw: 0,
})))
const charStyle = computed(() => (idx, y) => ({transform: `scale(${y})`, background: colors[idx]}))


const emitAnimDone = () => {
    setTimeout(() => emit('animDone'), colors.length * delay + 900)
}
const setPw = () => {
    chars.value.forEach((char, idx) => setTimeout(() => char.pw = 1, idx * delay))
}
const animate = () => {
    chars.value.forEach(char => {
        char.cw = Method.lerp(char.cw, char.pw, lerpVelocity)
    })

    requestAnimationFrame(() => animate())
}


// hook
onMounted(() => {
    setPw()
    emitAnimDone()
    animate()
})
</script>

<style scoped>
    
</style>