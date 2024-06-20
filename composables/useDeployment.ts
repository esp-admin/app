export default function useDeployment(deviceId: Device['id']) {
  const key = `deployments-device-${deviceId}`
  const deployments = useState<Deployment[]>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    deployments.value ||= await $auth.fetch<Deployment[]>(`/api/devices/${deviceId}/deployments`)

    return deployments
  }

  async function findOne(id: Deployment['id']) {
    const key = `deployment-${id}`

    const deployment = useState<Deployment>(key)

    deployment.value ||= await $auth.fetch<Deployment>(`/api/deployments/${id}`)

    return deployment
  }

  async function remove(id: Deployment['id']) {
    return await $auth.fetch(`/api/deployments/${id}`, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && deployments.value) {
          removeArrayElByKey(deployments.value, 'id', id)
        }
      },
    })
  }

  async function updateStatus(id: Deployment['id'], status: Deployment['status'], fetchData = false) {
    if (fetchData) {
      await $auth.fetch(`/api/deployments/${id}`, {
        method: 'PATCH',
        body: {
          status,
        },
      })
    }

    await find()

    if (deployments.value) {
      const deploymentIndex = deployments.value.findIndex(
        deployment => deployment.id === id,
      )

      if (deploymentIndex >= 0) {
        deployments.value[deploymentIndex].status = status
      }
      else {
        const deployment = await findOne(id)

        if (deployment.value) {
          deployments.value.unshift(deployment.value)
        }
      }
    }
  }

  function updateProgress(id: Deployment['id'], progress: number) {
    if (deployments.value) {
      const deploymentIndex = deployments.value.findIndex(
        deployment => deployment.id === id,
      )
      if (deploymentIndex >= 0) {
        deployments.value[deploymentIndex].progress = progress
      }
    }
  }

  function removeAll() {
    clearNuxtData(key)
  }

  return { find, updateStatus, updateProgress, remove, removeAll, deployments }
}
