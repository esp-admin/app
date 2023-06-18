<template>
    <img v-if="colorMode === 'light'" src="logo/light.svg" alt="logo" width="120">
    <img v-else src="logo/dark.svg" alt="logo" width="120">
</template>

<script setup>
const { colorMode } = useNaiveColorMode()
</script>