<template>
  <nuxt-link :to="`/projects/${project.id}`">
    <n-card size="small" hoverable class="h-full">
      <n-thing>
        <template #header>
          <TitleDate :title="project.name" :created-at="project.createdAt" />
        </template>

        <n-text v-if="project.description" depth="2">
          {{ truncateString(project.description) }}
        </n-text>
      </n-thing>
    </n-card>
  </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ project: Project }>()
</script>
