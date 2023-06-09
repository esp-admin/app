<template>
    <div>
        <n-h2>Projects</n-h2>

        <div class="grid md:grid-cols-3 gap-6">
            <div class="col-span-full flex gap-4">
                <n-input>
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary" @click="createModalVisible = true">
                    Create project
                </n-button>
            </div>

            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
            <ProjectCard></ProjectCard>
        </div>

        <n-modal preset="card" v-model:show="createModalVisible" size="small" :closable="false" class="max-w-xs">
            <ProjectCreate />
        </n-modal>
    </div>
</template>

<script setup>
const createModalVisible = ref(false)
</script>