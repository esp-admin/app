export default function useMqtt() {
  const key = 'mqtt'
  const mqtt = useNuxtData<Mqtt | undefined>(key)
  const connected = useState('mqtt_connected')
  const { $auth } = useNuxtApp()

  async function find() {
    mqtt.data.value ||= await $auth.fetch<Mqtt>('/api/mqtt')

    return mqtt.data
  }

  function update(data: Partial<Mqtt>) {
    return $auth.fetch('/api/mqtt', {
      method: 'PATCH',
      body: {
        uriTCP: data.uriTCP,
        uriWS: data.uriWS,
        username: data.username,
        password: data.password,
      },

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.data.value = response._data
        }
      },
    })
  }

  function add(data: Partial<Mqtt>) {
    return $auth.fetch('/api/mqtt', {
      method: 'POST',
      body: {
        uriTCP: data.uriTCP,
        uriWS: data.uriWS,
        username: data.username,
        password: data.password,
      },

      onResponse: ({ response }) => {
        if (response.ok) {
          mqtt.data.value = response._data
        }
      },
    })
  }

  return { find, add, update, connected }
}
