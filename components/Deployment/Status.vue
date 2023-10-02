<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <naive-icon
        v-if="deployment?.status === undefined"
        name="ph:question-duotone"
        :size="size"
        icon-color="#a3a3a3"
      />
      <naive-icon
        v-else-if="deployment.status === 'started'"
        name="svg-spinners:90-ring-with-bg"
        :size="size"
        icon-color="#3b82f6"
      />
      <naive-icon
        v-else-if="deployment.status === 'failed'"
        name="ph:x-circle-duotone"
        :size="size"
        icon-color="#ef4444"
      />
      <naive-icon
        v-else-if="deployment.status === 'succeded'"
        name="ph:check-circle-duotone"
        :size="size"
        icon-color="#22c55e"
      />
    </template>
    {{ deployment?.status || 'not found' }}
  </n-tooltip>
</template>

<script setup lang="ts">
defineProps<{ deployment?: Deployment, size?: number }>()
</script>
