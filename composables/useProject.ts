export default function useProject () {
  const key = 'projects'
  const projects = useNuxtData<Project[]>(key)

  async function find () {
    const request = '/api/projects'

    if (!projects.data.value) {
      projects.data.value = await useAuthFetch(request)
    }

    return projects.data
  }

  async function findOne (id: Project['id']) {
    const key = `project-${id}`
    const request = `/api/projects/${id}`

    const project = useNuxtData<Project>(key)

    if (!project.data.value) {
      project.data.value = await useAuthFetch(request)
    }

    return project.data
  }

  function remove (id: Project['id']) {
    const request = `/api/projects/${id}`

    return useAuthFetch<Project>(request, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && projects.data.value) {
          const projectIndex = projects.data.value.findIndex(
            project => project.id === id
          )
          if (projectIndex >= 0) {
            projects.data.value.splice(projectIndex, 1)
          }
        }
      }
    })
  }

  function add (data: Partial<Project>) {
    const request = '/api/projects'

    return useAuthFetch<Project>(request, {
      method: 'POST',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && projects.data.value) {
          projects.data.value.unshift(response._data)
        }
      }
    })
  }

  function update (id: Project['id'], data: Partial<Project>) {
    const key = `project-${id}`
    const request = `/api/projects/${id}`
    const project = useState(key)

    return useAuthFetch<Project>(request, {
      method: 'PATCH',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && projects.data.value) {
          const projectIndex = projects.data.value.findIndex(
            project => project.id === id
          )
          if (projectIndex >= 0) {
            projects.data.value[projectIndex] = response._data
          }
        }

        if (response.ok && project.value) {
          project.value = response._data
        }
      }
    })
  }

  return { find, findOne, remove, add, update }
}
