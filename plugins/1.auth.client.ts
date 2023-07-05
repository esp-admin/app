export default defineNuxtPlugin({
  enforce: "pre",
  hooks: {
    "auth:loggedIn": async (loggedIn) => {
      const { find, connect, disconnect } = useMqtt();

      if (loggedIn) {
        const mqtt = await find();

        if (mqtt.value) {
          connect({
            uri: mqtt.value.uriWS,
            password: mqtt.value.password,
            username: mqtt.value.username,
          });
        }
      } else {
        disconnect();
      }
    },
  },
});
