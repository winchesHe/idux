/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PopperEvents, PopperOptions, PopperPlacement, PopperTriggerEvents } from './types'
import type { ComputedRef } from 'vue'

import { computed, reactive, ref, watch } from 'vue'

import { NoopFunction, NoopObject } from '@idux/cdk/utils'

const defaultDelay = 0

export function useReactiveOptions(options: PopperOptions): Required<PopperOptions> {
  const {
    allowEnter = true,
    autoAdjust = true,
    delay = defaultDelay,
    disabled = false,
    offset = [0, 0],
    placement = 'top',
    trigger = 'hover',
    visible = false,
    strategy = 'absolute',
    modifiers = [],
    onFirstUpdate = NoopFunction,
  } = options

  return reactive({
    allowEnter,
    autoAdjust,
    delay,
    disabled,
    offset,
    placement,
    trigger,
    visible,
    strategy,
    modifiers,
    onFirstUpdate,
  })
}

export type BaseOptions = Pick<
  Required<PopperOptions>,
  'placement' | 'strategy' | 'onFirstUpdate' | 'modifiers' | 'offset' | 'autoAdjust'
>

export function useBaseOptions(state: Required<PopperOptions>): ComputedRef<BaseOptions> {
  return computed(() => {
    const { placement, strategy, onFirstUpdate, modifiers, offset, autoAdjust } = state
    return { placement, strategy, onFirstUpdate, modifiers, offset, autoAdjust }
  })
}

export function useVisibility(state: Required<PopperOptions>): ComputedRef<boolean> {
  return computed(() => !state.disabled && state.visible)
}

export function usePlacement(state: Required<PopperOptions>): {
  placement: ComputedRef<PopperPlacement>
  updatePlacement: (value: PopperPlacement) => void
} {
  const _placement = ref(state.placement)

  const updatePlacement = (value: PopperPlacement) => {
    _placement.value = value
  }

  watch(() => state.placement, updatePlacement)

  const placement = computed(() => _placement.value)

  return { placement, updatePlacement }
}

export function useDelay(state: Required<PopperOptions>): ComputedRef<{ show: number; hide: number }> {
  const convertDelay = (delay: number | [number | null, number | null]) => {
    if (Array.isArray(delay)) {
      const [show, hide] = delay
      return { show: show ?? defaultDelay, hide: hide ?? defaultDelay }
    }
    return { show: delay, hide: delay }
  }

  return computed(() => convertDelay(state.delay))
}

export function useTimer(): { setTimer: (action: () => void, delay: number) => void; clearTimer: () => void } {
  let timer: number | null = null

  const setTimer = (action: () => void, delay: number) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(action, delay)
  }

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { setTimer, clearTimer }
}

export function useTriggerEvents(
  baseOptions: Required<PopperOptions>,
  eventOptions: { visibility: ComputedRef<boolean>; show(): void; hide(): void },
): ComputedRef<PopperTriggerEvents> {
  const { visibility, show, hide } = eventOptions

  const onMouseenter = () => show()
  const onMouseleave = () => hide()
  const onFocus = () => show()
  const onBlur = () => hide()

  const onClick = () => {
    const { trigger } = baseOptions
    if (trigger === 'click') {
      visibility.value ? hide() : show()
    } else if (trigger === 'contextmenu') {
      visibility.value && hide()
    }
  }

  const onContextmenu = (evt: Event) => {
    evt.preventDefault()
    show()
  }

  const eventsMap = {
    hover: { onMouseenter, onMouseleave },
    focus: { onFocus, onBlur },
    click: { onClick },
    contextmenu: { onClick, onContextmenu },
    manual: {},
  }

  return computed(() => eventsMap[baseOptions.trigger])
}

export function usePopperEvents(
  baseOptions: Required<PopperOptions>,
  eventOptions: { show(): void; hide(): void },
): ComputedRef<PopperEvents> {
  const { show, hide } = eventOptions

  const onMouseenter = () => show()
  const onMouseleave = () => hide()

  const eventsMap = {
    click: NoopObject,
    focus: NoopObject,
    hover: { onMouseenter, onMouseleave },
    contextmenu: NoopObject,
    manual: NoopObject,
  }

  return computed(() => (baseOptions.allowEnter ? eventsMap[baseOptions.trigger] : NoopObject))
}
