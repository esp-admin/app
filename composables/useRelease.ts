export default function useRelease (projectId: Project['id']) {
  const key = `releases-project-${projectId}`
  const releases = useNuxtData<Release[]>(key)

  async function find () {
    const request = '/api/releases'

    if (!releases.data.value) {
      releases.data.value = await useAuthFetch<Release[]>(request, {
        query: { projectId }
      })
    }

    return releases.data
  }

  function remove (id: Release['id']) {
    const request = `/api/releases/${id}`

    return useAuthFetch<Release>(request, {
      method: 'DELETE',

      onResponse: async ({ response }) => {
        if (response.ok && releases.data.value) {
          removeArrayElByKey(releases.data.value, 'id', id)
        }

        if (response.ok) {
          await removeDeployments(id)
        }
      }
    })
  }

  function add (data: Partial<Release>) {
    const request = '/api/releases'
    data.projectId = projectId

    return useAuthFetch<Release>(request, {
      method: 'POST',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && releases.data.value) {
          releases.data.value.unshift(response._data)
        }
      }
    })
  }

  async function findDeployments (id: Release['id']) {
    const request = `/api/releases/${id}/deployments`
    const key = `deployments-release-${id}`

    const deployments = useNuxtData<Deployment[]>(key)

    if (!deployments.data.value) {
      deployments.data.value = await useAuthFetch<Deployment[]>(request)
    }

    return deployments.data
  }

  async function removeDeployments (id: Release['id']) {
    const devices = await useDevice().find()

    for (const device of devices.value ?? []) {
      const { deployments } = useDeployment(device.id)
      if (deployments.data.value) {
        removeArrayElByKey(deployments.data.value, 'releaseId', id)
      }
    }
  }

  async function removeAll () {
    const releases = await find()

    const urls = releases.value?.map(release => release.downloadPath) ?? []

    // Remove all uploaded files
    await useUpload().remove(urls)

    // Clear related deployments state
    releases.value?.forEach(release => removeDeployments(release.id))

    clearNuxtData(key)
  }

  return { find, remove, add, findDeployments, removeAll }
}
