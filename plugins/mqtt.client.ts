import type { MqttClient } from 'mqtt'

export default defineNuxtPlugin({
  enforce: 'pre',

  setup: (nuxtApp) => {
    let mqttClient: MqttClient | undefined

    /**
     * Connects to MQTT broker, sets `connected` state and registers event handlers
    */
    async function connect(options: {
      uri: string
      username: string
      password: string
    }) {
      const { default: MQTT } = await import('mqtt')

      const { connected } = useMqtt()

      await mqttClient?.endAsync()

      mqttClient = await MQTT.connectAsync(options.uri, {
        keepalive: 90, // This insures that websocket connection is kept on background with power saver on
        reconnectPeriod: 1000,
        username: options.username,
        password: options.password,
      })

      connected.value = true

      subscribe()

      mqttClient.on('disconnect', () => (connected.value = false))

      mqttClient.on('offline', () => (connected.value = false))

      mqttClient.on('end', () => (connected.value = false))

      mqttClient.on('close', () => (connected.value = false))

      mqttClient.on('connect', () => (connected.value = true))

      mqttClient.on('message', onMessageArrived)
    }

    /**
     * Subscribe to all used topics
     */
    function subscribe() {
      mqttClient?.subscribe([
        'device/+/report/status',
        'device/+/report/update',
        'device/+/report/custom',
        'device/+/logs/+',
      ])
    }

    async function onMessageArrived(topic: string, payload: Buffer) {
      const splittedTopic = topic.split('/')
      const message = payload.toString()

      const mqttMessage = {
        deviceId: splittedTopic[1],
        action: splittedTopic[2],
        type: splittedTopic[3],
        payload: message,
      } as MqttMessage

      const devices = await useDevice().find()

      if (devices.value) {
        const deviceIndex = devices.value.findIndex(device => device.id === mqttMessage.deviceId)
        if (deviceIndex >= 0) {
          switch (mqttMessage.action) {
            case 'report':
              useReport().handleReport(mqttMessage)
              break
            case 'logs':
              useLog(mqttMessage.deviceId).append(mqttMessage)
              break
          }
        }
      }
    }

    function publish(message: CommandMessage) {
      const topic = `device/${message.deviceId}/${message.action}/${message.type}`

      mqttClient?.publish(topic, message.payload, {
        retain: message.retain,
        qos: 1,
      })
    }

    nuxtApp.hook('auth:loggedIn', async (loggedIn) => {
      if (loggedIn) {
        const mqtt = await useMqtt().find()

        if (mqtt.value) {
          // Do not wait for connection, UX optimization
          connect({
            uri: mqtt.value.uriWS,
            password: mqtt.value.password,
            username: mqtt.value.username,
          })
        }
      }
      else {
        // Do not wait for disconnection, UX optimization
        mqttClient?.endAsync()
      }
    })

    return {
      provide: {
        mqtt: {
          connect,
          publish,
        },
      },
    }
  },
})
