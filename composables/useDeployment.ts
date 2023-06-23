export default function useDeployment(deviceId: Device["id"]) {
  const key = `deployments-${deviceId}`;

  const { data: deployments } = useNuxtData<Deployment[]>(key);

  if (deployments.value === null) {
    clearNuxtData(key);
  }

  function find() {
    const request = `/api/deployments`;

    return useAsyncData(
      key,
      () =>
        useAuthFetch<Deployment[]>(request, {
          query: {
            deviceId,
          },
        }),
      {
        default: () => deployments.value,
        immediate: deployments.value ? false : true,
      }
    );
  }

  function update(id: Deployment["id"], data: Partial<Deployment>) {
    const key = `deployment-${id}`;
    const request = `/api/deployments/${id}`;

    return useAsyncData(key, () =>
      useAuthFetch<Deployment>(request, {
        method: "PATCH",
        body: data,
      })
    );
  }

  return { find, update };
}
