export default function useReport() {
  const key = "report";
  const request = `/api/report`;

  const report = useState<Report>(key);

  async function find() {
    if (report.value === undefined) {
      report.value = await useAuthFetch<Report>(request);
    }

    return report;
  }

  function update(data: Partial<Report>) {
    return useAuthFetch<Report>(request, {
      method: "PATCH",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          report.value = response._data;
        }
      },
    });
  }

  function add(data: Partial<Report>) {
    return useAuthFetch<Report>(request, {
      method: "POST",
      body: data,

      onResponse: ({ response }) => {
        if (response.ok) {
          report.value = response._data;
        }
      },
    });
  }

  return { find, add, update };
}
