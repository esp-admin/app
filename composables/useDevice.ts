export default function useDevice () {
  const key = 'devices'
  const devices = useNuxtData<Device[]>(key)

  async function find () {
    const request = '/api/devices'

    devices.data.value ||= await useAuthFetch(request)

    return devices.data
  }

  async function findOne (id: Device['id']) {
    const key = `device-${id}`
    const request = `/api/devices/${id}`

    const device = useNuxtData<Device>(key)

    device.data.value ||= await useAuthFetch(request)

    return device.data as Ref<Device>
  }

  function remove (id: Device['id']) {
    const request = `/api/devices/${id}`

    return useAuthFetch<Device>(request, {
      method: 'DELETE',

      onResponse: ({ response }) => {
        if (response.ok && devices.data.value) {
          removeArrayElByKey(devices.data.value, 'id', id)
        }

        if (response.ok) {
          useDeployment(id).removeAll()
          useLog(id).remove()
        }
      }
    })
  }

  function add (data: Partial<Device>) {
    const request = '/api/devices'

    return useAuthFetch<Device>(request, {
      method: 'POST',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && devices.data.value) {
          devices.data.value.unshift(response._data)
        }
      }
    })
  }

  function link (deviceId: Device['id'], projectId: Project['id']) {
    const key = `device-${deviceId}`
    const request = `/api/devices/${deviceId}/link`

    const device = useNuxtData<Device>(key)

    return useAuthFetch<Device>(request, {
      method: 'PATCH',
      body: {
        projectId
      },

      onResponse: ({ response }) => {
        if (response.ok && devices.data.value) {
          const deviceIndex = devices.data.value.findIndex(
            device => device.id === deviceId
          )
          if (deviceIndex >= 0) {
            devices.data.value[deviceIndex].projectId = projectId
          }
        }

        if (response.ok && device.data.value) {
          device.data.value.projectId = projectId
        }
      }
    })
  }

  function unlink (id: Device['id']) {
    const key = `device-${id}`
    const request = `/api/devices/${id}/unlink`

    const device = useNuxtData<Device>(key)

    return useAuthFetch<Device>(request, {
      method: 'PATCH',

      onResponse: ({ response }) => {
        if (response.ok && devices.data.value) {
          const deviceIndex = devices.data.value.findIndex(
            device => device.id === id
          )
          if (deviceIndex >= 0) {
            devices.data.value[deviceIndex].projectId = null
          }
        }

        if (response.ok && device.data.value) {
          device.data.value.projectId = null
        }
      }
    })
  }

  async function update (id: Device['id'], data: Partial<Device>) {
    await find()

    const deviceExists = devices.data.value?.find(device => device.id === id)
    if (!deviceExists) {
      return
    }

    const key = `device-${id}`
    const request = `/api/devices/${id}`
    const device = useNuxtData<Device>(key)

    return useAuthFetch<Device>(request, {
      method: 'PATCH',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && devices.data.value) {
          const deviceIndex = devices.data.value.findIndex(
            device => device.id === id
          )
          if (deviceIndex >= 0) {
            devices.data.value[deviceIndex] = response._data
          }
        }

        if (response.ok && device.data.value) {
          device.data.value = response._data
        }
      }
    })
  }

  async function findLinked (projectId: Project['id']) {
    const devices = await find()

    return computed(() =>
      devices.value?.filter(device => device.projectId === projectId) ?? []
    )
  }

  return { find, findOne, remove, add, link, unlink, update, findLinked }
}
