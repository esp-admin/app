<template>
  <div>
    <n-page-header :title="project.name" class="mb-8" :on-back="$router.back">
      <template #extra>
        <ButtonIcon
          :icon="ICON_DELETE"
          secondary
          @click="deleteModalVisible = true"
        />
      </template>
    </n-page-header>

    <n-tabs type="line">
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
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <ProjectDelete :project="project" @cancel="deleteModalVisible = false" @done="onDelete" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as { id: string }
    return REGEX_ID.test(params.id)
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
