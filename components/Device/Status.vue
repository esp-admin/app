<template>
    <n-tag v-if="device.status === 'connected'" round type="success" :bordered="false">
        <template #icon>
            <naive-icon name="ph:check" :size="16"></naive-icon>
        </template>
    </n-tag>

    <n-tag v-else-if="device.status === 'disconnected'" round type="error" :bordered="false">
        <template #icon>
            <naive-icon name="ph:x" :size="16"></naive-icon>
        </template>
    </n-tag>

    <n-tag v-else-if="device.status === 'unregistered'" round type="warning" :bordered="false">
        <template #icon>
            <naive-icon name="ph:warning" :size="16"></naive-icon>
        </template>
    </n-tag>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>