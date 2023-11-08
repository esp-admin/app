/*
This client-side plugin is intended for state update
The routine handler `sync` runs every SYNC_INTERVAL_MS
*/

const DEPLOYMENT_TIMEOUT_MS = 4 * 60 * 1000
const SYNC_INTERVAL_MS = 10 * 1000

export default defineNuxtPlugin({
  enforce: 'pre',

  setup: (nuxtApp) => {
    let intervalId:any

    nuxtApp.hook('auth:loggedIn', (loggedIn) => {
      if (loggedIn) {
        intervalId = setInterval(sync, SYNC_INTERVAL_MS)
      } else if (intervalId) {
        clearInterval(intervalId)
      }
    })

    function sync () {
      updateDeployments()
    }

    /**
     * This function updates all existant deployments with `failed` status after DEPLOYMENT_TIMEOUT_MS reached
     */
    async function updateDeployments () {
      const { find } = useDevice()

      // All devices are fetched on login event
      const devices = await find()

      for (const device of devices.value ?? []) {
        const { deployments, update } = useDeployment(device.id)

        for (const deployment of deployments.data.value ?? []) {
          if (deployment.status === 'started') {
            const deploymentStartTimestamp = new Date(deployment.createdAt).getTime()
            const maxDeploymentEndTimestamp = deploymentStartTimestamp + DEPLOYMENT_TIMEOUT_MS
            const now = new Date().getTime()

            if (maxDeploymentEndTimestamp < now) {
              // This deployment has reached timeout, thus its status should be updated to `failed`
              await update(deployment.id, 'failed', true)
            }
          }
        }
      }
    }
  }
})
