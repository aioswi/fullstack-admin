function testUserAgent(re: RegExp) {
  if (typeof window === 'undefined' || window.navigator == null)
    return false

  return (
    // @ts-expect-error ts-ignore
    // eslint-disable-next-line dot-notation
    window.navigator['userAgentData']?.brands.some((brand: { brand: string, version: string }) => re.test(brand.brand))
  )
  || re.test(window.navigator.userAgent)
}

function testPlatform(re: RegExp) {
  return typeof window !== 'undefined' && window.navigator != null
    // @ts-expect-error ts-ignore
    // eslint-disable-next-line dot-notation
    ? re.test(window.navigator['userAgentData']?.platform || window.navigator.platform)
    : false
}

function cached(fn: () => boolean) {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.NODE_ENV === 'test')
    return fn

  let res: boolean | null = null
  return () => {
    if (res == null)
      res = fn()

    return res
  }
}

export const isMac = cached(() => {
  return testPlatform(/^Mac/i)
})

export const isIPhone = cached(() => {
  return testPlatform(/^iPhone/i)
})

export const isIPad = cached(() => {
  return testPlatform(/^iPad/i)
    // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    || (isMac() && navigator.maxTouchPoints > 1)
})

export const isIOS = cached(() => {
  return isIPhone() || isIPad()
})

export const isAppleDevice = cached(() => {
  return isMac() || isIOS()
})

export const isChrome = cached(() => {
  return testUserAgent(/Chrome/i)
})

export const isWebKit = cached(() => {
  return testUserAgent(/AppleWebKit/i) && !isChrome()
})

export const isAndroid = cached(() => {
  return testUserAgent(/Android/i)
})

export const isFirefox = cached(() => {
  return testUserAgent(/Firefox/i)
})
