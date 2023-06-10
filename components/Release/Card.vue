<template>
    <n-card size="small" hoverable :header-extra-style="{ padding: 0 }">
        <template #header>
            <div class="flex flex-col">
                <n-text class="text-base">{{ version }}</n-text>
                <n-text depth="3" class="text-sm font-semibold">Completed</n-text>
            </div>

        </template>

        <template #header-extra>
            <div class="flex gap-2">
                <n-button secondary>Trigger</n-button>
                <n-button secondary @click="deleteModalVisible = true">Delete</n-button>
            </div>
        </template>

        <n-modal preset="card" v-model:show="deleteModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <ReleaseDelete @cancel="deleteModalVisible = false" />
        </n-modal>
    </n-card>
</template>

<script setup>
const version = ref("v1.0.0")

const deleteModalVisible = ref(false)
</script>