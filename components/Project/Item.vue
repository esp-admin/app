<template>
  <nuxt-link :to="`/projects/${project.id}`">
    <n-card size="small" hoverable class="h-full">
      <n-thing :description="project.description ?? ''">
        <template #header>
          <TitleDate :title="project.name" :created-at="project.createdAt" />
        </template>
      </n-thing>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ project: Project }>()
</script>
