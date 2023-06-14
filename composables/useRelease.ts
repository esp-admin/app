import type { H3Error } from "h3";

export default function useRelease(projectId: Project["id"]) {
  const key = `releases-${projectId}`;

  const { data: releases } = useNuxtData<Release[]>(key);

  if (releases.value === null) {
    clearNuxtData(key);
  }

  function find() {
    const request = `/api/releases`;

    return useAsyncData(
      key,
      () =>
        useAuthFetch<Release[]>(request, {
          query: {
            projectId,
          },
        }),
      {
        default: () => releases.value,
        immediate: releases.value ? false : true,
      }
    );
  }

  function remove(id: Release["id"]) {
    const key = `release-${id}`;
    const request = `/api/releases/${id}`;

    return useAsyncData<Release>(key, () =>
      useAuthFetch(request, {
        method: "DELETE",

        onResponse: ({ response }) => {
          if (response.ok && releases.value) {
            const releaseIndex = releases.value.findIndex(
              (release) => release.id === id
            );
            if (releaseIndex !== undefined) {
              releases.value.splice(releaseIndex, 1);
            }
          }
        },
      })
    );
  }

  function add(data: Partial<Release>) {
    const request = "/api/releases";
    data.projectId = projectId;

    return useAsyncData<Release, H3Error>(() =>
      useAuthFetch(request, {
        method: "POST",
        body: data,

        onResponse: ({ response }) => {
          if (response.ok) {
            releases.value?.unshift(response._data);
          }
        },
      })
    );
  }

  return { find, remove, add };
}
