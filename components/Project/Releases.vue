<template>
    <div class="flex flex-col gap-4">
        <div v-if="releases?.length" class="col-span-full flex gap-4">
            <n-input>
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>

            <n-button type="primary" @click="createModalVisible = true">
                Create release
            </n-button>
        </div>

        <n-result v-else class="col-span-full my-5" status="info" title="You have no releases">
            <template #footer>
                <n-button type="primary" @click="createModalVisible = true">Create first release</n-button>
            </template>
        </n-result>

        <ReleaseCard v-for="release of releases" :release="release" :projectId="project.id"></ReleaseCard>

        <n-modal preset="card" v-model:show="createModalVisible" :closable="false" :mask-closable="false"
            class="max-w-xs" title="Create release" segmented>
            <ReleaseCreate @cancel="createModalVisible = false" @done="onCreate" :project="project" />
        </n-modal>
    </div>
</template>

<script setup lang="ts">
const createModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const { find } = useRelease(props.project.id)

const { data: releases } = await find()

function onCreate() {
    createModalVisible.value = false
}
</script>