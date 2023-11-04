export default function useDeployment (deviceId: Device['id']) {
  const key = `deployments-${deviceId}`

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

    return deployments
  }

  async function findOne (id: Deployment['id']) {
    const key = `deployment-${id}`
    const request = `/api/deployments/${id}`

    const deployment = useNuxtData<Deployment>(key)

    if (!deployment.data.value) {
      deployment.data.value = await useAuthFetch(request)
    }

    return deployment
  }

  async function remove (id: Deployment['id']) {
    const request = `/api/deployments/${id}`

    return await useAuthFetch<Device>(request, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && deployments.data.value) {
          const deploymentIndex = deployments.data.value.findIndex(
            deployment => deployment.id === id
          )

          if (deploymentIndex >= 0) {
            deployments.data.value.splice(deploymentIndex, 1)
          }
        }
      }
    })
  }

  async function update (id: Deployment['id'], status: Deployment['status'], saveToDB = false) {
    if (deployments.data.value) {
      const deploymentIndex = deployments.data.value.findIndex(
        deployment => deployment.id === id
      )

      if (deploymentIndex >= 0) {
        deployments.data.value[deploymentIndex].status = status

        if (saveToDB) {
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

        if (deployment.data.value) {
          deployments.data.value.unshift(deployment.data.value)
        }
      }
    }
  }

  return { find, update, remove, deployments }
}
