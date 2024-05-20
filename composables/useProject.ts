export default function useProject() {
  const key = 'projects'
  const projects = useNuxtData<Project[]>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    projects.data.value ||= await $auth.fetch<Project[]>('/api/projects')

    return projects.data
  }

  async function findOne(id: Project['id']) {
    const key = `project-${id}`

    const project = useNuxtData<Project>(key)

    project.data.value ||= await $auth.fetch<Project>(`/api/projects/${id}`)

    return project.data as Ref<Project>
  }

  function remove(id: Project['id']) {
    return $auth.fetch(`/api/projects/${id}`, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && projects.data.value) {
          removeArrayElByKey(projects.data.value, 'id', id)
        }

        if (response.ok) {
          // Clear all related releases
          useRelease(id).removeAll()
        }
      },
    })
  }

  function add(data: Partial<Project>) {
    return $auth.fetch('/api/projects', {
      method: 'POST',
      body: {
        name: data.name
      },

      onResponse: ({ response }) => {
        if (response.ok && projects.data.value) {
          projects.data.value.unshift(response._data)
        }
      },
    })
  }

  function update(id: Project['id'], data: Partial<Project>) {
    const key = `project-${id}`
    const project = useNuxtData(key)

    return $auth.fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      body: {
        name: data.name,
        repository: data.repository,
        description: data.description,
        variables: data.variables,
        commands: data.commands,
      },

      onResponse: ({ response }) => {
        if (response.ok && projects.data.value) {
          const projectIndex = projects.data.value.findIndex(
            project => project.id === id,
          )
          if (projectIndex >= 0) {
            projects.data.value[projectIndex] = response._data
          }
        }

        if (response.ok && project.data.value) {
          project.data.value = response._data
        }
      },
    })
  }

  return { find, findOne, remove, add, update }
}
