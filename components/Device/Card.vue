<template>
    <nuxt-link :to="`/devices/${device.id}`">
        <n-card :title="device.name" size="small" hoverable>
            <n-text depth="3"> {{ device.description }}</n-text>
            <!-- <template #header-extra>
            <DeviceStatus :device="device"></DeviceStatus>
        </template> -->
        </n-card>
    </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>