<template>
    <div class="flex flex-col gap-4">
        <div class="col-span-full flex gap-4">
            <n-input>
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>

            <n-button type="primary" @click="createModalVisible = true">
                Create release
            </n-button>
        </div>

        <ReleaseCard v-for="release of project.releases"></ReleaseCard>
        <ReleaseCard></ReleaseCard>
        <ReleaseCard></ReleaseCard>

        <n-modal preset="card" v-model:show="createModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <ReleaseCreate @cancel="createModalVisible = false" @done="onCreate" :project="project" />
        </n-modal>
    </div>
</template>

<script setup lang="ts">
const createModalVisible = ref(false)

defineProps<{ project: Project }>()

function onCreate() {
    createModalVisible.value = false
}
</script>