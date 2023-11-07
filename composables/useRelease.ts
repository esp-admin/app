export default function useRelease (projectId: Project['id']) {
  const key = `releases-project-${projectId}`
  const releases = useNuxtData<Release[]>(key)
  const loadingBar = useLoadingBar()

  async function find () {
    const request = '/api/releases'

    if (!releases.data.value) {
      loadingBar.start()

      releases.data.value = await useAuthFetch<Release[]>(request, {
        query: { projectId }
      })

      loadingBar.finish()
    }

    return releases.data
  }

  function remove (id: Release['id']) {
    const request = `/api/releases/${id}`

    return useAuthFetch<Release>(request, {
      method: 'DELETE',

      onResponse: async ({ response }) => {
        if (response.ok && releases.data.value) {
          const releaseIndex = releases.data.value.findIndex(
            release => release.id === id
          )
          if (releaseIndex >= 0) {
            releases.data.value.splice(releaseIndex, 1)
          }
        }

        if (response.ok) {
          const { find } = useDevice()
          const devices = await find()

          if (devices.value) {
            for (const device of devices.value) {
              const { removeByRelease } = useDeployment(device.id)
              removeByRelease(id)
            }
          }
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

    loadingBar.start()

    const deployments = await useAuthFetch<Deployment[]>(request)

    loadingBar.finish()

    return deployments
  }

  return { find, remove, add, findDeployments }
}
