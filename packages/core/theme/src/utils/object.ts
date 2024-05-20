import { flatten } from 'flat'

export function swapColorValues<T extends object>(colors: T) {
  const swappedColors = {}
  const keys = Object.keys(colors)
  const length = keys.length

  for (let i = 0; i < length / 2; i++) {
    const key1 = keys[i]
    const key2 = keys[length - 1 - i]

    // @ts-expect-error @ts-ignore
    swappedColors[key1] = colors[key2]
    // @ts-expect-error @ts-ignore
    swappedColors[key2] = colors[key1]
  }
  if (length % 2 !== 0) {
    const middleKey = keys[Math.floor(length / 2)]

    // @ts-expect-error @ts-ignore
    swappedColors[middleKey] = colors[middleKey]
  }

  return swappedColors
}

export function removeDefaultKeys<T extends object>(obj: T) {
  const newObj = {}

  for (const key in obj) {
    if (key.endsWith('-DEFAULT')) {
      // @ts-expect-error @ts-ignore
      newObj[key.replace('-DEFAULT', '')] = obj[key]
      continue
    }
    // @ts-expect-error @ts-ignore
    newObj[key] = obj[key]
  }

  return newObj
}

export function flattenThemeObject<TTarget>(obj: TTarget) {
  return removeDefaultKeys(
    flatten(obj, {
      safe: true,
      delimiter: '-',
    }) as object,
  )
}

export function mapPropsVariants<T extends Record<string, any>, K extends keyof T>(props: T, variantKeys?: K[], removeVariantProps = true) {
  if (!variantKeys)
    return [props, {}]

  const picked = variantKeys.reduce((acc, key) => {
    if (key in props) {
      return {
        ...acc,
        [key]: props[key],
      }
    }
    else {
      return acc
    }
  }, {})

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter(key => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({
        ...acc,
        [key]: props[key as keyof T],
      }), {})
    return [omitted, picked] as [Omit<T, K>, Pick<T, K>]
  }
  else {
    return [props, picked] as [T, Pick<T, K>]
  }
}
