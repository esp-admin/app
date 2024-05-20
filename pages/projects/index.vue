<template>
  <div>
    <n-result
      v-if="!projects?.length"
      class="col-span-full"
      title="No projects found"
    >
      <template #icon>
        <result-empty />
      </template>
      <template #footer>
        <n-button
          type="primary"
          @click="createModalVisible = true"
        >
          Create first project
        </n-button>
      </template>
    </n-result>

    <div
      v-else
      class="grid lg:grid-cols-3 gap-8"
    >
      <n-page-header
        title="Projects"
        class="col-span-full"
      >
        <template #avatar>
          <naive-icon
            :name="ICON_PROJECT"
            :size="20"
          />
        </template>
      </n-page-header>

      <div class="col-span-full flex gap-4">
        <n-input
          v-model:value="nameSearch"
          placeholder="Search by name"
        >
          <template #prefix>
            <naive-icon
              :name="ICON_SEARCH"
              :size="16"
            />
          </template>
        </n-input>

        <n-button
          type="primary"
          @click="createModalVisible = true"
        >
          Create project
        </n-button>
      </div>

      <project-item
        v-for="project of filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>

    <n-modal
      v-model:show="createModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <project-create
        @cancel="createModalVisible = false"
        @done="onCreate"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const createModalVisible = ref(false)
const nameSearch = ref()

const { find } = useProject()
const projects = await find()

const filteredProjects = filteredArrayByKey(projects, 'name', nameSearch)

async function onCreate(project: Project) {
  createModalVisible.value = false
  await navigateTo(`/projects/${project.id}`)
}
</script>
