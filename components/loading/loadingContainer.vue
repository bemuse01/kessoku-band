<template>
    <div
        :class="classes.container"
        :style="containerStyle"
    >
        
        <transition-group name="fade-y">

            <character-box v-if="charBoxFlag" @animDone="onAnimDone"/>
            <logo-box v-else />

        </transition-group>

    </div>
</template>

<script setup>
import CharacterBox from './CharacterBox.vue'
import LogoBox from './LogoBox.vue'


// emit
const emit = defineEmits(['loadingDone'])


// class
const classes = reactive({
    container: 'absolute w-[100vw] h-[100vh] bg-[#eeeeee] overflow-hidden font-[OpenSansRegular]',
})


// emit loading done
const delay = 500
const emitLoadingDone = () => {
    setTimeout(() => emit('loadingDone'), delay)
}


// 
const charBoxFlag = ref(true)
const containerStyle = computed(() => ({cursor: charBoxFlag.value ? 'initial' : 'pointer'}))
const onAnimDone = () => {
    charBoxFlag.value = false
    emitLoadingDone()
}
</script>

<style scoped>
    
</style>