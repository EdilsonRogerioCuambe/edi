import 'client-only'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getLocalStorage(key: string, defaultValue: any) {
  const stickyValue = localStorage.getItem(key)

  return stickyValue !== null && stickyValue !== 'undefined'
    ? JSON.parse(stickyValue)
    : defaultValue
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}
