import type { H3Error } from "h3";

export default function useDevice() {
  const key = `projects`;

  const { data: projects } = useNuxtData<Project[]>(key);

  if (projects.value === null) {
    clearNuxtData(key);
  }

  function find() {
    const request = `/api/projects`;

    return useAsyncData(key, () => useAuthFetch(request), {
      default: () => projects.value,
      immediate: projects.value ? false : true,
    });
  }

  function findOne(id: Project["id"]) {
    const key = `project-${id}`;
    const request = `/api/projects/${id}`;

    const { data: project } = useNuxtData(key);

    if (project.value === null) {
      clearNuxtData(key);
    }

    return useAsyncData<Project>(key, () => useAuthFetch(request), {
      default: () => project.value,
      immediate: project.value ? false : true,
    });
  }

  function remove(id: Project["id"]) {
    const key = `project-${id}`;
    const request = `/api/projects/${id}`;

    return useAsyncData<Project>(key, () =>
      useAuthFetch(request, {
        method: "DELETE",

        onResponse: ({ response }) => {
          if (response.ok && projects.value) {
            const projectIndex = projects.value.findIndex(
              (project) => project.id === id
            );
            if (projectIndex !== undefined) {
              projects.value.splice(projectIndex, 1);
            }
          }
        },
      })
    );
  }

  function add(data: Partial<Project>) {
    const request = `/api/projects`;

    return useAsyncData<Project, H3Error>(() =>
      useAuthFetch(request, {
        method: "POST",
        body: data,

        onResponse: ({ response }) => {
          if (response.ok && projects.value) {
            projects.value.push(response._data);
          }
        },
      })
    );
  }

  function update(id: Project["id"], data: Partial<Project>) {
    const key = `project-${id}`;
    const request = `/api/projects/${id}`;

    return useAsyncData<Project, H3Error>(key, () =>
      useAuthFetch(request, {
        method: "PATCH",
        body: data,

        onResponse: ({ response }) => {
          if (response.ok && projects.value) {
            const projectIndex = projects.value.findIndex(
              (project) => project.id === id
            );
            if (projectIndex !== undefined) {
              projects.value[projectIndex] = response._data;
            }
          }
        },
      })
    );
  }

  function addRelease(id: Project["id"], data: Partial<Release>) {
    const key = `project-${id}`;
    const request = `/api/projects/${id}/releases`;

    return useAsyncData<Project, H3Error>(key, () =>
      useAuthFetch(request, {
        method: "POST",
        body: data,

        onResponse: ({ response }) => {
          if (response.ok && projects.value) {
            const projectIndex = projects.value.findIndex(
              (project) => project.id === id
            );
            if (projectIndex !== undefined) {
              projects.value[projectIndex] = response._data;
            }
          }
        },
      })
    );
  }
  return { find, findOne, remove, add, update, addRelease };
}
