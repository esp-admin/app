/*
This client-side plugin is intended for state update
The routine handler `sync` runs every SYNC_INTERVAL_MS
*/

const DEPLOYMENT_TIMEOUT_MS = 4 * 60 * 1000
const SYNC_INTERVAL_MS = 10 * 1000

export default defineNuxtPlugin((nuxtApp) => {
  let intervalId: NodeJS.Timeout

  nuxtApp.hook('auth:loggedIn', async (loggedIn) => {
    if (loggedIn) {
      // All devices are fetched on login event
      await useDevice().find()

      intervalId = setInterval(sync, SYNC_INTERVAL_MS)
    }
    else if (intervalId) {
      clearInterval(intervalId)
    }
  })

  function sync() {
    updateDeployments()
  }

  /**
     * This function updates all existant deployments with `failed` status after DEPLOYMENT_TIMEOUT_MS reached
     */
  async function updateDeployments() {
    const devices = await useDevice().find()

    for (const device of devices.value ?? []) {
      const { deployments, updateStatus } = useDeployment(device.id)

      for (const deployment of deployments.value ?? []) {
        if (deployment.status === 'started') {
          const deploymentStartTimestamp = new Date(deployment.createdAt).getTime()
          const maxDeploymentEndTimestamp = deploymentStartTimestamp + DEPLOYMENT_TIMEOUT_MS
          const now = new Date().getTime()

          if (maxDeploymentEndTimestamp < now) {
            // This deployment has reached timeout, thus its status should be updated to `failed`
            await updateStatus(deployment.id, 'failed', true)
          }
        }
      }
    }
  }
})
