<template>
  <div>
    <n-page-header
      :title="project.name"
      class="mb-8"
      :on-back="$router.back"
    >
      <template #extra>
        <button-icon
          :icon="ICON_DELETE"
          secondary
          :disabled="linkedDevices.length > 0"
          @click="onDelete"
        />
      </template>
    </n-page-header>

    <n-tabs type="line">
      <n-tab-pane
        name="metadata"
        tab="Metadata"
      >
        <project-metadata
          class="mt-4"
          :project="project"
        />
      </n-tab-pane>

      <n-tab-pane
        name="variables"
        tab="Variables"
      >
        <project-variables
          class="mt-4"
          :project="project"
        />
      </n-tab-pane>

      <n-tab-pane
        name="commands"
        tab="Commands"
      >
        <project-commands
          class="mt-4"
          :project="project"
        />
      </n-tab-pane>

      <n-tab-pane
        name="devices"
        tab="Devices"
      >
        <project-devices
          class="mt-4"
          :project="project"
        />
      </n-tab-pane>

      <n-tab-pane
        name="releases"
        tab="Releases"
      >
        <project-releases
          class="mt-4"
          :project="project"
        />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as { id: string }
    return REGEX_ID.test(params.id)
  },
})

const dialog = useDialog()
const route = useRoute()

const id = route.params.id as string

const { findOne } = useProject()

const project = await findOne(id)

const { findLinked } = useDevice()

const linkedDevices = await findLinked(project.value.id)

async function onDelete() {
  dialog.warning({
    title: 'Delete Project',
    content: 'The project will be permanently deleted, including its releases and deployments. This action is not reversible and can not be undone.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      await useProject().remove(project.value.id)
      dialog.destroyAll()
      await navigateTo('/projects')
    },
  })
}
</script>
