/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, normalizeClass, provide, ref, watch } from 'vue'

import { useAccessorAndControl } from '@idux/cdk/forms'
import { type VirtualScrollToFn } from '@idux/cdk/scroll'
import { type VKey, useControlledProp, useState } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { ɵSelector, type ɵSelectorInstance } from '@idux/components/_private/selector'
import { useGlobalConfig } from '@idux/components/config'
import { useFormItemRegister } from '@idux/components/form'
import { ɵUseOverlayState } from '@idux/components/select'
import { type TreeInstance } from '@idux/components/tree'

import { useMergeNodes } from './composables/useDataSource'
import { useGetNodeKey } from './composables/useGetNodeKey'
import { useSelectedState } from './composables/useSelectedState'
import Content from './content/Content'
import { treeSelectToken } from './token'
import { treeSelectProps } from './types'

const defaultOffset: [number, number] = [0, 8]

export default defineComponent({
  name: 'IxTreeSelect',
  inheritAttrs: false,
  props: treeSelectProps,
  setup(props, { attrs, expose, slots }) {
    const common = useGlobalConfig('common')
    const locale = useGlobalConfig('locale')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-tree-select`)
    const config = useGlobalConfig('treeSelect')
    const mergedChildrenKey = computed(() => props.childrenKey ?? config.childrenKey)
    const mergedGetKey = useGetNodeKey(props, config)
    const mergedLabelKey = computed(() => props.labelKey ?? config.labelKey)

    const triggerRef = ref<ɵSelectorInstance>()
    const [inputValue, setInputValue] = useState('')
    const focus = () => triggerRef.value?.focus()
    const blur = () => triggerRef.value?.blur()
    const clearInput = () => {
      props.searchable === 'overlay' ? setInputValue('') : triggerRef.value?.clearInput()
    }

    const [expandedKeys, setExpandedKeys] = useControlledProp(props, 'expandedKeys', () => [])

    const { accessor, control } = useAccessorAndControl()
    useFormItemRegister(control)

    const { mergedNodeMap } = useMergeNodes(props, mergedChildrenKey, mergedGetKey, mergedLabelKey)
    const { selectedValue, selectedNodes, changeSelected, handleRemove, handleClear } = useSelectedState(
      props,
      accessor,
      mergedNodeMap,
    )
    const { overlayRef, overlayStyle, updateOverlay, overlayOpened, setOverlayOpened } = ɵUseOverlayState(
      props,
      config,
      triggerRef,
    )

    const treeRef = ref<TreeInstance>()
    const scrollTo: VirtualScrollToFn = options => {
      treeRef.value?.scrollTo(options)
    }

    expose({
      focus,
      blur,
      collapseAll: () => treeRef.value?.collapseAll(),
      expandAll: () => treeRef.value?.expandAll(),
      scrollTo,
      getNode: (key: VKey) => treeRef.value?.getNode(key),
    })

    watch(overlayOpened, opened => {
      opened && focus()
      clearInput()
    })

    const handleOverlayClick = () => {
      if (props.searchable !== 'overlay') {
        focus()
      }
    }

    const handleNodeClick = () => {
      if (props.multiple) {
        clearInput()
      } else {
        setOverlayOpened(false)
      }
    }

    const handleBlur = () => accessor.markAsBlurred()
    const handleItemRemove = (key: VKey) => {
      focus()
      handleRemove(key)
    }

    provide(treeSelectToken, {
      props,
      slots,
      config,
      locale,
      mergedPrefixCls,
      mergedChildrenKey,
      mergedGetKey,
      mergedLabelKey,
      expandedKeys,
      mergedNodeMap,
      inputValue,
      setInputValue,
      treeRef,
      accessor,
      setExpandedKeys,
      overlayOpened,
      setOverlayOpened,
      handleNodeClick,
      selectedValue,
      changeSelected,
    })

    const overlayClasses = computed(() => {
      const { overlayClassName, multiple } = props
      const prefixCls = mergedPrefixCls.value
      return normalizeClass({
        [`${prefixCls}-overlay`]: true,
        [`${prefixCls}-overlay-multiple`]: multiple,
        [overlayClassName || '']: !!overlayClassName,
      })
    })

    const target = computed(
      () =>
        props.target ??
        props.overlayContainer ??
        config.target ??
        config.overlayContainer ??
        `${mergedPrefixCls.value}-overlay-container`,
    )

    const renderTrigger = () => (
      <ɵSelector
        ref={triggerRef}
        v-slots={slots}
        className={mergedPrefixCls.value}
        allowInput={false}
        autocomplete={props.autocomplete}
        autofocus={props.autofocus}
        borderless={props.borderless}
        clearable={props.clearable}
        clearIcon={props.clearIcon}
        config={config}
        dataSource={selectedNodes.value}
        disabled={accessor.disabled}
        maxLabel={props.maxLabelCount ?? props.maxLabel}
        multiple={props.multiple}
        opened={overlayOpened.value}
        placeholder={props.placeholder}
        readonly={props.readonly}
        searchable={props.searchable}
        size={props.size}
        suffix={props.suffix}
        value={selectedValue.value}
        onBlur={handleBlur}
        onClear={handleClear}
        onInputValueChange={setInputValue}
        onItemRemove={handleItemRemove}
        //onKeydown={handleKeyDown}
        onOpenedChange={setOverlayOpened}
        onResize={updateOverlay}
        onSearch={props.onSearch}
        {...attrs}
      />
    )

    const renderContent = () => <Content onClick={handleOverlayClick} />

    return () => {
      const overlayProps = {
        class: overlayClasses.value,
        style: overlayStyle.value,
        clickOutside: true,
        disabled: accessor.disabled || props.readonly,
        offset: defaultOffset,
        placement: 'bottomStart',
        target: target.value,
        trigger: 'manual',
        triggerId: attrs.id,
        visible: overlayOpened.value,
        'onUpdate:visible': setOverlayOpened,
      } as const

      const overlaySlots = { default: renderTrigger, content: renderContent }

      return <ɵOverlay ref={overlayRef} {...overlayProps} v-slots={overlaySlots} />
    }
  },
})
