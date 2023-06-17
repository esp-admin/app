<template>
    <footer :style="{ backgroundColor: naiveTheme.common.bodyColor }">
        <n-text :depth="2">
            Alpha ~
            {{ version }} ~
            <nuxt-link :to="repository" target="_blank"> Github</nuxt-link>
        </n-text>

    </footer>
</template>

<script setup>
import { version, repository } from "../../package.json"
const naiveTheme = useNaiveTheme()
</script>

<style scoped>
footer {
    height: 56px;
    padding: 16px;
    box-shadow: 0px 0px 2px 0px #a3a3a3;
    display: flex;
    place-content: center;
    gap: 16px;
    width: 100%;
}
</style>