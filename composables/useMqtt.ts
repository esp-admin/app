import MQTT from "mqtt/dist/mqtt";

var mqttClient: MQTT.Client | undefined;

export default function useMqtt() {
  const key = "mqtt";
  const request = `/api/mqtt`;

  const mqtt = useState<Mqtt>(key);

  async function find() {
    if (mqtt.value === undefined) {
      mqtt.value = await useAuthFetch<Mqtt>(request);
    }

    return mqtt;
  }

  function update(data: Partial<Mqtt>) {
    return useAuthFetch<Mqtt>(request, {
      method: "PATCH",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.value = response._data;
        }
      },
    });
  }

  function add(data: Partial<Mqtt>) {
    return useAuthFetch<Mqtt>(request, {
      method: "POST",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.value = response._data;
        }
      },
    });
  }

  const connected = useState("mqtt_connected");

  function connect(mqtt: { uri: string; username: string; password: string }) {
    return new Promise((resolve, reject) => {
      disconnect();

      mqttClient = MQTT.connect(mqtt.uri, {
        username: mqtt.username,
        password: mqtt.password,
      });

      mqttClient?.on("error", (e) => {
        connected.value = false;
        reject(e);
      });

      mqttClient?.on("disconnect", () => (connected.value = false));

      mqttClient?.on("connect", () => {
        connected.value = true;
        subscribe();
        resolve("connected");
      });

      mqttClient?.on("message", onMessageArrived);
    });
  }

  function disconnect() {
    if (mqttClient?.connected) {
      mqttClient.end();
    }
  }

  function subscribe() {
    mqttClient?.subscribe([
      "device/+/report/status",
      "device/+/report/update",
      "device/+/report/custom",
      "device/+/logs/+",
    ]);
  }

  function onMessageArrived(topic: string, message: string) {
    const splittedTopic = topic.split("/");

    const mqttMessage = {
      deviceId: splittedTopic[1],
      action: splittedTopic[2],
      type: splittedTopic[3],
      payload: message,
    } as MqttMessage;

    switch (mqttMessage.action) {
      case "report":
        useReport().handleReport(mqttMessage);
        break;
      case "logs":
        useDevice().handleLogs(mqttMessage);
        break;
    }
  }

  function publish(message: CommandMessage) {
    const topic = `device/${message.deviceId}/${message.action}/${message.type}`;

    mqttClient?.publish(topic, message.payload, {
      retain: message.retained,
      qos: 1,
    });
  }

  return { find, add, update, connect, disconnect, publish, connected };
}
