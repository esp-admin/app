<template>
    <div class="flex flex-col gap-4">
        <div class="col-span-full flex gap-4">
            <n-input>
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>
        </div>

        <DeploymentCard></DeploymentCard>
        <DeploymentCard></DeploymentCard>
        <DeploymentCard></DeploymentCard>

    </div>
</template>