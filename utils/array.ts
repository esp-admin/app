/**
 * Removes element from array having a certain value for a giving key
 */
export function removeArrayElByKey (array: Array<Record<string, any>>, key: string, value: any) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i][key] === value) {
      array.splice(i, 1)
    }
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
