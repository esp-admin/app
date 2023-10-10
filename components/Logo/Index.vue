<template>
  <img :src="src" alt="logo" :width="width" :height="height">
</template>

<script setup lang="ts">
const { colorMode } = useNaiveColorMode()

withDefaults(defineProps<{ width?: number, height?:number }>(), {
  width: 107,
  height: 50
})

const src = computed(() => colorMode.value === 'light' ? '/logos/light.svg' : '/logos/dark.svg')
</script>
