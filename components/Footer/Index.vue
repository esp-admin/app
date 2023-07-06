<template>
    <footer :style="{ backgroundColor: naiveTheme.common.bodyColor }">
        <n-text :depth="2">
            Alpha ~ {{ version }}
        </n-text>

        <n-text>•</n-text>

        <nuxt-link to="https://esp-admin.bg-tech.tn" target="_blank">
            <span class="flex gap-1 items-start">
                <naive-icon name="ph:house" :size="18"></naive-icon>
                <n-text>Home</n-text>
            </span>
        </nuxt-link>

        <n-text>•</n-text>

        <nuxt-link :to="repository" target="_blank">
            <span class="flex gap-1 items-start">
                <naive-icon name="mdi:github" :size="18"></naive-icon>
                <n-text>Github</n-text>
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