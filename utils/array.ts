/**
 * Removes element from array having a certain value for a giving key
 */
export function removeArrayElByKey (array: Array<Record<string, any>>, key: string, value: any) {
  const index = array.findIndex(
    el => el[key] === value
  )

  if (index >= 0) {
    array.splice(index, 1)
  }
}

export function filteredArrayByKey<T> (array:Ref<Array<T> | null>, key: any, search: Ref<string>) {
  return computed(() => {
    if (search.value) {
      // @ts-ignore
      return array.value?.filter(el => el[key].includes(search.value)) ?? []
    }
    return array.value ?? []
  })
}
