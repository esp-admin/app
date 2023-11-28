export default function useDeployment (deviceId: Device['id']) {
  const key = `deployments-device-${deviceId}`
  const deployments = useNuxtData<Deployment[]>(key)
  const { $auth } = useNuxtApp()

  async function find () {
    deployments.data.value ||= await $auth.fetch<Deployment[]>('/api/deployments', {
      query: {
        deviceId
      }
    })

    return deployments.data
  }

  async function findOne (id: Deployment['id']) {
    const key = `deployment-${id}`

    const deployment = useNuxtData<Deployment>(key)

    deployment.data.value ||= await $auth.fetch<Deployment>(`/api/deployments/${id}`)

    return deployment.data
  }

  async function remove (id: Deployment['id']) {
    return await $auth.fetch(`/api/deployments/${id}`, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && deployments.data.value) {
          removeArrayElByKey(deployments.data.value, 'id', id)
        }
      }
    })
  }

  async function updateStatus (id: Deployment['id'], status: Deployment['status'], fetchData = false) {
    if (fetchData) {
      await $auth.fetch(`/api/deployments/${id}`, {
        method: 'PATCH',
        body: {
          status
        }
      })
    }

    await find()

    if (deployments.data.value) {
      const deploymentIndex = deployments.data.value.findIndex(
        deployment => deployment.id === id
      )

      if (deploymentIndex >= 0) {
        deployments.data.value[deploymentIndex].status = status
      } else {
        const deployment = await findOne(id)

        if (deployment.value) {
          deployments.data.value.unshift(deployment.value)
        }
      }
    }
  }

  function removeAll () {
    clearNuxtData(key)
  }

  return { find, updateStatus, remove, removeAll, deployments }
}
