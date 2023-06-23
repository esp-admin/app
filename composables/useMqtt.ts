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
    mqttClient?.subscribe("device/+/report/status");
    mqttClient?.subscribe("device/+/report/update");
    mqttClient?.subscribe("device/+/logs/+");
  }

  function onMessageArrived(message: Paho.Message) {
    const splittedMessage = message.destinationName.split("/");

    const mqttMessage = {
      deviceId: splittedMessage[1],
      action: splittedMessage[2],
      type: splittedMessage[3],
      payload: message.payloadString,
    } as MqttMessage;

    switch (mqttMessage.action) {
      case "report":
        handleReport(mqttMessage);
        break;
      case "logs":
        handleLogs(mqttMessage);
        break;
    }
  }

  function publish(message: CommandMessage) {
    const topic = `device/${message.deviceId}/${message.action}/${message.type}`;

    const _message = new Paho.Message(message.payload);
    _message.destinationName = topic;
    _message.retained = message.retained;

    mqttClient?.send(_message);
  }

  return { find, add, update, connect, disconnect, publish, connected };
}
