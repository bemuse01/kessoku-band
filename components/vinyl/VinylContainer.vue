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

                <div
                    :class="classes.item"
                    v-for="item in items"
                    :key="item.key"
                >

                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
import Method from '~/utils/method.math.js'

const classes = reactive({
    container: 'absolute overflow-hidden w-[100vw] h-[100vh] flex justify-center items-center',
    box: 'w-[100vh] h-[100vh] rotate-[15deg]',
    scroll: 'w-full h-full',
    item: 'w-full h-full bg-[rgba(255,0,0,0.5)] rounded-[25%]'
})


const items = ref(Array.from({length: 10}, (_, key) => ({key})))


// scroll
const lerpVelocity = 0.11
const idx = ref(0)
const cy = ref(0)
const py = ref(0)
const scrollStyle = computed(() => ({transform: `translateY(-${cy.value}%)`}))


const onMouseWheel = (e) => {
    const direction = Math.sign(e.deltaY)

    idx.value += direction
    idx.value = Method.clamp(idx.value, 0, items.value.length - 1)

    py.value = idx.value * 100
}
const updateScrollStyle = () => {
    cy.value = Method.lerp(cy.value, py.value, lerpVelocity)
}
const animate = () => {
    updateScrollStyle()
    requestAnimationFrame(() => animate())
}
const init = () => {
    animate()
    window.addEventListener('wheel', (e) => onMouseWheel(e))
}


onMounted(() => {
    init()
})
</script>

<style scoped>
</style>