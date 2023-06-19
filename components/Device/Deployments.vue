<template>
    <div class="flex flex-col gap-6">
        <n-input>
            <template #prefix>
                <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
            </template>
        </n-input>

        <DeploymentCard></DeploymentCard>
    </div>
</template>