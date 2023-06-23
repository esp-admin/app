<template>
    <footer :style="{ backgroundColor: naiveTheme.common.bodyColor }">
        <n-text :depth="2">
            Alpha ~ {{ version }}
        </n-text>

        <n-text>-</n-text>

        <nuxt-link :to="repository" target="_blank">
            <span class="flex gap-2 items-center">
                <n-text>Github</n-text>
                <naive-icon name="ph:arrow-square-out" :size="18"></naive-icon>
            </span>
        </nuxt-link>
    </footer>
</template>

<script setup>
import { version, repository } from "../../package.json"
const naiveTheme = useNaiveTheme()
</script>

<style scoped>
footer {
    height: 48px;
    padding: 16px;
    box-shadow: 0px 0px 2px 0px #a3a3a3;
    display: flex;
    place-content: center;
    gap: 16px;
    width: 100%;
}
</style>