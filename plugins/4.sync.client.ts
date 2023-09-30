export default defineNuxtPlugin(() => {
  const deploymentTimemoutMs = 3 * 60 * 1000
  const syncIntervalMs = 5000

  setInterval(sync, syncIntervalMs)

  function sync () {
    const { devices } = useDevice()

    for (const device of devices.value || []) {
      const { deployments, update } = useDeployment(device.id)

      for (const deployment of deployments.value || []) {
        if (deployment.status === 'started') {
          const deploymentStartTimestamp = new Date(deployment.createdAt).getTime()
          const maxDeploymentEndTimestamp = deploymentStartTimestamp + deploymentTimemoutMs
          const now = new Date().getTime()

          if (maxDeploymentEndTimestamp < now) {
            update(deployment.id, 'failed', true)
          }
        }
      }
    }
  }
})
