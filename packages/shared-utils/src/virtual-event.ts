// https://github.com/adobe/react-spectrum/blob/bd458c1ed166a5ff1fd93f0c1a397e1540b3d880/packages/%40react-aria/utils/src/isVirtualEvent.ts#L26

import { isAndroid } from './platform'

export function isVirtualClick(event: PointerEvent | MouseEvent): boolean {
  if ((event as any).mozInputSource === 0 && event.isTrusted)
    return true

  if (isAndroid() && (event as PointerEvent).pointerType)
    return event.type === 'click' && event.buttons === 1

  return event.detail === 0 && !(event as PointerEvent).pointerType
}
