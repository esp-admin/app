<template>
  <naive-icon
    v-if="!deployment?.status"
    :name="ICON_UNKNOWN"
    :size="size"
    icon-color="#a3a3a3"
  />
  <naive-icon
    v-else-if="deployment.status === 'started'"
    :name="ICON_LOADING"
    :size="size"
    icon-color="#3b82f6"
  />
  <naive-icon
    v-else-if="deployment.status === 'failed'"
    :name="ICON_FAIL"
    :size="size"
    icon-color="#ef4444"
  />
  <naive-icon
    v-else-if="deployment.status === 'succeded'"
    :name="ICON_CHECK"
    :size="size"
    icon-color="#22c55e"
  />
</template>

<script setup lang="ts">
defineProps<{ deployment?: Deployment, size?: number }>()
</script>
