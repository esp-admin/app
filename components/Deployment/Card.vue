<template>
    <n-card size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header>
            <div class="flex flex-col">
                <div class="flex items-center gap-2">
                    <n-text class="text-lg" strong>{{ deployment.release?.version }}</n-text>
                    <DeploymentStatus :deployment="deployment"></DeploymentStatus>
                </div>
                <n-text depth="3">Created <n-time :time="new Date(deployment.createdAt)" type="relative" /></n-text>
            </div>
        </template>

        <template #header-extra>
            <div class="flex gap-2">
                <nuxt-link :to="`/projects/${deployment.release?.projectId}`">
                    <n-button secondary>Project</n-button>
                </nuxt-link>
            </div>
        </template>
    </n-card>
</template>

<script setup lang="ts">
defineProps<{ deployment: Deployment }>()
</script>