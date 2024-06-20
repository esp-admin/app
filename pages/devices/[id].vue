<template>
  <div>
    <n-page-header
      :title="device.name"
      class="mb-8"
    >
      <template #extra>
        <n-button-group>
          <button-icon
            v-if="device.projectId"
            secondary
            :icon="ICON_UNLINK"
            @click="onUnlink"
          />
          <button-icon
            v-if="device.projectId"
            secondary
            :icon="ICON_PROJECT"
            @click="navigateTo(`/projects/${device.projectId}`)"
          />
          <button-icon
            :icon="ICON_DELETE"
            secondary
            @click="onDelete"
          />
        </n-button-group>
      </template>
    </n-page-header>

    <n-tabs type="line">
      <n-tab-pane
        name="metadata"
        tab="Metadata"
      >
        <device-metadata
          class="mt-4"
          :device="device"
        />
      </n-tab-pane>

      <n-tab-pane
        name="variables"
        tab="Variables"
      >
        <device-variables
          class="mt-4"
          :device="device"
        />
      </n-tab-pane>

      <n-tab-pane
        name="realtime"
        tab="Realtime"
      >
        <device-realtime
          class="mt-4"
          :device="device"
        />
      </n-tab-pane>

      <n-tab-pane
        name="deployments"
        tab="Deployments"
      >
        <device-deployments
          class="mt-4"
          :device="device"
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

const route = useRoute()
const dialog = useDialog()

const id = route.params.id as string

const device = await useDevice().findOne(id)

function onDelete() {
  dialog.error({
    title: 'Delete Device',
    content: 'This device will be permanently deleted, including its deployments. This action is not reversible and can not be undone.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    showIcon: false,
    onPositiveClick: async () => {
      await useDevice().remove(device.value.id)
      dialog.destroyAll()
      await navigateTo('/devices')
    },
  })
}

function onUnlink() {
  dialog.warning({
    title: 'Unlink Device',
    content: 'This device will unlinked from the project.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    showIcon: false,
    onPositiveClick: async () => {
      await useDevice().unlink(device.value.id)
    },
  })
}
</script>
