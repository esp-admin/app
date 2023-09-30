<template>
  <div v-if="project">
    <div class="flex justify-between mb-4">
      <div class="flex flex-col">
        <n-text class="text-lg" strong>
          {{ project.name }}
        </n-text>
        <n-text depth="3">
          Created <n-time :time="new Date(project.createdAt)" type="relative" />
        </n-text>
      </div>

      <n-button type="error" secondary circle @click="deleteModalVisible = true">
        <template #icon>
          <naive-icon name="ph:trash" />
        </template>
      </n-button>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="metadata" tab="Metadata">
        <ProjectMetadata class="mt-4" :project="project" />
      </n-tab-pane>

      <n-tab-pane name="variables" tab="Variables">
        <ProjectVariables class="mt-4" :project="project" />
      </n-tab-pane>

      <n-tab-pane name="commands" tab="Commands">
        <ProjectCommands class="mt-4" :project="project" />
      </n-tab-pane>

      <n-tab-pane name="devices" tab="Devices">
        <ProjectDevices class="mt-4" :project="project" />
      </n-tab-pane>

      <n-tab-pane name="releases" tab="Releases">
        <ProjectReleases class="mt-4" :project="project" />
      </n-tab-pane>
    </n-tabs>

    <n-modal
      v-model:show="deleteModalVisible"
      title="Delete project"
      bordered
      segmented
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <ProjectDelete :project="project" @cancel="deleteModalVisible = false" @done="onDelete" />
    </n-modal>
  </div>

  <n-text v-else>
    Not found
  </n-text>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as { id: string }
    return /^[a-fA-F0-9]{24}$/.test(params.id)
  }
})

const deleteModalVisible = ref(false)

const route = useRoute()

const id = route.params.id as string

const { findOne } = useProject()

const project = await findOne(id)

async function onDelete () {
  deleteModalVisible.value = false

  await navigateTo('/projects')
}
</script>
