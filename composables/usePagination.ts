export default function usePagination<T> (input: Ref<Array<T>>) {
  const pageSize = 5
  const page = ref(1)
  const pageCount = computed(() => Math.ceil(input.value.length / pageSize))

  function paginate (pageSize:number, pageNumber:number, array:Array<any>) {
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize

    return array.slice(startIndex, endIndex)
  }

  const output = computed<Array<T>>(() => {
    return paginate(pageSize, page.value, input.value ?? [])
  })

  return { page, pageCount, output }
}