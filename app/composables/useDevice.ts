export default function useDevice() {
  const key = 'devices'
  const devices = useState<Device[]>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    devices.value ||= await $auth.fetch<Device[]>('/api/devices')

    return devices
  }

  async function findOne(id: Device['id']) {
    const key = `device-${id}`

    const device = useState<Device>(key)

    device.value ||= await $auth.fetch<Device>(`/api/devices/${id}`)

    return device as Ref<Device>
  }

  function remove(id: Device['id']) {
    return $auth.fetch(`/api/devices/${id}`, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && devices.value) {
          removeArrayElByKey(devices.value, 'id', id)
        }

        if (response.ok) {
          useDeployment(id).removeAll()
          useLog(id).remove()
        }
      },
    })
  }

  function add(data: Partial<Device>) {
    return $auth.fetch('/api/devices', {
      method: 'POST',
      body: {
        name: data.name,
        apiKey: data.apiKey,
      },

      onResponse: ({ response }) => {
        if (response.ok && devices.value) {
          devices.value.unshift(response._data)
        }
      },
    })
  }

  function link(deviceId: Device['id'], projectId: Project['id']) {
    const key = `device-${deviceId}`

    const device = useState<Device>(key)

    return $auth.fetch(`/api/devices/${deviceId}/link`, {
      method: 'PATCH',
      body: {
        projectId,
      },

      onResponse: ({ response }) => {
        if (response.ok && devices.value) {
          const deviceIndex = devices.value.findIndex(
            device => device.id === deviceId,
          )
          if (deviceIndex >= 0) {
            devices.value[deviceIndex]!.projectId = projectId
          }
        }

        if (response.ok && device.value) {
          device.value.projectId = projectId
        }
      },
    })
  }

  function unlink(id: Device['id']) {
    const key = `device-${id}`

    const device = useState<Device>(key)

    return $auth.fetch(`/api/devices/${id}/unlink`, {
      method: 'PATCH',

      onResponse: ({ response }) => {
        if (response.ok && devices.value) {
          const deviceIndex = devices.value.findIndex(
            device => device.id === id,
          )
          if (deviceIndex >= 0) {
            devices.value[deviceIndex]!.projectId = null
          }
        }

        if (response.ok && device.value) {
          device.value.projectId = null
        }
      },
    })
  }

  function update(id: Device['id'], data: Partial<Device>) {
    const key = `device-${id}`
    const device = useState<Device>(key)

    return $auth.fetch(`/api/devices/${id}`, {
      method: 'PATCH',
      body: {
        name: data.name,
        apiKey: data.apiKey,
        description: data.description || null,
        status: data.status,
        variables: data.variables,
      },

      onResponse: ({ response }) => {
        if (response.ok && devices.value) {
          const deviceIndex = devices.value.findIndex(
            device => device.id === id,
          )
          if (deviceIndex >= 0) {
            devices.value[deviceIndex] = response._data
          }
        }

        if (response.ok && device.value) {
          device.value = response._data
        }
      },
    })
  }

  async function findLinked(projectId: Project['id']) {
    const devices = await find()

    return computed(() =>
      devices.value?.filter(device => device.projectId === projectId) ?? [],
    )
  }

  return { find, findOne, remove, add, link, unlink, update, findLinked }
}
