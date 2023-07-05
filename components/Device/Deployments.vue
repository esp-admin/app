<template>
    <div class="flex flex-col gap-6">
        <div v-if="deployments?.length" class="col-span-full flex gap-4">
            <n-input>
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>
        </div>

        <n-result v-else class="col-span-full my-5" title="You have no deployments">
            <template #icon>
                <img src="~/assets/images/no-results.png" alt="no-results" width="200">
            </template>
        </n-result>

        <DeploymentCard v-for="deployment of deployments" :deployment="deployment"></DeploymentCard>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{ device: Device }>()

const { find } = useDeployment(props.device.id)

const deployments = await find()
</script>