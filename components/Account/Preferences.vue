<template>
    <n-form>
        <n-form-item label="Color Mode">
            <n-tree-select v-model:value="colorModePreference" :options="colorModeSelectOptions"></n-tree-select>
        </n-form-item>
    </n-form>
</template>


<script setup lang="ts">
import { TreeOption } from "naive-ui"

const { colorModePreference } = useNaiveColorMode()

const colorModeSelectOptions = ref<TreeOption[]>([
    {
        label: "Light",
        key: "light"
    },
    {
        label: "Dark",
        key: "dark"
    }, {
        label: "System",
        key: "system"
    }
])
</script>