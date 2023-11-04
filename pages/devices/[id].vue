<template>
  <div v-if="device">
    <n-page-header :title="device.name" class="mb-8" :on-back="$router.back">
      <template #extra>
        <div class="flex justify-between gap-2">
          <TooltipIconButton
            v-if="device.projectId"
            name="ph:link-break"
            secondary
            type="primary"
            message="Unlink device"
            @click="unlinkModalVisible = true"
          />

          <NuxtLink v-if="device.projectId" :to="`/projects/${device.projectId}`">
            <TooltipIconButton
              v-if="device.projectId"
              secondary
              type="primary"
              name="ph:code"
              message="Linked project"
            />
          </NuxtLink>

          <TooltipIconButton
            name="ph:trash"
            secondary
            type="error"
            message="Delete device"
            @click="deleteModalVisible = true"
          />
        </div>
      </template>
    </n-page-header>

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

    <n-modal
      v-model:show="deleteModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <DeviceDelete :device="device" @cancel="deleteModalVisible = false" @done="onDelete" />
    </n-modal>

    <n-modal
      v-model:show="unlinkModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
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
    return REGEX_ID.test(params.id)
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
