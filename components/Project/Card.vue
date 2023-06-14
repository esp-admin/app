<template>
    <n-card :title="project.name" size="small" hoverable>
        <n-text depth="3"> {{ project.description }}</n-text>

        <div class="mt-4 flex">
            <nuxt-link :to="`/projects/${project.id}`">
                <n-button secondary>View</n-button>
            </nuxt-link>
        </div>
    </n-card>
</template>

<script setup lang="ts">
defineProps<{ project: Project }>()
</script>