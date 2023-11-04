export default function useRelease (projectId: Project['id']) {
  const key = `releases-${projectId}`

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

      onResponse: ({ response }) => {
        if (response.ok && releases.data.value) {
          const releaseIndex = releases.data.value.findIndex(
            release => release.id === id
          )
          if (releaseIndex >= 0) {
            releases.data.value.splice(releaseIndex, 1)
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

  function findDeployments (id: Release['id']) {
    const request = `/api/releases/${id}/deployments`

    return useAuthFetch<Deployment[]>(request)
  }

  return { find, remove, add, findDeployments }
}
