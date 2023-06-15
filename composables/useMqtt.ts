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

  return { find, add, update };
}
