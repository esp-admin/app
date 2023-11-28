export default function useDevice () {
  const key = 'devices'
  const devices = useNuxtData<Device[]>(key)
  const { $auth } = useNuxtApp()

  async function find () {
    devices.data.value ||= await $auth.fetch<Device[]>('/api/devices')

    return devices.data
  }

  async function findOne (id: Device['id']) {
    const key = `device-${id}`

    const device = useNuxtData<Device>(key)

    device.data.value ||= await $auth.fetch<Device>(`/api/devices/${id}`)

    return device.data as Ref<Device>
  }

  function remove (id: Device['id']) {
    return $auth.fetch(`/api/devices/${id}`, {
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
    return $auth.fetch('/api/devices', {
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

    const device = useNuxtData<Device>(key)

    return $auth.fetch(`/api/devices/${deviceId}/link`, {
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

    const device = useNuxtData<Device>(key)

    return $auth.fetch(`/api/devices/${id}/unlink`, {
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
    const device = useNuxtData<Device>(key)

    return $auth.fetch(`/api/devices/${id}`, {
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
