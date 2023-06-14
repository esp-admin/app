<template>
    <n-tag v-if="device.status === 'connected'" round size="small" type="success" :bordered="false">
        Connected
        <template #icon>
            <naive-icon name="ph:check" :size="16"></naive-icon>
        </template>
    </n-tag>

    <n-tag v-else-if="device.status === 'disconnected'" round size="small" type="error" :bordered="false">
        Disconnected
        <template #icon>
            <naive-icon name="ph:x" :size="16"></naive-icon>
        </template>
    </n-tag>

    <n-tag v-else-if="device.status === 'unregistered'" round size="small" type="warning" :bordered="false">
        Unregistered
        <template #icon>
            <naive-icon name="ph:warning" :size="16"></naive-icon>
        </template>
    </n-tag>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>