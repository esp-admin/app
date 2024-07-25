<template>
  <div class="grid lg:grid-cols-3 gap-8">
    <div
      v-if="linkedDevices?.length"
      class="col-span-full flex gap-4"
    >
      <n-input
        v-model:value="nameSearch"
        placeholder="Search by name"
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
        @click="linkModalVisible = true"
      >
        Link device
      </n-button>
    </div>

    <n-result
      v-else
      class="col-span-full"
      title="No linked devices found"
    >
      <template #icon>
        <result-empty />
      </template>
      <template #footer>
        <n-button
          type="primary"
          @click="linkModalVisible = true"
        >
          Link first device
        </n-button>
      </template>
    </n-result>

    <device-item
      v-for="device of filteredDevices"
      :key="device.id"
      :device="device"
    />

    <n-modal
      v-model:show="linkModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <device-link
        :project="project"
        @cancel="linkModalVisible = false"
        @done="onLink"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const linkModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const { findLinked } = useDevice()

const linkedDevices = await findLinked(props.project.id)

const nameSearch = ref()

const filteredDevices = filteredArrayByKey(linkedDevices, 'name', nameSearch)

function onLink() {
  linkModalVisible.value = false
}
</script>
