// import { Client } from "paho-mqtt";

// const CLIENT_ID = "admin";

// interface MqttClient {
//   client: Client | undefined;
//   connect: (mqtt: Partial<Mqtt>) => Promise<void>;
// }

// export const mqttClient: MqttClient = {
//   client: undefined,

//   connect: function (mqtt) {
//     return new Promise((resolve, reject) => {
//       if (!mqtt.uriWS || !mqtt.username || !mqtt.password) {
//         return reject("missing-credentials");
//       }

//       if (this.client && this.client?.isConnected()) {
//         this.client.disconnect();
//       }

//       const { port, hostname } = new URL(mqtt.uriWS);

//       this.client = new Client(hostname, parseInt(port), CLIENT_ID);

//       this.client.connect({
//         userName: mqtt.username,
//         password: mqtt.password,
//         onSuccess: () => resolve(),
//         onFailure: (e) => reject(e),
//       });
//     });
//   },
// };
