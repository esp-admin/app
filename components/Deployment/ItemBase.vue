<template>
  <div class="flex justify-between">
    <title-date
      :title="title"
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

const props = defineProps<{ title: string, deployment?: Deployment }>()

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
  useNuxtApp().$mqtt.publish({
    deviceId: props.deployment!.deviceId,
    action: 'command',
    type: 'update_abort',
    retain: false,
    payload: JSON.stringify({
      releaseId: props.deployment!.releaseId,
    }),
  })
}
</script>
