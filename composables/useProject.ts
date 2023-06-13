import type { Project } from "@prisma/client";
import type { H3Error } from "h3";

export default function useDevice() {
  const { data: projects } = useNuxtData<Project[]>("projects");

  if (projects.value === null) {
    clearNuxtData("projects");
  }

  function find() {
    return useAsyncData("projects", () => useAuthFetch("/api/projects"), {
      default: () => projects.value,
      immediate: projects.value ? false : true,
    });
  }

  function findOne(id: Project["id"]) {
    const key = `project-${id}`;

    const { data: project } = useNuxtData(key);

    if (project.value === null) {
      clearNuxtData(key);
    }

    return useAsyncData<Project>(key, () => useAuthFetch(`/api/projects/${id}`), {
      default: () => project.value,
      immediate: project.value ? false : true,
    });
  }

  function remove(id: Project["id"]) {
    return useAsyncData<Project>(() =>
      useAuthFetch(`/api/projects/${id}`, {
        method: "DELETE",

        onResponse: ({ response }) => {
          if (response.ok) {
            const deviceIndex = projects.value?.findIndex(
              (project) => project.id === id
            );

            if (deviceIndex !== undefined) {
              projects.value?.splice(deviceIndex, 1);
            }
          }
        },
      })
    );
  }

  function add(project: any) {
    return useAsyncData<Project, H3Error>(() =>
      useAuthFetch("/api/projects", {
        method: "POST",
        body: project,

        onResponse: ({ response }) => {
          if (response.ok) {
            projects.value?.unshift(response._data);
          }
        },
      })
    );
  }

  return { find, findOne, remove, add };
}
