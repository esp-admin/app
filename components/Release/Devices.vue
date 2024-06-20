<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <n-card
      v-for="device of linkedDevicesWithDeployment"
      :key="device.id"
      size="small"
      class="h-full"
    >
      <deployment-release
        :device="device"
        :deployment="device.deployment"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { defu } from 'defu'

const props = defineProps<{ release: Release }>()

const lb = useLoadingIndicator()

lb.start()

const linkedDevices = await useDevice().findLinked(props.release.projectId)

const releaseDeployments = await useRelease(props.release.projectId).findDeployments(props.release.id)

lb.finish()

const linkedDevicesWithDeployment = computed(
  () => linkedDevices.value.map(
    (device) => {
      const { deployments: deviceDeployments } = useDeployment(device.id)

      const initialDeployment = releaseDeployments.value?.find(deployment => deployment.deviceId === device.id)

      const updatedDeployment = deviceDeployments.value?.find(deployment => deployment.releaseId === props.release.id)

      return defu(device, { deployment: updatedDeployment }, { deployment: initialDeployment })
    },
  ))
</script>
