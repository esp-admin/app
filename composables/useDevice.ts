export default function useDevice() {
  const key = `devices`;
  const devices = useState<Device[]>(key);

  async function find() {
    const request = "/api/devices";

    if (devices.value === undefined) {
      devices.value = await useAuthFetch(request);
    }

    return devices;
  }

  async function findOne(id: Device["id"]) {
    const key = `device-${id}`;
    const request = `/api/devices/${id}`;

    const device = useState<Device>(key);

    if (device.value === undefined) {
      device.value = await useAuthFetch(request);
    }

    return device;
  }

  function remove(id: Device["id"]) {
    const request = `/api/devices/${id}`;

    return useAuthFetch<Device>(request, {
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
    });
  }

  function add(data: Partial<Device>) {
    const request = "/api/devices";

    return useAuthFetch<Device>(request, {
      method: "POST",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && devices.value) {
          devices.value.unshift(response._data);
        }
      },
    });
  }

  function link(deviceId: Device["id"], projectId: Project["id"]) {
    const key = `device-${deviceId}`;
    const request = `/api/devices/${deviceId}/link`;

    const device = useState<Device>(key);

    return useAuthFetch<Device>(request, {
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

        if (response.ok && device.value) {
          device.value.projectId = projectId;
        }
      },
    });
  }

  function unlink(id: Device["id"]) {
    const key = `device-${id}`;
    const request = `/api/devices/${id}/unlink`;

    const device = useState<Device>(key);

    return useAuthFetch<Device>(request, {
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

        if (response.ok && device.value) {
          device.value.projectId = null;
        }
      },
    });
  }

  function update(id: Device["id"], data: Partial<Device>) {
    const key = `device-${id}`;
    const request = `/api/devices/${id}`;

    const device = useState<Device>(key);

    return useAuthFetch<Device>(request, {
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

        if (response.ok && device.value) {
          device.value = response._data;
        }
      },
    });
  }

  const logs = useState<LoggingMessage[]>("device_logs", () => []);

  function handleLogs(message: LoggingMessage) {
    logs.value.push(message);
  }

  return { find, findOne, remove, add, link, unlink, update, logs, handleLogs };
}
