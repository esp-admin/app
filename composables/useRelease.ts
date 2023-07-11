export default function useRelease(projectId: Project["id"]) {
  const key = `releases-${projectId}`;

  const releases = useState<Release[]>(key);

  async function find() {
    const request = `/api/releases`;

    if (releases.value === undefined) {
      releases.value = await useAuthFetch<Release[]>(request, {
        query: { projectId },
      });
    }

    return releases;
  }

  function remove(id: Release["id"]) {
    const request = `/api/releases/${id}`;

    return useAuthFetch<Release>(request, {
      method: "DELETE",

      onResponse: ({ response }) => {
        if (response.ok && releases.value) {
          const releaseIndex = releases.value.findIndex(
            (release) => release.id === id
          );
          if (releaseIndex >= 0) {
            releases.value.splice(releaseIndex, 1);
          }
        }
      },
    });
  }

  function add(data: Partial<Release>) {
    const request = "/api/releases";
    data.projectId = projectId;

    return useAuthFetch<Release>(request, {
      method: "POST",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && releases.value) {
          releases.value.unshift(response._data);
        }
      },
    });
  }

  return { find, remove, add };
}
