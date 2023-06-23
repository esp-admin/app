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

  function findOne(id: Deployment["id"]) {
    const key = `deployment-${id}`;
    const request = `/api/deployments/${id}`;

    const { data: deployment } = useNuxtData(key);

    if (deployment.value === null) {
      clearNuxtData(key);
    }

    return useAsyncData<Deployment>(key, () => useAuthFetch(request), {
      default: () => deployment.value,
      immediate: deployment.value ? false : true,
    });
  }

  async function update(id: Deployment["id"], data: Partial<Deployment>) {
    if (deployments.value) {
      const deploymentIndex = deployments.value.findIndex(
        (deployment) => deployment.id === id
      );
      if (deploymentIndex !== undefined) {
        deployments.value[deploymentIndex].status = data.status!;
      } else {
        const { data: deployment } = await findOne(id);
        if (deployment.value) {
          deployments.value.unshift(deployment.value);
        }
      }
    }
  }

  return { find, update };
}
