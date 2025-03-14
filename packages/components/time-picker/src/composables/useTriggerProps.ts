/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ɵTriggerProps } from '@idux/components/_private/trigger'

import { type ComputedRef, computed } from 'vue'

import { TimePickerContext, TimeRangePickerContext } from '../tokens'

export function useTriggerProps(context: TimePickerContext | TimeRangePickerContext): ComputedRef<ɵTriggerProps> {
  const {
    props,
    config,
    accessor,
    formContext,
    isFocused,
    handleBlur,
    handleFocus,
    handleClear,
    handleKeyDown,
    overlayOpened,
    setOverlayOpened,
    inputEnableStatus,
  } = context

  const handleClick = () => {
    const currOpened = overlayOpened.value
    if (currOpened || accessor.disabled) {
      return
    }

    setOverlayOpened(!currOpened)
  }

  return computed(() => ({
    borderless: props.borderless,
    clearable: !props.readonly && !accessor.disabled && (props.clearable ?? config.clearable) && !!accessor.value,
    clearIcon: props.clearIcon ?? config.clearIcon,
    disabled: accessor.disabled,
    focused: isFocused.value,
    readonly: props.readonly || !inputEnableStatus.value.enableExternalInput,
    size: props.size ?? formContext?.size.value ?? config.size,
    suffix: props.suffix ?? config.suffix,
    onClick: handleClick,
    onClear: handleClear,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  }))
}
