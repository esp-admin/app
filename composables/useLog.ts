export default function useLog (deviceId: Device['id']) {
  const key = `logs-device-${deviceId}`

  const logs = useState<LoggingMessage[]>(key, () => [])

  function remove () {
    clearNuxtState(key)
  }

  return { logs, remove }
}
