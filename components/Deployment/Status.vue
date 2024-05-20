<template>
  <naive-icon
    :name="icon.name"
    :size="size"
    :icon-color="icon.color"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ deployment?: Deployment, size?: number }>()

const icon = computed(() => {
  switch (props.deployment?.status) {
    case 'started':
      return { name: ICON_LOADING, color: '#3b82f6' }
    case 'succeded':
      return { name: ICON_CHECK, color: '#22c55e' }
    case 'failed':
      return { name: ICON_FAIL, color: '#ef4444' }
    default:
      return { name: ICON_UNKNOWN, color: '#a3a3a3' }
  }
})
</script>
