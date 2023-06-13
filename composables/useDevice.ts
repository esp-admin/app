import type { Device, Project } from "@prisma/client";
import type { H3Error } from "h3";

export default function useDevice() {
  const { data: devices } = useNuxtData<Device[]>("devices");

  if (devices.value === null) {
    clearNuxtData("devices");
  }

  function find() {
    return useAsyncData(
      "devices",
      () => useAuthFetch<Device[]>("/api/devices"),
      {
        default: () => devices.value,
        immediate: devices.value ? false : true,
      }
    );
  }

  function findOne(id: Device["id"]) {
    const key = `device-${id}`;

    const { data: device } = useNuxtData(key);

    if (device.value === null) {
      clearNuxtData(key);
    }

    return useAsyncData<Device>(key, () => useAuthFetch(`/api/devices/${id}`), {
      default: () => device.value,
      immediate: device.value ? false : true,
    });
  }

  function remove(id: Device["id"]) {
    return useAsyncData<Device>(() =>
      useAuthFetch(`/api/devices/${id}`, {
        method: "DELETE",

        onResponse: ({ response }) => {
          if (response.ok) {
            const deviceIndex = devices.value?.findIndex(
              (device) => device.id === id
            );

            if (deviceIndex !== undefined) {
              devices.value?.splice(deviceIndex, 1);
            }
          }
        },
      })
    );
  }

  function add(device: any) {
    return useAsyncData<Device, H3Error>(() =>
      useAuthFetch("/api/devices", {
        method: "POST",
        body: device,

        onResponse: ({ response }) => {
          if (response.ok) {
            devices.value?.unshift(response._data);
          }
        },
      })
    );
  }

  function link(deviceId: Device["id"], projectId: Project["id"]) {
    return useAsyncData<Device, H3Error>(() =>
      useAuthFetch(`/api/devices/${deviceId}/link`, {
        method: "PATCH",
        body: {
          projectId,
        },

        onResponse: ({ response }) => {
          const { data: devices } = useNuxtData<Device[]>("devices");

          if (response.ok) {
            const deviceIndex = devices.value?.findIndex(
              (device) => device.id === deviceId
            );
            if (deviceIndex !== undefined && devices.value) {
              devices.value[deviceIndex].projectId = projectId;
            }
          }
        },
      })
    );
  }

  function unlink(deviceId: Device["id"]) {
    return useAsyncData<Device, H3Error>(() =>
      useAuthFetch(`/api/devices/${deviceId}/unlink`, {
        method: "PATCH",

        onResponse: ({ response }) => {
          if (response.ok) {
            const deviceIndex = devices.value?.findIndex(
              (device) => device.id === deviceId
            );
            if (deviceIndex !== undefined && devices.value) {
              devices.value[deviceIndex].projectId = null;
            }
          }
        },
      })
    );
  }

  return { find, findOne, remove, add, link, unlink };
}
