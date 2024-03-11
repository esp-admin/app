export function truncateString (str: string, maxLength = 100) {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str
}

export function generateRandomString (length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }

  return result
}
