<template>
    <div v-if="project">
        <div class="flex justify-between mb-4">

            <div class="flex flex-col">
                <n-text class="text-xl font-semibold">{{ project.name }}</n-text>
                <n-text depth="3" class="text-sm"> Created {{ formatDate(project.createdAt) }}</n-text>
            </div>

            <n-button type="error" secondary circle @click="deleteModalVisible = true">
                <template #icon>
                    <naive-icon name="ph:trash"></naive-icon>
                </template>
            </n-button>
        </div>

        <n-tabs type="line" animated>
            <n-tab-pane name="metadata" tab="Metadata">
                <ProjectMetadata class="mt-4" :project="project"></ProjectMetadata>
            </n-tab-pane>

            <n-tab-pane name="variables" tab="Variables">
                <ProjectVariables class="mt-4" :project="project"></ProjectVariables>
            </n-tab-pane>

            <n-tab-pane name="commands" tab="Commands">
                <ProjectCommands class="mt-4" :project="project"></ProjectCommands>
            </n-tab-pane>

            <n-tab-pane name="devices" tab="Devices">
                <ProjectDevices class="mt-4" :project="project"></ProjectDevices>
            </n-tab-pane>

            <n-tab-pane name="releases" tab="Releases">
                <ProjectReleases class="mt-4" :project="project"></ProjectReleases>
            </n-tab-pane>
        </n-tabs>

        <n-modal preset="card" v-model:show="deleteModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <ProjectDelete @cancel="deleteModalVisible = false" @done="onDelete" :project="project" />
        </n-modal>
    </div>

    <n-text v-else>Not found</n-text>
</template>

<script setup lang="ts">

const deleteModalVisible = ref(false)

const route = useRoute()

const id = route.params.id as string

const { findOne } = useProject()

const { data: project } = await findOne(id)

async function onDelete() {

    // Unlink all devices linked to the deleted project

    const { find, findOne } = useDevice()
    const { data: devices } = await find()
    devices.value?.forEach(async (device) => {
        if (device.projectId === id) {
            device.projectId = null
            const { data } = await findOne(device.id)
            if (data.value) {
                data.value.projectId = null
            }
        }
    })

    deleteModalVisible.value = false

    navigateTo("/projects")
}
</script>