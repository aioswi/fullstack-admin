export type Dict<T = any> = Record<string, T>

export function isEmptyArray(value: any) {
  return Array.isArray(value) && value.length === 0
}

export function isObject(value: any): value is Dict {
  const type = typeof value

  return value != null && (type === 'object' || type === 'function') && !Array.isArray(value)
}

export function isEmptyObject(value: any) {
  return isObject(value) && Object.keys(value).length === 0
}

export function isEmpty(value: any): boolean {
  if (Array.isArray(value))
    return isEmptyArray(value)
  if (isObject(value))
    return isEmptyObject(value)
  if (value == null || value === '')
    return true
  return false
}
