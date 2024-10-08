<template>
  <div class="flex gap-2">
    <title-date
      class="flex-grow"
      :title="device.name"
      :created-at="deployment?.createdAt"
    />

    <n-button
      v-if="deployment?.status === 'started'"
      secondary
      size="tiny"
      type="error"
      @click="onAbort"
    >
      Abort
    </n-button>

    <n-button
      v-else
      secondary
      size="tiny"
      type="warning"
      @click="onTrigger"
    >
      Deploy
    </n-button>

    <n-button
      secondary
      type="info"
      size="tiny"
      @click="navigateTo(`/devices/${device.id}`)"
    >
      View
    </n-button>
  </div>

  <n-progress
    class="mt-2"
    type="line"
    v-bind="progress"
  />
</template>

<script setup lang="ts">
import type { ProgressProps } from 'naive-ui'

const props = defineProps<{ release: Release, device: Device, deployment?: Deployment }>()

const dialog = useDialog()

const progress = computed<ProgressProps>(() => {
  if (!props.deployment) {
    return {}
  }

  else if (props.deployment.status === 'succeded') {
    return { status: 'success', percentage: 100, showIndicator: false }
  }

  else if (props.deployment.status === 'failed') {
    return { status: 'error', percentage: 100, showIndicator: false }
  }

  else {
    return { percentage: props.deployment.progress, processing: true }
  }
})

function onAbort() {
  dialog.warning({
    title: 'Abort deployment',
    content: 'This deployment will be aborted.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    showIcon: false,
    onPositiveClick: () => {
      useNuxtApp().$mqtt.publish({
        deviceId: props.deployment!.deviceId,
        action: 'command',
        type: 'update_abort',
        retain: false,
        payload: JSON.stringify({
          releaseId: props.deployment!.releaseId,
        }),
      })
    },
  })
}

function onTrigger() {
  useNuxtApp().$mqtt.publish({
    deviceId: props.device.id,
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
</script>
