import { connect as _connect } from "mqtt/dist/mqtt.min";
import type { MqttClient } from "mqtt";

export default defineNuxtPlugin({
  enforce: "pre",

  setup: (nuxtApp) => {
    var mqttClient: MqttClient | undefined;

    function connect(options: {
      uri: string;
      username: string;
      password: string;
    }) {
      const { connected } = useMqtt();

      return new Promise((resolve, reject) => {
        disconnect();

        mqttClient = _connect(options.uri, {
          username: options.username,
          password: options.password,
        });

        mqttClient.on("error", (e) => {
          connected.value = false;
          reject(e);
        });

        mqttClient.on("disconnect", () => (connected.value = false));

        mqttClient.on("offline", () => (connected.value = false));

        mqttClient.on("end", () => (connected.value = false));

        mqttClient.on("close", () => (connected.value = false));

        mqttClient.on("connect", () => {
          connected.value = true;
          subscribe();
          resolve("connected");
        });

        mqttClient.on("message", onMessageArrived);
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

    function onMessageArrived(topic: string, payload: Buffer) {
      const splittedTopic = topic.split("/");
      const message = payload.toString();

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

    nuxtApp.hook("auth:loggedIn", async (loggedIn) => {
      const { find } = useMqtt();

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
    });

    return {
      provide: {
        mqtt: {
          connect,
          disconnect,
          publish,
        },
      },
    };
  },
});
