<template>
  <div class="flex flex-wrap gap-2">
    <nuxt-link v-for="device of linkedDevicesWithDeployment" :key="device.id" :to="`/devices/${device.id}`">
      <n-button quaternary>
        {{ device.name }}
        <template #icon>
          <DeploymentStatus :deployment="device.deployment" />
        </template>
      </n-button>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { defu } from 'defu'

const props = defineProps<{ release: Release }>()

const { findDeployments } = useRelease(props.release.projectId)

const { findLinked } = useDevice()

const lb = useLoadingBar()

lb.start()

const linkedDevices = await findLinked(props.release.projectId)

const releaseDeployments = await findDeployments(props.release.id)

lb.finish()

const linkedDevicesWithDeployment = computed(
  () => linkedDevices.value.map(
    (device) => {
      const { deployments: deviceDeployments } = useDeployment(device.id)

      const initialDeployment = releaseDeployments.value?.find(deployment => deployment.deviceId === device.id)

      const updatedDeployment = deviceDeployments.data.value?.find(deployment => deployment.releaseId === props.release.id)

      return defu(device, { deployment: updatedDeployment }, { deployment: initialDeployment })
    }
  ))

</script>
