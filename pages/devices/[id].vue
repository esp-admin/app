<template>
    <div>
        <div class="flex justify-between mb-4">
            <div class="flex flex-col">
                <n-text class="text-xl font-semibold">{{ $route.params.id }}</n-text>
                <n-text depth="3" class="text-sm">Connected</n-text>
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

        <n-modal preset="card" v-model:show="deleteModalVisible" size="small" :closable="false" class="max-w-xs">
            <DeviceDelete />
        </n-modal>
    </div>
</template>

<script setup>
const deleteModalVisible = ref(false)
</script>