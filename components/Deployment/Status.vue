<template>
    <n-tooltip trigger="hover">
        <template #trigger>
            <naive-icon v-if="deployment.status === 'started'" name="ph:caret-circle-double-down-duotone" :size="size"
                icon-color="#3b82f6"></naive-icon>
            <naive-icon v-if="deployment.status === 'failed'" name="ph:x-circle-duotone" :size="size"
                icon-color="#ef4444"></naive-icon>
            <naive-icon v-if="deployment.status === 'succeded'" name="ph:check-circle-duotone" :size="size"
                icon-color="#22c55e"></naive-icon>
        </template>
        {{ deployment.status }}
    </n-tooltip>
</template>

<script setup lang="ts">
defineProps<{ deployment: Deployment, size?: number }>()
</script>