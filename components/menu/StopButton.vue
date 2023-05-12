<template>
    <div
        :class="classes.box"
    >
        <div :class="classes.shape"></div>
    </div>
</template>

<script setup>
const classes = reactive({
    box: 'h-full aspect-square flex justify-center items-center',
    shape: 'w-[55%] h-[55%] bg-white'
})
</script>

<style scoped>
</style>