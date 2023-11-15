<template>
  <n-thing>
    <template #header>
      <TitleDate :title="release.version" :created-at="release.createdAt" />
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <ButtonIcon
          :icon="collapsed ? ICON_EXPAND : ICON_COLLAPSE"
          secondary
          @click="collapsed = !collapsed"
        />

        <ButtonIcon
          icon="ic:baseline-bolt"
          :disabled="linkedDevices.length === 0"
          secondary
          @click="onTrigger"
        />

        <ButtonIcon
          :icon="ICON_DELETE"
          secondary
          @click="deleteModalVisible = true"
        />
      </div>
    </template>

    <n-collapse-transition :show="!collapsed">
      <n-loading-bar-provider>
        <LazyReleaseDevices :release="release" />
      </n-loading-bar-provider>
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

// Show devices on release creation
onMounted(() => {
  const delay = 10000
  const createdAt = new Date(props.release.createdAt).getTime()
  const now = new Date().getTime()

  if (now < (createdAt + delay)) {
    collapsed.value = false
  }
})
</script>
