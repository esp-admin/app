<template>
  <n-card size="small" title="Devices">
    <template #header>
      <div class="flex flex-wrap gap-2">
        <nuxt-link v-for="device of linkedDevicesWithDeployment" :key="device.id" :to="`/devices/${device.id}`">
          <n-button secondary>
            {{ device.name }}
            <template #icon>
              <DeploymentStatus :deployment="device.deployment" :size="18" />
            </template>
          </n-button>
        </nuxt-link>
      </div>
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <TooltipIconButton
          icon="ph:arrow-line-down"
          :disabled="linkedDevicesWithDeployment.length ===0"
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
  </n-card>
</template>

<script setup lang="ts">
import { defu } from 'defu'

const deleteModalVisible = ref(false)

const props = defineProps<{ release: Release }>()

const { findDeployments } = useRelease(props.release.projectId)

const { findLinked } = useDevice()

const linkedDevices = await findLinked(props.release.projectId)

const releaseDeployments = await findDeployments(props.release.id)

const linkedDevicesWithDeployment = computed(
  () => linkedDevices.value.map((device) => {
    const { deployments: deviceDeployments } = useDeployment(device.id)

    const initialDeployment = releaseDeployments.find(deployment => deployment.deviceId === device.id)

    const updatedDeployment = deviceDeployments.data.value?.find(deployment => deployment.releaseId === props.release.id)

    return defu(device, { deployment: updatedDeployment }, { deployment: initialDeployment })
  }))

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
</script>
