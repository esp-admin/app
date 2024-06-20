<template>
  <div class="flex justify-between">
    <title-date
      :title="title"
      :created-at="deployment?.createdAt"
    />

    <slot name="action" />
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
  console.log(props.deployment?.status)

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
</script>
