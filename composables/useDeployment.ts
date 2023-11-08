export default function useDeployment (deviceId: Device['id']) {
  const key = `deployments-device-${deviceId}`
  const deployments = useNuxtData<Deployment[]>(key)
  const loadingBar = useLoadingBar()

  async function find () {
    const request = '/api/deployments'

    if (!deployments.data.value) {
      loadingBar.start()

      deployments.data.value = await useAuthFetch<Deployment[]>(request, {
        query: {
          deviceId
        }
      })

      loadingBar.finish()
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

  async function update (id: Deployment['id'], status: Deployment['status'], fetchData = false) {
    if (!deployments.data.value) { return }

    const deploymentIndex = deployments.data.value.findIndex(
      deployment => deployment.id === id
    )

    if (deploymentIndex >= 0) {
      deployments.data.value[deploymentIndex].status = status

      if (fetchData) {
        const request = `/api/deployments/${id}`

        return await useAuthFetch(request, {
          method: 'PATCH',
          body: {
            status
          }
        })
      }
    } else {
      const deployment = await findOne(id)

      if (deployment.value) {
        deployments.data.value.unshift(deployment.value)
      }
    }
  }

  function removeByRelease (releaseId: Release['id']) {
    if (deployments.data.value) {
      removeArrayElByKey(deployments.data.value, 'releaseId', releaseId)
    }
  }

  function removeAll () {
    clearNuxtData(key)
  }

  return { find, update, remove, removeByRelease, removeAll, deployments }
}
