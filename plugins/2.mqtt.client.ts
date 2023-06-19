import Paho from "paho-mqtt";

export default defineNuxtPlugin(async () => {
  let mqttClient: Paho.Client | undefined;

  const { useUser } = useAuthSession();
  const user = useUser();
  const { find, connect } = useMqtt();
  const { data: mqtt } = await find();

  watchEffect(() => {
    if (user.value && mqtt.value) {
      connect({
        uri: mqtt.value.uriWS,
        password: mqtt.value.password,
        username: mqtt.value.username,
      }).catch(() => console.log("MQTT unable to connect"));
    }
  });

  return {
    provide: {
      mqttClient,
    },
  };
});
