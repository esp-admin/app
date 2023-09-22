<template>
  <div>
    <div class="grid md:grid-cols-3 gap-6">
      <div class="flex gap-2 items-center">
        <naive-icon name="ph:code" />
        <n-text class="col-span-full text-lg" strong>
          Projects
        </n-text>
      </div>

      <div v-if="projects?.length" class="col-span-full flex gap-4">
        <n-input v-model:value="nameSearch">
          <template #prefix>
            <naive-icon name="ph:magnifying-glass" :size="16" />
          </template>
        </n-input>

        <n-button type="primary" @click="createModalVisible = true">
          Create project
        </n-button>
      </div>

      <n-result v-else class="col-span-full my-5" title="You have no projects">
        <template #icon>
          <img src="~/assets/images/no-results.png" alt="no-results" width="200">
        </template>
        <template #footer>
          <n-button type="primary" @click="createModalVisible = true">
            Create first project
          </n-button>
        </template>
      </n-result>

      <ProjectCard v-for="project of nameSearch ? filteredProjects : projects " :key="project.id" :project="project" />
    </div>

    <n-modal v-model:show="createModalVisible" preset="card" :closable="false" :mask-closable="false" class="max-w-sm">
      <ProjectCreate @cancel="createModalVisible = false" @done="onCreate" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">

const createModalVisible = ref(false)
const nameSearch = ref()

const { find } = useProject()
const projects = await find()

const filteredProjects = computed(() => projects.value?.filter(project => project.name.includes(nameSearch.value)))

async function onCreate (project: Project) {
  createModalVisible.value = false
  await navigateTo(`/projects/${project.id}`)
}
</script>
