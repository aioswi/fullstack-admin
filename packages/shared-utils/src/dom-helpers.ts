export function getOwnerDocument(el: Element | null | undefined): Document {
  return el?.ownerDocument || document
}

export function getOwnerWindow(el: (Window & typeof globalThis) | Element | null | undefined): Window & typeof globalThis {
  if (el && 'window' in el && el.window === el)
    return el

  const doc = getOwnerDocument(el as Element | null | undefined)
  return doc.defaultView || window
}
