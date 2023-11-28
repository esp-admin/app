export function truncateString (str: string, maxLength = 100) {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}
