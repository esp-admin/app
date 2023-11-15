export default function useDeployment (deviceId: Device['id']) {
  const key = `deployments-device-${deviceId}`
  const deployments = useNuxtData<Deployment[]>(key)

  async function find () {
    const request = '/api/deployments'

    if (!deployments.data.value) {
      deployments.data.value = await useAuthFetch<Deployment[]>(request, {
        query: {
          deviceId
        }
      })
    }

    return deployments.data
  }

  async function findOne (id: Deployment['id']) {
    const key = `deployment-${id}`
    const request = `/api/deployments/${id}`

    const deployment = useNuxtData<Deployment>(key)

    deployment.data.value ||= await useAuthFetch(request)

    return deployment.data
  }

  async function remove (id: Deployment['id']) {
    const request = `/api/deployments/${id}`

    return await useAuthFetch<Device>(request, {
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
      const request = `/api/deployments/${id}`

      await useAuthFetch(request, {
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
