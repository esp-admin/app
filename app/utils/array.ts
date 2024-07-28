/**
 * Removes elements from array having a certain value for a giving key
 */
export function removeArrayElByKey<T>(array: Array<T>, key: keyof T, value: unknown) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i]![key] === value) {
      array.splice(i, 1)
    }
  }
}

export function filteredArrayByKey<T>(array: Ref<Array<T> | null>, key: keyof T, search: Ref<string>) {
  return computed(() => {
    if (!array.value?.length) {
      return []
    }

    if (search.value) {
      return array.value.filter((el) => {
        const value = el[key]
        return typeof value === 'string' && value.startsWith(search.value)
      })
    }

    return array.value
  })
}
