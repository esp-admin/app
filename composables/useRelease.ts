export default function useRelease (projectId: Project['id']) {
  const key = `releases-project-${projectId}`
  const releases = useNuxtData<Release[]>(key)
  const { $auth } = useNuxtApp()

  async function find () {
    if (!releases.data.value) {
      releases.data.value = await $auth.fetch<Release[]>('/api/releases', {
        query: { projectId }
      })
    }

    return releases.data
  }

  function remove (id: Release['id']) {
    return $auth.fetch<Release>(`/api/releases/${id}`, {
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
    data.projectId = projectId

    return $auth.fetch<Release>('/api/releases', {
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
    const key = `deployments-release-${id}`

    const deployments = useNuxtData<Deployment[]>(key)

    if (!deployments.data.value) {
      deployments.data.value = await $auth.fetch<Deployment[]>(`/api/releases/${id}/deployments`)
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
