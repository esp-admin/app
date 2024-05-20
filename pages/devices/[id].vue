<template>
  <div>
    <n-page-header
      :title="device.name"
      class="mb-8"
      :on-back="$router.back"
    >
      <template #extra>
        <div class="flex justify-between gap-2">
          <button-icon
            v-if="device.projectId"
            :icon="ICON_UNLINK"
            secondary
            @click="onUnlink"
          />

          <nuxt-link
            v-if="device.projectId"
            :to="`/projects/${device.projectId}`"
          >
            <button-icon
              v-if="device.projectId"
              secondary
              :icon="ICON_PROJECT"
            />
          </nuxt-link>

          <button-icon
            :icon="ICON_DELETE"
            secondary
            @click="onDelete"
          />
        </div>
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

const { findOne } = useDevice()

const device = await findOne(id)

function onDelete() {
  dialog.error({
    title: 'Delete Device',
    content: 'The device will be permanently deleted, including its deployments. This action is not reversible and can not be undone.',
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
  dialog.info({
    title: 'Unlink Device',
    content: 'The device will unlinked from the project.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    showIcon: false,
    onPositiveClick: async () => {
      await useDevice().unlink(device.value.id)
    },
  })
}
</script>
