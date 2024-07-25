export default function useProject() {
  const key = 'projects'
  const projects = useState<Project[]>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    projects.value ||= await $auth.fetch<Project[]>('/api/projects')

    return projects
  }

  async function findOne(id: Project['id']) {
    const key = `project-${id}`

    const project = useState<Project>(key)

    project.value ||= await $auth.fetch<Project>(`/api/projects/${id}`)

    return project as Ref<Project>
  }

  function remove(id: Project['id']) {
    return $auth.fetch(`/api/projects/${id}`, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && projects.value) {
          removeArrayElByKey(projects.value, 'id', id)
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
        name: data.name,
      },

      onResponse: ({ response }) => {
        if (response.ok && projects.value) {
          projects.value.unshift(response._data)
        }
      },
    })
  }

  function update(id: Project['id'], data: Partial<Project>) {
    const key = `project-${id}`
    const project = useState(key)

    return $auth.fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      body: {
        name: data.name,
        repository: data.repository || null,
        description: data.description || null,
        variables: data.variables,
        commands: data.commands,
        apiKey: data.apiKey,
      },

      onResponse: ({ response }) => {
        if (response.ok && projects.value) {
          const projectIndex = projects.value.findIndex(
            project => project.id === id,
          )
          if (projectIndex >= 0) {
            projects.value[projectIndex] = response._data
          }
        }

        if (response.ok && project.value) {
          project.value = response._data
        }
      },
    })
  }

  return { find, findOne, remove, add, update }
}
