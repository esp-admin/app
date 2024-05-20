<template>
  <naive-icon
    v-if="device.status === 'connected'"
    :name="ICON_CHECK"
    :size="size"
    icon-color="#22c55e"
  />
  <naive-icon
    v-if="device.status === 'disconnected'"
    :name="ICON_FAIL"
    :size="size"
    icon-color="#ef4444"
  />
  <naive-icon
    v-if="device.status === 'unregistered'"
    :name="ICON_UNKNOWN"
    :size="size"
    icon-color="#a3a3a3"
  />
</template>

<script setup lang="ts">
defineProps<{ device: Device, size?: number }>()
</script>
