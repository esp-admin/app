import { destr } from 'destr'
import { NP, NText } from '#components'

interface ReportMessagePayloadStatus {
  status: Device['status']
}

interface ReportMessagePayloadUpdateStatus {
  deploymentId: Deployment['id']
  status: Deployment['status']
}

interface ReportMessagePayloadUpdateProgress {
  deploymentId: Deployment['id']
  releaseId: Release['id']
  progress: number
}

export default function useReport() {
  const key = 'report'
  const report = useState<Report | undefined>(key)
  const { $auth } = useNuxtApp()

  async function find() {
    report.value ||= await $auth.fetch<Report>('/api/report')

    return report
  }

  function update(data: Partial<Report>) {
    return $auth.fetch('/api/report', {
      method: 'PATCH',
      body: {
        webhookEnable: data.webhookEnable,
        emailEnable: data.emailEnable,
        webhookUrl: data.webhookUrl || null,
        emailAddress: data.emailAddress || null,
      },

      onResponse: ({ response }) => {
        if (response.ok) {
          report.value = response._data
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
        webhookUrl: data.webhookUrl || null,
        emailAddress: data.emailAddress || null,
      },

      onResponse: ({ response }) => {
        if (response.ok) {
          report.value = response._data
        }
      },
    })
  }

  function handleReport(message: ReportMessage) {
    switch (message.type) {
      case 'status':
        handleStatus(message)
        break
      case 'update_status':
        handleUpdateStatus(message)
        break
      case 'update_progress':
        handleUpdateProgress(message)
        break
      case 'custom':
        handleCustom(message)
        break
    }
  }

  async function handleStatus(message: ReportMessage) {
    const payload = destr<ReportMessagePayloadStatus>(message.payload)

    const devices = await useDevice().find()

    if (devices.value) {
      const deviceIndex = devices.value.findIndex(device => device.id === message.deviceId)

      if (deviceIndex >= 0 && devices.value[deviceIndex].status === payload.status) {
        return
      }
    }

    await useDevice().update(message.deviceId, {
      status: payload.status,
    })
  }

  async function handleUpdateStatus(message: ReportMessage) {
    const payload = destr<ReportMessagePayloadUpdateStatus>(message.payload)

    if (REGEX_ID.test(payload.deploymentId)) {
      await useDeployment(message.deviceId).updateStatus(payload.deploymentId, payload.status)
    }
  }

  function handleUpdateProgress(message: ReportMessage) {
    const payload = destr<ReportMessagePayloadUpdateProgress>(message.payload)
    useDeployment(message.deviceId).updateProgress(payload.deploymentId, payload.progress)
  }

  async function handleCustom(message: ReportMessage) {
    const payload = destr<ReportCustomMessage>(message.payload)

    const device = await useDevice().findOne(message.deviceId)

    useNaiveNotification().create({
      title: device.value.name,
      type: payload.type === 'warn' ? 'warning' : payload.type,
      content: () => h('div', { }, [
        h(NText, { strong: true }, payload.subject),
        h(NP, payload.body),
      ]),
    })
  }

  return { find, add, update, handleReport }
}
