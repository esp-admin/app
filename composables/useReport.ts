import { destr } from 'destr'

export default function useReport() {
  const key = 'report'
  const report = useNuxtData<Report | undefined>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    report.data.value ||= await $auth.fetch<Report>('/api/report')

    return report.data
  }

  function update(data: Partial<Report>) {
    return $auth.fetch('/api/report', {
      method: 'PATCH',
      body: {
        webhookEnable: data.webhookEnable,
        emailEnable: data.emailEnable,
        webhookUrl: data.webhookUrl,
        emailAddress: data.emailAddress
      },

      onResponse: ({ response }) => {
        if (response.ok) {
          report.data.value = response._data
        }
      },
    })
  }

  function add(data: Partial<Report>) {
    return $auth.fetch('/api/report', {
      method: 'POST',
      body: {
        webhookEnable: data.webhookEnable,
        emailEnable: data.emailEnable,
        webhookUrl: data.webhookUrl,
        emailAddress: data.emailAddress
      },

      onResponse: ({ response }) => {
        if (response.ok) {
          report.data.value = response._data
        }
      },
    })
  }

  function handleReport(message: ReportMessage) {
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

  async function handleStatus(message: ReportMessage) {
    const { update, find } = useDevice()

    const { status } = destr<{ status: Device['status'] }>(message.payload)

    const devices = await find()

    if (devices.value) {
      const deviceIndex = devices.value.findIndex(device => device.id === message.deviceId)

      if (deviceIndex >= 0 && devices.value[deviceIndex].status === status) {
        return
      }
    }

    await update(message.deviceId, {
      status,
    })
  }

  async function handleUpdate(message: ReportMessage) {
    const { updateStatus } = useDeployment(message.deviceId)

    const { deploymentId, status } = destr<{
      deploymentId: Deployment['id']
      status: Deployment['status']
    }>(message.payload)

    if (REGEX_ID.test(deploymentId)) {
      await updateStatus(deploymentId, status)
    }
  }

  return { find, add, update, handleReport }
}
