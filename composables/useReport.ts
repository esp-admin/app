import { destr } from 'destr'

export default function useReport () {
  const key = 'report'
  const request = '/api/report'

  const report = useNuxtData<Report | undefined>(key)

  async function find () {
    if (!report.data.value) {
      report.data.value = await useAuthFetch<Report>(request)
    }

    return report.data
  }

  function update (data: Partial<Report>) {
    return useAuthFetch<Report>(request, {
      method: 'PATCH',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          report.data.value = response._data
        }
      }
    })
  }

  function add (data: Partial<Report>) {
    return useAuthFetch<Report>(request, {
      method: 'POST',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          report.data.value = response._data
        }
      }
    })
  }

  function handleReport (message: ReportMessage) {
    switch (message.type) {
      case 'status':
        handleStatus(message)
        break
      case 'update':
        handleUpdate(message)
        break
      case 'custom':
        break
    }
  }

  async function handleStatus (message: ReportMessage) {
    const { update } = useDevice()

    const device = destr<Device>(message.payload)

    await update(message.deviceId, {
      status: device.status
    })
  }

  async function handleUpdate (message: ReportMessage) {
    const { update } = useDeployment(message.deviceId)

    const { deploymentId, status } = destr<{
      deploymentId: Deployment['id'];
      status: Deployment['status'];
    }>(message.payload)

    await update(deploymentId, status)
  }

  return { find, add, update, handleReport }
}
