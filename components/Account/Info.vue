<template>
  <div v-if="user" class="flex items-center gap-3">
    <img :src="user.picture" class="w-10 h-10 object-cover border border-zinc-300 dark:border-zinc-700 rounded" alt="avatar">

    <div class="flex flex-col text-base">
      <n-text strong>
        {{ user.name }}
      </n-text>
      <n-text :depth="3">
        {{ user.email }}
      </n-text>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user } = useAuthSession()
</script>
