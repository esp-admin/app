export default function useMqtt () {
  const key = 'mqtt'
  const request = '/api/mqtt'

  const mqtt = useState<Mqtt>(key)

  async function find () {
    if (mqtt.value === undefined) {
      mqtt.value = await useAuthFetch<Mqtt>(request)
    }

    return mqtt
  }

  function update (data: Partial<Mqtt>) {
    return useAuthFetch<Mqtt>(request, {
      method: 'PATCH',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.value = response._data
        }
      }
    })
  }

  function add (data: Partial<Mqtt>) {
    return useAuthFetch<Mqtt>(request, {
      method: 'POST',
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.value = response._data
        }
      }
    })
  }

  const connected = useState('mqtt_connected')

  return { find, add, update, connected, mqtt }
}
