<template>
    <div>
        <div class="flex justify-between mb-4">
            <div class="flex flex-col">
                <n-text class="text-xl font-semibold">{{ $route.params.id }}</n-text>
                <n-text depth="3" class="text-sm">Created 3 days ago</n-text>
            </div>

            <n-button type="error" secondary @click="deleteModalVisible = true">Delete project</n-button>
        </div>

        <n-tabs type="line" animated>
            <n-tab-pane name="metadata" tab="Metadata">
                <ProjectMetadata class="mt-4"></ProjectMetadata>
            </n-tab-pane>

            <n-tab-pane name="variables" tab="Variables">
                <ProjectVariables class="mt-4"></ProjectVariables>
            </n-tab-pane>

            <n-tab-pane name="commands" tab="Commands">
                <ProjectCommands class="mt-4"></ProjectCommands>
            </n-tab-pane>

            <n-tab-pane name="devices" tab="Devices">
                <ProjectDevices class="mt-4"></ProjectDevices>
            </n-tab-pane>

            <n-tab-pane name="releases" tab="Releases">
                <ProjectReleases class="mt-4"></ProjectReleases>
            </n-tab-pane>
        </n-tabs>

        <n-modal preset="card" v-model:show="deleteModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <ProjectDelete @cancel="deleteModalVisible = false" />
        </n-modal>
    </div>
</template>

<script setup>
const deleteModalVisible = ref(false)
</script>