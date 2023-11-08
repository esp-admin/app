<template>
  <nuxt-link :to="`/devices/${device.id}`">
    <n-card size="small" hoverable class="h-full">
      <template #header>
        <TitleDate :title="device.name" :created-at="device.createdAt" />
      </template>

      <template #header-extra>
        <DeviceStatus :device="device" :size="22" />
      </template>

      <n-text depth="2">
        {{ device.description ?? 'no description' }}
      </n-text>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>
