<template>
  <div class="flex gap-2 items-center flex-wrap">
    <naive-icon v-if="icon" :name="icon" />

    <slot name="icon" />

    <n-text>
      {{ title }}
    </n-text>

    <div :key="key">
      <n-text v-if="createdAt" depth="3" class="text-base font-normal">
        Created <n-time :time="new Date(createdAt)" type="relative" />
      </n-text>

      <n-text v-else-if="updatedAt" depth="3" class="text-base font-normal">
        Updated <n-time :time="new Date(updatedAt)" type="relative" />
      </n-text>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string, icon?: string, createdAt?: string | Date, updatedAt?: string | Date }>()

const key = ref(0)

onMounted(() => setInterval(() => key.value++, 10000))
</script>
