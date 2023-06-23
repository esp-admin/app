<template>
    <n-card size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header>
            <div class="flex flex-col">
                <n-text class="text-base">{{ deployment.id }}</n-text>
                <n-text depth="3">Created <n-time :time="new Date(deployment.createdAt)" type="relative" /></n-text>
            </div>
        </template>

        <template #header-extra>
            <div class="flex gap-2">
                <n-button secondary @click="onTrigger">Trigger</n-button>
            </div>
        </template>
    </n-card>
</template>

<script setup lang="ts">

const props = defineProps<{ deployment: Deployment }>()

async function onTrigger() {

}
</script>