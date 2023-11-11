<template>
  <div class="flex flex-col gap-8">
    <div v-if="releases?.length" class="col-span-full flex gap-4">
      <n-input v-model:value="versionSearch" placeholder="Search by version">
        <template #prefix>
          <naive-icon name="ph:magnifying-glass" :size="16" />
        </template>
      </n-input>

      <n-button type="primary" @click="createModalVisible = true">
        Create release
      </n-button>
    </div>

    <n-result v-else class="col-span-full" title="No releases found">
      <template #icon>
        <ResultEmpty />
      </template>
      <template #footer>
        <n-button type="primary" @click="createModalVisible = true">
          Create first release
        </n-button>
      </template>
    </n-result>

    <n-list bordered show-divider hoverable>
      <n-list-item v-for="release of filteredReleases" :key="release.id">
        <ReleaseItem :release="release" />
      </n-list-item>
    </n-list>

    <n-modal
      v-model:show="createModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm w-full"
    >
      <ReleaseCreate :project="project" @cancel="createModalVisible = false" @done="onCreate" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const createModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const { find } = useRelease(props.project.id)

const versionSearch = ref('')

const releases = await find()

const filteredReleases = filteredArrayByKey(releases, 'version', versionSearch)

const expandedCollapseName = ref()

function onCreate (release:Release) {
  createModalVisible.value = false
  expandedCollapseName.value = release.id
}

</script>
