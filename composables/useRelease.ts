export default function useRelease(projectId: Project['id']) {
  const key = `releases-project-${projectId}`
  const releases = useNuxtData<Release[]>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    releases.data.value ||= await $auth.fetch<Release[]>(`/api/projects/${projectId}/releases`)

    return releases.data
  }

  function remove(id: Release['id']) {
    return $auth.fetch(`/api/releases/${id}`, {
      method: 'DELETE',

      onResponse: async ({ response }) => {
        if (response.ok && releases.data.value) {
          removeArrayElByKey(releases.data.value, 'id', id)
        }

        if (response.ok) {
          await removeDeployments(id)
        }
      },
    })
  }

  function add(version: Release['version'], firmware: File) {
    const formData = new FormData()

    formData.append('data', JSON.stringify({
      version,
      projectId,
    }))

    formData.append('file', firmware)

    return $auth.fetch('/api/releases', {
      method: 'POST',
      body: formData,

      onResponse: ({ response }) => {
        if (response.ok && releases.data.value) {
          releases.data.value.unshift(response._data)
        }
      },
    })
  }

  async function findDeployments(id: Release['id']) {
    const key = `deployments-release-${id}`

    const deployments = useNuxtData<Deployment[]>(key)

    deployments.data.value ||= await $auth.fetch<Deployment[]>(`/api/releases/${id}/deployments`)

    return deployments.data
  }

  async function removeDeployments(id: Release['id']) {
    const devices = await useDevice().find()

    for (const device of devices.value ?? []) {
      const { deployments } = useDeployment(device.id)
      if (deployments.data.value) {
        removeArrayElByKey(deployments.data.value, 'releaseId', id)
      }
    }
  }

  async function removeAll() {
    const releases = await find()

    // Clear related deployments state
    releases.value?.forEach(release => removeDeployments(release.id))

    clearNuxtData(key)
  }

  return { find, remove, add, findDeployments, removeAll }
}
