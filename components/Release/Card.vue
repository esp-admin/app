<template>
  <n-card size="small" title="Devices">
    <template #header-extra>
      <div class="flex gap-2">
        <TooltipIconButton
          name="ph:arrow-line-down"
          message="Deploy now"
          secondary
          @click="onTrigger"
        />

        <TooltipIconButton
          name="ph:trash"
          message="Delete release"
          secondary
          @click="deleteModalVisible = true"
        />
      </div>
    </template>

    <div class="flex flex-wrap gap-2">
      <nuxt-link v-for="device of devicesWithDeployment" :key="device.id" :to="`/devices/${device.id}`">
        <n-button secondary>
          {{ device.name }}
          <template #icon>
            <DeploymentStatus :deployment="device.deployment" :size="18" />
          </template>
        </n-button>
      </nuxt-link>
    </div>

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

const { find } = useDevice()

const devices = await find()

const releaseDevices = computed(() => devices.value?.filter(device => device.projectId === props.release.projectId) || [])

const releaseDeployments = await findDeployments(props.release.id)

const devicesWithDeployment = computed(() => releaseDevices.value.map((device) => {
  const { deployments: deviceDeployments } = useDeployment(device.id)

  // Update
  const deviceDeployment = deviceDeployments.data.value?.find(deployment => deployment.releaseId === props.release.id)

  // Initial
  const releaseDeployment = releaseDeployments.find(deployment => deployment.deviceId === device.id)

  return defu(device, { deployment: deviceDeployment }, { deployment: releaseDeployment })
}))

function onDelete () {
  deleteModalVisible.value = false
}

async function onTrigger () {
  const { find } = useDevice()

  const devices = await find()

  const relatedDevices = devices.value?.filter(device => device.projectId === props.release.projectId) || []

  const { $mqtt } = useNuxtApp()

  for (const device of relatedDevices) {
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
