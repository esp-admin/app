<template>
    <nuxt-link :to="`/devices/${device.id}`">
        <n-card :title="device.name" size="small" hoverable>
            <n-text depth="3">Created <n-time :time="new Date(device.createdAt)" type="relative" /></n-text>

            <template #header-extra>
                <DeviceStatus :device="device" :size="24"></DeviceStatus>
            </template>
        </n-card>
    </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>