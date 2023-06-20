import type { H3Error } from "h3";

export default function useDevice() {
  const key = `devices`;
  const { data: devices } = useNuxtData<Device[]>(key);

  if (devices.value === null) {
    clearNuxtData(key);
  }

  function find() {
    const request = "/api/devices";

    return useAsyncData(key, () => useAuthFetch<Device[]>(request), {
      default: () => devices.value,
      immediate: devices.value ? false : true,
    });
  }

  function findOne(id: Device["id"]) {
    const key = `device-${id}`;
    const request = `/api/devices/${id}`;

    const { data: device } = useNuxtData(key);

    if (device.value === null) {
      clearNuxtData(key);
    }

    return useAsyncData<Device>(key, () => useAuthFetch(request), {
      default: () => device.value,
      immediate: device.value ? false : true,
    });
  }

  function remove(id: Device["id"]) {
    const request = `/api/devices/${id}`;

    return useAsyncData<Device>(() =>
      useAuthFetch(request, {
        method: "DELETE",

        onResponse: ({ response }) => {
          if (response.ok && devices.value) {
            const deviceIndex = devices.value.findIndex(
              (device) => device.id === id
            );

            if (deviceIndex !== undefined) {
              devices.value.splice(deviceIndex, 1);
            }
          }
        },
      })
    );
  }

  function add(data: Partial<Device>) {
    const request = "/api/devices";

    return useAsyncData<Device, H3Error>(() =>
      useAuthFetch(request, {
        method: "POST",
        body: data,

        onResponse: ({ response }) => {
          if (response.ok) {
            devices.value?.unshift(response._data);
          }
        },
      })
    );
  }

  function link(deviceId: Device["id"], projectId: Project["id"]) {
    const key = `device-${deviceId}`;
    const request = `/api/devices/${deviceId}/link`;

    return useAsyncData<Device, H3Error>(key, () =>
      useAuthFetch(request, {
        method: "PATCH",
        body: {
          projectId,
        },

        onResponse: ({ response }) => {
          if (response.ok && devices.value) {
            const deviceIndex = devices.value.findIndex(
              (device) => device.id === deviceId
            );
            if (deviceIndex !== undefined) {
              devices.value[deviceIndex].projectId = projectId;
            }
          }
        },
      })
    );
  }

  function unlink(id: Device["id"]) {
    const key = `device-${id}`;
    const request = `/api/devices/${id}/unlink`;

    return useAsyncData<Device, H3Error>(key, () =>
      useAuthFetch(request, {
        method: "PATCH",

        onResponse: ({ response }) => {
          if (response.ok && devices.value) {
            const deviceIndex = devices.value.findIndex(
              (device) => device.id === id
            );
            if (deviceIndex !== undefined) {
              devices.value[deviceIndex].projectId = null;
            }
          }
        },
      })
    );
  }

  function update(id: Device["id"], data: Partial<Device>) {
    const key = `device-${id}`;
    const request = `/api/devices/${id}`;

    return useAsyncData<Device, H3Error>(key, () =>
      useAuthFetch(request, {
        method: "PATCH",
        body: data,

        onResponse: ({ response }) => {
          if (response.ok && devices.value) {
            const deviceIndex = devices.value.findIndex(
              (device) => device.id === id
            );
            if (deviceIndex !== undefined) {
              devices.value[deviceIndex] = response._data;
            }
          }
        },
      })
    );
  }

  const logs = useState<LoggingMessage[]>("device_logs", () => []);

  return { find, findOne, remove, add, link, unlink, update, logs };
}
