// https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/utils/src/chain.ts

export function chain(...callbacks: any[]): (...args: any[]) => void {
  return (...args: any[]) => {
    for (const callback of callbacks) {
      if (typeof callback === 'function')
        callback(...args)
    }
  }
}
