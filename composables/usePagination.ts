export default function usePagination<T> (input: Ref<Array<T>>) {
  const pageSize = 5
  const page = ref(1)
  const pageCount = computed(() => input.value?.length && Math.ceil(input.value.length / pageSize))

  watch(pageCount, (value) => {
    if (page.value > value) {
      page.value = value
    } else if (value === 1) {
      page.value = 1
    }
  })

  function paginate (pageSize:number, pageNumber:number, array:Array<any>) {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize

    return array.slice(startIndex, endIndex)
  }

  const output = computed<Array<T>>(() => paginate(pageSize, page.value, input.value ?? []))

  return { page, pageCount, output }
}
