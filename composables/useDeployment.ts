export default function useDeployment (deviceId: Device['id']) {
  const key = `deployments-${deviceId}`

  const deployments = useState<Deployment[]>(key)

  async function find () {
    const request = '/api/deployments'

    if (deployments.value === undefined) {
      deployments.value = await useAuthFetch<Deployment[]>(request, {
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

    const deployment = useState<Deployment>(key)

    if (deployment.value === undefined) {
      deployment.value = await useAuthFetch(request)
    }

    return deployment
  }

  async function remove (id: Deployment['id']) {
    const request = `/api/deployments/${id}`

    return await useAuthFetch<Device>(request, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && deployments.value) {
          const deploymentIndex = deployments.value.findIndex(
            deployment => deployment.id === id
          )

          if (deploymentIndex >= 0) {
            deployments.value.splice(deploymentIndex, 1)
          }
        }
      }
    })
  }

  async function update (id: Deployment['id'], status: Deployment['status'], saveToDB = false) {
    if (deployments.value) {
      const deploymentIndex = deployments.value.findIndex(
        deployment => deployment.id === id
      )

      if (deploymentIndex >= 0) {
        deployments.value[deploymentIndex].status = status

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

        if (deployment.value) {
          deployments.value.unshift(deployment.value)
        }
      }
    }
  }

  return { find, update, remove, deployments }
}
