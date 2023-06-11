<template>
    <n-tag v-if="device.status === 'connected'"  type="success" :bordered="false">
        Connected
        <template #icon>
            <naive-icon name="ph:check"></naive-icon>
        </template>
    </n-tag>

    <n-tag v-else-if="device.status === 'disconnected'"  type="error" :bordered="false">
        Disconnected
        <template #icon>
            <naive-icon name="ph:x"></naive-icon>
        </template>
    </n-tag>

    <n-tag v-else-if="device.status === 'unregistered'"  type="warning" :bordered="false">
        Unregistered
        <template #icon>
            <naive-icon name="ph:warning"></naive-icon>
        </template>
    </n-tag>
</template>

<script setup lang="ts">
import type { Device } from '@prisma/client';

defineProps<{ device: Device }>()
</script>