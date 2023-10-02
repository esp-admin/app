<template>
  <div class="flex flex-col gap-6">
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

    <n-result v-else class="col-span-full my-5" title="You have no releases">
      <template #icon>
        <ResultEmpty />
      </template>
      <template #footer>
        <n-button type="primary" @click="createModalVisible = true">
          Create first release
        </n-button>
      </template>
    </n-result>

    <n-collapse>
      <n-collapse-item
        v-for="release of versionSearch ? filteredReleases : releases"
        :key="release.id"
        :name="release.version"
      >
        <template #header>
          <n-text strong>
            {{ release.version }}
          </n-text>
          <n-text class="mx-2">
            •
          </n-text>
          <n-text depth="3" class="text-base">
            Created <n-time
              :time="new Date(release.createdAt)"
              type="relative"
            />
          </n-text>
        </template>

        <LazyReleaseCard
          :key="release.id"
          :release="release"
        />
      </n-collapse-item>
    </n-collapse>

    <n-modal
      v-model:show="createModalVisible"
      title="Create new release"
      bordered
      segmented
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
