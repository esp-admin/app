<template>
  <nuxt-link :to="`/projects/${project.id}`">
    <n-card :title="project.name" size="small" hoverable class="h-full">
      <n-text depth="3">
        Created <n-time :time="new Date(project.createdAt)" type="relative" />
      </n-text>
      <br>
      <n-text depth="3">
        {{ project.description || 'no description' }}
      </n-text>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ project: Project }>()
</script>
