<template>
    <div
        :class="classes.wrapper"
    >

        <div
            :class="classes.box"
        >

            

        </div>
        
    </div>
</template>

<script setup>
// props
const props = defineProps({
    coverPath: String
})
const {coverPath} = toRefs(props)


// class
const classes = reactive({
    wrapper: 'w-full h-full flex justify-center items-center',
    box: ''
})


// vinyl bg
const bgPath = ref()
const bgOverlayPath = ref()
</script>

<style scoped>
    
</style>