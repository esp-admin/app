<template>
    <div>
        <div class="flex justify-between mb-4">
            <n-h2>{{ $route.params.id }}</n-h2>
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