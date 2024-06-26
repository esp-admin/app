<template>
  <n-thing>
    <template #header>
      <title-date
        :title="release.version"
        :created-at="release.createdAt"
      />
    </template>

    <template #header-extra>
      <n-button-group>
        <button-icon
          :icon="collapsed ? ICON_EXPAND : ICON_COLLAPSE"
          :disabled="linkedDevices.length === 0"
          @click="collapsed = !collapsed"
        />

        <button-icon
          icon="ic:baseline-bolt"
          :disabled="linkedDevices.length === 0"
          @click="onTrigger"
        />

        <button-icon
          :icon="ICON_DELETE"
          @click="onDelete"
        />
      </n-button-group>
    </template>

    <n-collapse-transition :show="!collapsed">
      <lazy-release-devices :release="release" />
    </n-collapse-transition>
  </n-thing>
</template>

<script setup lang="ts">
const props = defineProps<{ release: Release }>()

const collapsed = ref(true)

const dialog = useDialog()

const linkedDevices = await useDevice().findLinked(props.release.projectId)

function onDelete() {
  dialog.error({
    title: 'Delete Release',
    content: 'This release will be permanently deleted, including its deployments. This action is not reversible and can not be undone.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    showIcon: false,
    onPositiveClick: async () => {
      await useRelease(props.release.projectId).remove(props.release.id)
    },
  })
}

function onTrigger() {
  collapsed.value = false

  const { $mqtt } = useNuxtApp()

  for (const device of linkedDevices.value) {
    $mqtt.publish({
      deviceId: device.id,
      action: 'command',
      type: 'update_trigger',
      retain: false,
      payload: JSON.stringify({
        releaseId: props.release.id,
        downloadPath: props.release.downloadPath,
        downloadSize: props.release.downloadSize,
        version: props.release.version,
      }),
    })
  }
}

// Show devices on release creation
onMounted(() => {
  const delay = 10000
  const createdAt = new Date(props.release.createdAt).getTime()
  const now = new Date().getTime()

  if (now < createdAt + delay) {
    collapsed.value = false
  }
})
</script>
