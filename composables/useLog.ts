export default function useLog (deviceId: Device['id']) {
  const key = `logs-${deviceId}`
  const logs = useState<LoggingMessage[]>(key, () => [])

  function append (message: LoggingMessage) {
    logs.value.push(message)
  }

  function clear () {
    logs.value = []
  }

  function remove () {
    clearNuxtState(key)
  }

  return { logs, append, clear, remove }
}
