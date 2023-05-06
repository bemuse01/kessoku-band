<template>
    <div
        :class="classes.container"
        :style="containerStyle"
    >
        <slot></slot>
    </div>
</template>

<script setup>
// props
const props = defineProps({
    renderOrder: {
        type: String,
        default: 'auto'
    }
})
const {renderOrder} = toRefs(props)


// class
const classes = reactive({
    container: 'absolute w-full h-full'
})


// container
const containerStyle = computed(() => ({zIndex: renderOrder.value}))
</script>

<style scoped>
    
</style>