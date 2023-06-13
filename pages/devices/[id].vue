<template>
    <div v-if="device">
        <div class="flex justify-between mb-4">
            <div class="flex flex-col">
                <n-text class="text-xl font-semibold">{{ device.name }}</n-text>
                <n-text depth="3" class="text-sm">Created {{ formatDate(device.createdAt) }}</n-text>
            </div>

            <n-button type="error" secondary @click="deleteModalVisible = true">Delete device</n-button>
        </div>

        <n-tabs type="line" animated>
            <n-tab-pane name="metadata" tab="Metadata">
                <DeviceMetadata class="mt-4"></DeviceMetadata>
            </n-tab-pane>

            <n-tab-pane name="variables" tab="Variables">
                <DeviceVariables class="mt-4"></DeviceVariables>
            </n-tab-pane>

            <n-tab-pane name="realtime" tab="Realtime">
                <DeviceRealtime class="mt-4"></DeviceRealtime>
            </n-tab-pane>

            <n-tab-pane name="deployments" tab="Deployments">
                <DeviceDeployments class="mt-4"></DeviceDeployments>
            </n-tab-pane>
        </n-tabs>

        <n-modal preset="card" v-model:show="deleteModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <DeviceDelete @cancel="deleteModalVisible = false" @done="onDelete" :device="device" />
        </n-modal>
    </div>

    <n-text v-else>Not found</n-text>
</template>

<script setup lang="ts">
import type { Device } from '@prisma/client';

const deleteModalVisible = ref(false)

const route = useRoute()

const { data: device } = await useAsyncData<Device>(() => useAuthFetch(`/api/devices/${route.params.id}`))

// if (!device.value) {
//     navigateTo("404")
// }

function onDelete() {
    deleteModalVisible.value = false
    navigateTo("/devices")
}
</script>