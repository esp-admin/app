import type { H3Error } from "h3";

export default function useProject() {
  const key = `projects`;
  const projects = useState<Project[]>(key);

  async function find() {
    const request = `/api/projects`;

    if (projects.value === undefined) {
      projects.value = await useAuthFetch(request);
    }

    return projects;
  }

  async function findOne(id: Project["id"]) {
    const key = `project-${id}`;
    const request = `/api/projects/${id}`;

    const project = useState<Project>(key);

    if (project.value === undefined) {
      project.value = await useAuthFetch(request);
    }

    return project;
  }

  function remove(id: Project["id"]) {
    const request = `/api/projects/${id}`;

    return useAuthFetch<Project>(request, {
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
    });
  }

  function add(data: Partial<Project>) {
    const request = `/api/projects`;

    return useAuthFetch<Project>(request, {
      method: "POST",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok && projects.value) {
          projects.value.push(response._data);
        }
      },
    });
  }

  function update(id: Project["id"], data: Partial<Project>) {
    const key = `project-${id}`;
    const request = `/api/projects/${id}`;
    const project = useState(key);

    return useAuthFetch<Project>(request, {
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

        if (response.ok && project.value) {
          project.value = response._data;
        }
      },
    });
  }

  return { find, findOne, remove, add, update };
}
