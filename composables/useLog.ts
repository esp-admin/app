export default function useLog (deviceId: Device['id']) {
  const logs = useState<LoggingMessage[]>(`logs-${deviceId}`, () => [])

  function append (message: LoggingMessage) {
    logs.value.push(message)
  }

  return { logs, append }
}
