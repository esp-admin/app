<template>
    <div>
        <div class="grid md:grid-cols-3 gap-6">
            <div class="flex gap-2 items-center">
                <naive-icon name="ph:code"></naive-icon>
                <n-text class="col-span-full text-lg" strong>
                    Projects
                </n-text>
            </div>

            <div class="col-span-full flex gap-4">
                <n-input @input="searchDebounce">
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary" @click="createModalVisible = true">
                    Create project
                </n-button>
            </div>

            <ProjectCard v-for="project of nameSearch ? filteredProjects : projects" :project="project"></ProjectCard>
        </div>

        <n-modal preset="card" v-model:show="createModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs" title="Create project" segmented>
            <ProjectCreate @cancel="createModalVisible = false" @done="onCreate" />
        </n-modal>
    </div>
</template>

<script setup lang="ts">

const createModalVisible = ref(false)
const nameSearch = ref()

const { find } = useProject()
const { data: projects } = await find()

const searchDebounce = inputDebounce((value: string) => nameSearch.value = value, 500)

const filteredProjects = computed(() => projects.value?.filter(project => project.name.includes(nameSearch.value)))

async function onCreate(project: Project) {
    createModalVisible.value = false;
    navigateTo(`/projects/${project.id}`)
}
</script>