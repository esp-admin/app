<template>
  <div class="flex flex-col gap-6">
    <div v-if="releases?.length" class="col-span-full flex gap-4">
      <n-input v-model:value="versionSearch">
        <template #prefix>
          <naive-icon name="ph:magnifying-glass" :size="16" />
        </template>
      </n-input>

      <n-button type="primary" @click="createModalVisible = true">
        Create release
      </n-button>
    </div>

    <n-result v-else class="col-span-full my-5" title="You have no releases">
      <template #icon>
        <img src="~/assets/images/no-results.png" alt="no-results" width="200">
      </template>
      <template #footer>
        <n-button type="primary" @click="createModalVisible = true">
          Create first release
        </n-button>
      </template>
    </n-result>

    <ReleaseCard
      v-for="release of versionSearch ? filteredReleases : releases"
      :key="release.id"
      :release="release"
      :project-id="project.id"
    />

    <n-modal
      v-model:show="createModalVisible"
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

const filteredReleases = computed(() => releases.value.filter(release => release.version.includes(versionSearch.value)))

function onCreate () {
  createModalVisible.value = false
}
</script>
