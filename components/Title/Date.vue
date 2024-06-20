<template>
  <div class="flex flex-col">
    <n-text class="font-medium">
      {{ title }}
    </n-text>

    <n-text
      :key="key"
      depth="3"
      class="text-base font-normal"
    >
      <n-time
        v-if="createdAt"
        :time="new Date(createdAt)"
        type="relative"
      />

      <n-time
        v-else-if="updatedAt"
        :time="new Date(updatedAt)"
        type="relative"
      />

      <p v-else>
        N/A
      </p>
    </n-text>
  </div>
</template>

<script setup lang="ts">
defineProps <{ title: string, createdAt?: string | Date, updatedAt?: string | Date }>()

const key = ref(0)

let intervalId: NodeJS.Timeout

onMounted(() => {
  intervalId = setInterval(() => key.value++, 10000)
})

onUnmounted(() => clearInterval(intervalId))
</script>
