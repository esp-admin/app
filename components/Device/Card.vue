<template>
    <n-card :title="device.name" size="small" hoverable>

        <n-text depth="3"> {{ device.description }}</n-text>

        <div class="mt-4 flex gap-2">
            <nuxt-link :to="`/devices/${device.id}`">
                <n-button secondary>View</n-button>
            </nuxt-link>
        </div>

        <!-- <template #header-extra>
            <DeviceStatus :device="device"></DeviceStatus>
        </template> -->
    </n-card>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>