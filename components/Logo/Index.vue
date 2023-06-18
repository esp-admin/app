<template>
    <img v-if="colorMode === 'light'" src="~/assets/logos/light.svg" alt="logo" width="120">
    <img v-else src="~/assets/logos/dark.svg" alt="logo" width="120">
</template>

<script setup>
const { colorMode } = useNaiveColorMode()
</script>