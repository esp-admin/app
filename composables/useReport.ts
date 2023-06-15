export default function useMqtt() {
  const key = "report";
  const request = `/api/report`;

  const { data: report } = useNuxtData<Report>(key);

  if (report.value === null) {
    clearNuxtData(key);
  }

  function find() {
    return useAsyncData(key, () => useAuthFetch<Report>(request), {
      default: () => report.value,
      immediate: report.value ? false : true,
    });
  }

  function update(data: Partial<Report>) {
    return useAsyncData(key, () =>
      useAuthFetch<Report>(request, {
        method: "PATCH",
        body: data,
      })
    );
  }

  function add(data: Partial<Report>) {
    return useAsyncData(key, () =>
      useAuthFetch<Report>(request, {
        method: "POST",
        body: data,
      })
    );
  }

  return { find, add, update };
}
