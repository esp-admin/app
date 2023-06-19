<template>
    <n-card size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header>
            <div class="flex flex-col">
                <n-text class="text-base">{{ version }}</n-text>
                <n-text depth="3" class="text-sm font-semibold">Completed</n-text>
            </div>

        </template>

        <template #header-extra>
            <div class="flex gap-4">
                <n-button secondary>Project</n-button>
            </div>
        </template>
    </n-card>
</template>

<script setup>
const version = ref("v1.0.0")
</script>