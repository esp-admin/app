export default function useRelease(projectId: Project['id']) {
  const key = `releases-project-${projectId}`
  const releases = useState<Release[]>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    releases.value ||= await $auth.fetch<Release[]>(`/api/projects/${projectId}/releases`)

    return releases
  }

  function remove(id: Release['id']) {
    return $auth.fetch(`/api/releases/${id}`, {
      method: 'DELETE',

      onResponse: async ({ response }) => {
        if (response.ok && releases.value) {
          removeArrayElByKey(releases.value, 'id', id)
        }

        if (response.ok) {
          await removeDeployments(id)
        }
      },
    })
  }

  function add(version: Release['version'], firmware: File) {
    const formData = new FormData()

    formData.append('version', version)
    formData.append('projectId', projectId)
    formData.append('file', firmware)

    return $auth.fetch('/api/releases', {
      method: 'POST',
      body: formData,

      onResponse: ({ response }) => {
        if (response.ok && releases.value) {
          releases.value.unshift(response._data)
        }
      },
    })
  }

  async function findDeployments(id: Release['id']) {
    const key = `deployments-release-${id}`

    const deployments = useState<Deployment[]>(key)

    deployments.value ||= await $auth.fetch<Deployment[]>(`/api/releases/${id}/deployments`)

    return deployments
  }

  async function removeDeployments(id: Release['id']) {
    const devices = await useDevice().find()

    for (const device of devices.value ?? []) {
      const { deployments } = useDeployment(device.id)
      if (deployments.value) {
        removeArrayElByKey(deployments.value, 'releaseId', id)
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
