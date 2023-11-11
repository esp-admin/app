<template>
  <nuxt-link :to="`/devices/${device.id}`">
    <n-card size="small" hoverable class="h-full">
      <n-thing :description="device.description ?? ''">
        <template #avatar>
          <DeviceStatus :device="device" :size="24" />
        </template>

        <template #header>
          <TitleDate :title="device.name" :created-at="device.createdAt" />
        </template>
      </n-thing>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>
