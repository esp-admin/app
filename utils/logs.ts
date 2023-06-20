export function handleLogs(message: LoggingMessage) {
  const { logs } = useDevice();
  logs.value.push(message);
}
