import Paho from "paho-mqtt";

const CLIENT_ID = "admin";
var mqttClient: Paho.Client | undefined;

export default function useMqtt() {
  const key = "mqtt";
  const request = `/api/mqtt`;

  const { data: mqtt } = useNuxtData<Mqtt>(key);

  if (mqtt.value === null) {
    clearNuxtData(key);
  }

  function find() {
    return useAsyncData(key, () => useAuthFetch<Mqtt>(request), {
      default: () => mqtt.value,
      immediate: mqtt.value ? false : true,
    });
  }

  function update(data: Partial<Mqtt>) {
    return useAsyncData(key, () =>
      useAuthFetch<Mqtt>(request, {
        method: "PATCH",
        body: data,
      })
    );
  }

  function add(data: Partial<Mqtt>) {
    return useAsyncData(key, () =>
      useAuthFetch<Mqtt>(request, {
        method: "POST",
        body: data,
      })
    );
  }

  const connected = useState("mqtt_connected");

  function connect(mqtt: { uri: string; username: string; password: string }) {
    return new Promise((resolve, reject) => {
      disconnect();

      const { port, hostname } = new URL(mqtt.uri);

      mqttClient = new Paho.Client(hostname, parseInt(port), CLIENT_ID);

      mqttClient.onConnectionLost = () => (connected.value = false);

      mqttClient.onMessageArrived = onMessageArrived;

      mqttClient.connect({
        userName: mqtt.username,
        password: mqtt.password,
        onSuccess: () => {
          connected.value = true;
          subscribe();
          resolve("connected");
        },
        onFailure: (e) => {
          connected.value = false;
          reject(e);
        },
      });
    });
  }

  function disconnect() {
    if (mqttClient?.isConnected) {
      mqttClient.disconnect();
    }
  }

  function subscribe() {
    if (mqttClient?.isConnected) {
      mqttClient?.subscribe("device/+/report/status");
    }
  }

  function onMessageArrived(message: Paho.Message) {
    const splittedMessage = message.destinationName.split("/");

    const mqttMessage = {
      deviceId: splittedMessage[1],
      action: splittedMessage[2],
      type: splittedMessage[3],
      payload: JSON.parse(message.payloadString),
    } as MqttMessage;

    switch (mqttMessage.action) {
      case "report":
        handleReport(mqttMessage);
        break;
      case "command":
        handleCommand(mqttMessage);
        break;
      case "logs":
        handleLogs(mqttMessage);
        break;
    }
  }

  function handleReport(message: ReportMessage) {}

  function handleCommand(message: CommandMessage) {}

  function handleLogs(message: LoggingMessage) {}

  return { find, add, update, connect, disconnect, connected };
}
