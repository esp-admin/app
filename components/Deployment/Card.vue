<template>
    <n-card size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header>
            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    <n-text strong>{{ deployment.release?.version }}</n-text>
                    <DeploymentStatus :deployment="deployment"></DeploymentStatus>
                </div>
                <n-text depth="3" class="text-base">Created <n-time :time="new Date(deployment.createdAt)"
                        type="relative" /></n-text>
            </div>
        </template>

        <template #header-extra>
            <div class="flex gap-2">
                <nuxt-link :to="`/projects/${deployment.release?.projectId}`">
                    <n-button secondary>Project</n-button>
                </nuxt-link>

                <n-button secondary @click="deleteModalVisible = true">Delete</n-button>
            </div>
        </template>

        <n-modal preset="card" v-model:show="deleteModalVisible" :closable="false" :mask-closable="false" class="max-w-sm">
            <DeploymentDelete @cancel="deleteModalVisible = false" @done="onDelete" :deployment="deployment" />
        </n-modal>
    </n-card>
</template>

<script setup lang="ts">
defineProps<{ deployment: Deployment }>()

const deleteModalVisible = ref(false)

function onDelete() {
    deleteModalVisible.value = false
}
</script>