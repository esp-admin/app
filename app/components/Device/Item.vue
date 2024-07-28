<template>
  <nuxt-link :to="`/devices/${device.id}`">
    <n-card
      size="small"
      hoverable
      class="h-full"
    >
      <n-thing>
        <template #avatar>
          <device-status
            :device="device"
            :size="23"
          />
        </template>

        <template #header>
          <title-date
            :title="device.name"
            :updated-at="device.updatedAt"
          />
        </template>

        <n-text
          v-if="device.description"
          depth="2"
        >
          {{ truncateString(device.description) }}
        </n-text>
      </n-thing>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ device: Device }>()
</script>
