<template>
    <div
        :class="classes.box"
    >
        <span>
            K<span :class="classes.font">essoku</span>
            B<span :class="classes.font">and</span>
        </span>
    </div>
</template>

<script setup>
// class
const classes = reactive({
    box: 'w-auto h-auto flex justify-center text-base items-center py-5 font-[NotoSansJPBold] text-white',
    font: 'opacity-30'
})
</script>

<style scoped>
    
</style>