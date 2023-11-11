<template>
  <n-thing class="cursor-pointer" @click="toggleCollapse">
    <template #header>
      <TitleDate :title="release.version" :created-at="release.createdAt" />
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <TooltipIconButton
          icon="ph:arrow-line-down"
          :disabled="linkedDevices.length ===0"
          message="Deploy now"
          secondary
          @click="onTrigger"
        />

        <TooltipIconButton
          icon="ph:trash"
          message="Delete release"
          secondary
          @click="deleteModalVisible = true"
        />
      </div>
    </template>

    <n-collapse-transition :show="!collapsed">
      <LazyReleaseDevices :release="release" />
    </n-collapse-transition>
  </n-thing>

  <n-modal
    v-model:show="deleteModalVisible"
    bordered
    preset="card"
    :closable="false"
    :mask-closable="false"
    class="max-w-sm"
  >
    <ReleaseDelete
      :release="release"
      @cancel="deleteModalVisible = false"
      @done="onDelete"
    />
  </n-modal>
</template>

<script setup lang="ts">

const deleteModalVisible = ref(false)

const props = defineProps<{ release: Release }>()

const collapsed = ref(true)

const { findLinked } = useDevice()

const linkedDevices = await findLinked(props.release.projectId)

function onDelete () {
  deleteModalVisible.value = false
}

function onTrigger () {
  const { $mqtt } = useNuxtApp()

  for (const device of linkedDevices.value) {
    $mqtt.publish({
      deviceId: device.id,
      action: 'command',
      type: 'update',
      retain: true,
      payload: JSON.stringify({
        releaseId: props.release.id,
        downloadPath: props.release.downloadPath,
        version: props.release.version
      })
    })
  }
}

function toggleCollapse () {
  collapsed.value = !collapsed.value
}
</script>
