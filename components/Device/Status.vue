<template>
  <naive-icon
    :name="icon.name"
    :size="size"
    :icon-color="icon.color"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ device: Device, size?: number }>()

const icon = computed(() => {
  switch (props.device.status) {
    case 'connected':
      return { name: ICON_CHECK, color: '#22c55e' }
    case 'disconnected':
      return { name: ICON_FAIL, color: '#22c55e' }
    default:
      return { name: ICON_UNKNOWN, color: '#a3a3a3' }
  }
})
</script>
