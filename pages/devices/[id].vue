<template>
  <div v-if="device">
    <div class="flex justify-between mb-4 gap-2">
      <div class="flex flex-col flex-grow">
        <div class="flex items-center gap-2">
          <n-text class="text-lg" strong>
            {{ device.name }}
          </n-text>
        </div>

        <n-text depth="3">
          {{ device.status }}
        </n-text>
      </div>

      <n-button type="error" secondary circle @click="deleteModalVisible = true">
        <template #icon>
          <naive-icon name="ph:trash" />
        </template>
      </n-button>

      <n-button v-if="device.projectId" type="primary" secondary circle @click="unlinkModalVisible = true">
        <template #icon>
          <naive-icon name="ph:link-break" />
        </template>
      </n-button>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="metadata" tab="Metadata">
        <DeviceMetadata class="mt-4" :device="device" />
      </n-tab-pane>

      <n-tab-pane name="variables" tab="Variables">
        <DeviceVariables class="mt-4" :device="device" />
      </n-tab-pane>

      <n-tab-pane name="realtime" tab="Realtime">
        <DeviceRealtime class="mt-4" :device="device" />
      </n-tab-pane>

      <n-tab-pane name="deployments" tab="Deployments">
        <DeviceDeployments class="mt-4" :device="device" />
      </n-tab-pane>
    </n-tabs>

    <n-modal v-model:show="deleteModalVisible" preset="card" :closable="false" :mask-closable="false" class="max-w-sm">
      <DeviceDelete :device="device" @cancel="deleteModalVisible = false" @done="onDelete" />
    </n-modal>

    <n-modal v-model:show="unlinkModalVisible" preset="card" :closable="false" :mask-closable="false" class="max-w-sm">
      <DeviceUnlink :device="device" @cancel="unlinkModalVisible = false" @done="onUnlink" />
    </n-modal>
  </div>

  <n-text v-else>
    Not found
  </n-text>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as { id: string }
    return /^[a-fA-F0-9]{24}$/.test(params.id)
  }
})

const deleteModalVisible = ref(false)

const unlinkModalVisible = ref(false)

const route = useRoute()

const id = route.params.id as string

const { findOne } = useDevice()

const device = await findOne(id)

function onDelete () {
  deleteModalVisible.value = false
  navigateTo('/devices')
}

function onUnlink () {
  unlinkModalVisible.value = false
}
</script>
