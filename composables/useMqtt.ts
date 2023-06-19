import Paho from "paho-mqtt";

const CLIENT_ID = "admin";

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
    let { $mqttClient } = useNuxtApp();

    return new Promise((resolve, reject) => {
      if ($mqttClient?.isConnected) {
        $mqttClient.disconnect();
      }

      const { port, hostname } = new URL(mqtt.uri);

      $mqttClient = new Paho.Client(hostname, parseInt(port), CLIENT_ID);

      $mqttClient.onConnectionLost = () => (connected.value = false);

      $mqttClient.connect({
        userName: mqtt.username,
        password: mqtt.password,
        onSuccess: () => {
          connected.value = true;
          resolve("connected");
        },
        onFailure: (e) => {
          connected.value = false;
          reject(e);
        },
      });
    });
  }

  return { find, add, update, connect, connected };
}
