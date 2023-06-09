<template>
    <n-card :title="version" size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header-extra>
            <div class="flex gap-2">
                <n-button secondary>Trigger</n-button>
                <n-button secondary>Delete</n-button>
            </div>
        </template>
    </n-card>
</template>

<script setup>
const version = ref("v1.0.0")
</script>