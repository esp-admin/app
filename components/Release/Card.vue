<template>
    <n-card size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header>
            <div class="flex flex-col">
                <n-text>{{ release.version }}</n-text>
                <n-text depth="3" class="text-base">Created <n-time :time="new Date(release.createdAt)"
                        type="relative" /></n-text>
            </div>

        </template>

        <template #header-extra>
            <div class="flex gap-2">
                <n-button secondary @click="onTrigger">Trigger</n-button>
                <n-button secondary @click="deleteModalVisible = true">Delete</n-button>
            </div>
        </template>

        <n-modal preset="card" v-model:show="deleteModalVisible" :closable="false" :mask-closable="false" class="max-w-sm">
            <ReleaseDelete @cancel="deleteModalVisible = false" @done="onDelete" :release="release"
                :projectId="projectId" />
        </n-modal>
    </n-card>
</template>

<script setup lang="ts">

const deleteModalVisible = ref(false)

const props = defineProps<{ release: Release, projectId: Project["id"] }>()

function onDelete() {
    deleteModalVisible.value = false
}

async function onTrigger() {
    const { publish } = useMqtt()

    const { find } = useDevice()

    const devices = await find()

    const linkedDevices = devices.value?.filter(device => device.projectId === props.projectId) || []

    for (let device of linkedDevices) {
        publish({
            deviceId: device.id,
            action: "command",
            type: "update",
            retained: true,
            payload: JSON.stringify({
                releaseId: props.release.id,
                downloadUrl: props.release.downloadUrl,
                version: props.release.version,
            })
        })
    }
}
</script>