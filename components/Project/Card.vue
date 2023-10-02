<template>
  <nuxt-link :to="`/projects/${project.id}`">
    <n-card size="small" hoverable class="h-full">
      <template #header>
        <TitleDate :title="project.name" :created-at="project.createdAt" />
      </template>

      <n-text depth="3">
        {{ project.description || 'no description' }}
      </n-text>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ project: Project }>()
</script>
