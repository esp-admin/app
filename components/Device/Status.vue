<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <naive-icon
        v-if="device.status === 'connected'"
        name="ph:check-circle-duotone"
        :size="size"
        icon-color="#22c55e"
      />
      <naive-icon
        v-if="device.status === 'disconnected'"
        name="ph:x-circle-duotone"
        :size="size"
        icon-color="#ef4444"
      />
      <naive-icon
        v-if="device.status === 'unregistered'"
        name="ph:warning-circle-duotone"
        :size="size"
        icon-color="#a3a3a3"
      />
    </template>
    {{ device.status }}
  </n-tooltip>
</template>

<script setup lang="ts">
defineProps<{ device: Device, size?: number }>()
</script>
