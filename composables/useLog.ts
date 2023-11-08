export default function useLog (deviceId: Device['id']) {
  const key = `logs-device-${deviceId}`
  const logs = useState<LoggingMessage[]>(key, () => [])

  function find () {
    return logs
  }

  function remove () {
    clearNuxtState(key)
  }

  function append (message:LoggingMessage) {
    logs.value.push(message)
  }

  function clean () {
    logs.value = []
  }

  return { find, remove, append, clean }
}
