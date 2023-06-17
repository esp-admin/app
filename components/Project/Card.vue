<template>
    <nuxt-link :to="`/projects/${project.id}`">
        <n-card :title="project.name" size="small" hoverable>
            <n-text depth="3"> {{ project.description }}</n-text>
        </n-card>
    </nuxt-link>
</template>

<script setup lang="ts">
defineProps<{ project: Project }>()
</script>