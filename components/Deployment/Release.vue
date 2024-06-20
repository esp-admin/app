<template>
  <div class="flex gap-2">
    <title-date
      class="flex-grow"
      :title="device.name"
      :created-at="deployment?.createdAt"
    />

    <n-button
      v-if="deployment?.status === 'started'"
      quaternary
      size="tiny"
      type="error"
      @click="onAbort"
    >
      Abort
    </n-button>

    <n-button
      quaternary
      size="tiny"
      @click="navigateTo(`/devices/${device.id}`)"
    >
      View
    </n-button>
  </div>

  <n-progress
    class="mt-2"
    type="line"
    :show-indicator="false"
    v-bind="progress"
  />
</template>

<script setup lang="ts">
import type { ProgressProps } from 'naive-ui'

const props = defineProps<{ device: Device, deployment?: Deployment }>()

const dialog = useDialog()

const progress = computed<ProgressProps>(() => {
  if (!props.deployment) {
    return {}
  }

  else if (props.deployment.status === 'succeded') {
    return { status: 'success', percentage: 100 }
  }

  else if (props.deployment.status === 'failed') {
    return { status: 'error', percentage: 100 }
  }

  else {
    return { status: 'info', percentage: props.deployment.progress, processing: true }
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
</script>
