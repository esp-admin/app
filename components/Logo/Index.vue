<template>
  <img
    v-if="colorMode === 'light'"
    src="~/assets/logos/light.png"
    :width="width"
    height="50"
    alt="logo"
  >
  <img
    v-else
    src="~/assets/logos/dark.png"
    :width="width"
    height="50"
    alt="logo"
  >
</template>

<script setup lang="ts">
const { colorMode } = useNaiveColorMode()

withDefaults(defineProps<{ width?: number }>(), {
  width: 107
})
</script>
