import { connectAsync } from 'mqtt'
import type { MqttClient } from 'mqtt'

export default defineNuxtPlugin({
  enforce: 'pre',

  setup: (nuxtApp) => {
    let mqttClient: MqttClient | undefined

    async function connect (options: {
      uri: string;
      username: string;
      password: string;
    }) {
      const { connected } = useMqtt()

      await disconnect()

      mqttClient = await connectAsync(options.uri, {
        keepalive: 30,
        reconnectPeriod: 3000,
        username: options.username,
        password: options.password
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

    function disconnect () {
      if (mqttClient && mqttClient.connected) {
        return mqttClient.endAsync()
      }
    }

    function reconnect () {
      if (mqttClient && !mqttClient.connected) {
        mqttClient.reconnect()
      }
    }

    function subscribe () {
      mqttClient?.subscribe([
        'device/+/report/status',
        'device/+/report/update',
        'device/+/report/custom',
        'device/+/logs/+'
      ])
    }

    function onMessageArrived (topic: string, payload: Buffer) {
      const splittedTopic = topic.split('/')
      const message = payload.toString()

      const mqttMessage = {
        deviceId: splittedTopic[1],
        action: splittedTopic[2],
        type: splittedTopic[3],
        payload: message
      } as MqttMessage

      switch (mqttMessage.action) {
        case 'report':
          useReport().handleReport(mqttMessage)
          break
        case 'logs':
          useLog(mqttMessage.deviceId).append(mqttMessage)
          break
      }
    }

    function publish (message: CommandMessage) {
      const topic = `device/${message.deviceId}/${message.action}/${message.type}`

      mqttClient?.publish(topic, message.payload, {
        retain: message.retain,
        qos: 1
      })
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden === false) {
        reconnect()
      }
    })

    nuxtApp.hook('auth:loggedIn', async (loggedIn) => {
      const { find } = useMqtt()

      if (loggedIn) {
        const mqtt = await find()

        if (mqtt.value) {
          connect({
            uri: mqtt.value.uriWS,
            password: mqtt.value.password,
            username: mqtt.value.username
          })
        }
      } else {
        disconnect()
      }
    })

    return {
      provide: {
        mqtt: {
          connect,
          disconnect,
          publish
        }
      }
    }
  }
})