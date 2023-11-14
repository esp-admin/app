<template>
  <div class="flex flex-col">
    <n-text class="font-medium">
      {{ title }}
    </n-text>

    <div :key="key">
      <n-text v-if="createdAt" depth="3" class="text-base font-normal">
        <n-time :time="new Date(createdAt)" type="relative" />
      </n-text>

      <n-text v-else-if="updatedAt" depth="3" class="text-base font-normal">
        <n-time :time="new Date(updatedAt)" type="relative" />
      </n-text>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps <{ title: string, createdAt?: string | Date, updatedAt?: string | Date }>()

const key = ref(0)

onMounted(() => setInterval(() => key.value++, 10000))

// TODO onUnmounted clearInterval
</script>
