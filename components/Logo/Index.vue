<template>
  <img v-if="colorMode === 'light'" src="~/assets/logos/light.svg" alt="logo" :width="width">
  <img v-else src="~/assets/logos/dark.svg" alt="logo" :width="width">
</template>

<script setup lang="ts">
const { colorMode } = useNaiveColorMode()

withDefaults(defineProps<{ width?: number }>(), {
  width: 105
})
</script>
