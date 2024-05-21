<template>
  <div class="flex flex-col gap-8">
    <n-result
      v-if="!releases?.length"
      class="col-span-full"
      title="No releases found"
    >
      <template #icon>
        <result-empty />
      </template>
      <template #footer>
        <n-button
          type="primary"
          @click="createModalVisible = true"
        >
          Create first release
        </n-button>
      </template>
    </n-result>

    <template v-else>
      <div class="col-span-full flex gap-4">
        <n-input
          v-model:value="versionSearch"
          placeholder="Search by version"
        >
          <template #prefix>
            <naive-icon
              :name="ICON_SEARCH"
              :size="16"
            />
          </template>
        </n-input>

        <n-button
          type="primary"
          @click="createModalVisible = true"
        >
          Create release
        </n-button>
      </div>

      <n-list
        bordered
        show-divider
      >
        <n-list-item
          v-for="release of releasesPaginated"
          :key="release.id"
        >
          <release-item :release="release" />
        </n-list-item>

        <template
          v-if="pageCount > 1"
          #footer
        >
          <n-pagination
            v-model:page="page"
            :page-count="pageCount"
            class="my-1"
          />
        </template>
      </n-list>
    </template>

    <n-modal
      v-model:show="createModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm w-full"
    >
      <release-create
        :project="project"
        @cancel="createModalVisible = false"
        @done="onCreate"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const createModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const versionSearch = ref()

const lb = useLoadingIndicator()

lb.start()

const releases = await useRelease(props.project.id).find()

lb.finish()

const filteredReleases = filteredArrayByKey(releases, 'version', versionSearch)

const {
  output: releasesPaginated,
  page,
  pageCount,
} = usePagination(filteredReleases)

function onCreate() {
  createModalVisible.value = false
}
</script>
