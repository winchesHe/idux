/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CSSProperties,
  type ComputedRef,
  type Slots,
  type VNodeChild,
  computed,
  defineComponent,
  inject,
  normalizeClass,
} from 'vue'

import { isFunction, isString } from 'lodash-es'

import { type VKey, convertCssPixel } from '@idux/cdk/utils'

import { type TableColumnMergedExtra } from '../../composables/useColumns'
import { TABLE_TOKEN } from '../../token'
import {
  type TableColumnFilterable,
  type TableColumnSortOrder,
  type TableColumnSortable,
  tableHeadCellProps,
} from '../../types'
import { getColTitle } from '../../utils'
import FilterableTrigger from './triggers/FilterableTrigger'
import SelectableTrigger from './triggers/SelectableTrigger'
import SortableTrigger from './triggers/SortableTrigger'

type HeadColumn = TableColumnMergedExtra & {
  type: 'selectable' | 'expandable' | 'scroll-bar' | undefined
  titleRowSpan: number
}

export default defineComponent({
  props: tableHeadCellProps,
  setup(props) {
    const {
      props: tableProps,
      slots,
      mergedPrefixCls,
      fixedColumnKeys,
      columnOffsetsWithScrollBar,
      isSticky,
      handleSort,
      activeOrderByMap,
      activeFilterByMap,
      handleFilter,
    } = inject(TABLE_TOKEN)!

    const classes = computed(() => {
      const {
        type,
        align,
        ellipsis = tableProps.ellipsis,
        fixed,
        hasChildren,
        key,
        sortable,
        filterable,
      } = props.column as HeadColumn
      const prefixCls = mergedPrefixCls.value
      let classes: Record<string, boolean | undefined> = {
        [`${prefixCls}-cell-${type}`]: !!type,
        [`${prefixCls}-cell-filterable`]: !!filterable,
        [`${prefixCls}-cell-sortable`]: !!sortable,
        [`${prefixCls}-align-${align}`]: !hasChildren && !!align,
        [`${prefixCls}-align-center`]: hasChildren,
        [`${prefixCls}-ellipsis`]: !!ellipsis,
      }
      if (fixed) {
        const { lastStartKey, firstEndKey } = fixedColumnKeys.value
        classes = {
          ...classes,
          [`${prefixCls}-fix-start`]: fixed === 'start',
          [`${prefixCls}-fix-start-last`]: lastStartKey === key,
          [`${prefixCls}-fix-end`]: fixed === 'end',
          [`${prefixCls}-fix-end-first`]: firstEndKey === key,
          [`${prefixCls}-fix-sticky`]: isSticky.value,
        }
      }
      return normalizeClass(classes)
    })

    const style = computed<CSSProperties | undefined>(() => {
      const { fixed, colStart, colEnd } = props.column as HeadColumn
      if (!fixed) {
        return
      }
      const { starts, ends } = columnOffsetsWithScrollBar.value
      const offsets = fixed === 'start' ? starts : ends
      const offsetIndex = fixed === 'start' ? colStart : colEnd
      const fixedOffset = convertCssPixel(offsets[offsetIndex])
      return {
        position: 'sticky',
        left: fixed === 'start' ? fixedOffset : undefined,
        right: fixed === 'end' ? fixedOffset : undefined,
      }
    })

    const activeSortOrderBy = computed(() => activeOrderByMap[props.column.key])
    const activeFilterBy = computed(() => activeFilterByMap[props.column.key])
    const onUpdateFilterBy = (filterBy: VKey[]) => {
      const { key, filterable } = props.column
      handleFilter(key, filterable!, filterBy)
    }

    const onClick = () => {
      const { key, sortable } = props.column
      if (sortable) {
        handleSort(key, sortable)
      }
    }

    return () => {
      const { column } = props

      const { type, additional, titleColSpan, titleRowSpan } = column as HeadColumn

      if (type === 'scroll-bar') {
        return (
          <th
            class={classes.value}
            style={style.value}
            colSpan={titleColSpan === 1 ? undefined : titleColSpan}
            rowSpan={titleRowSpan === 1 ? undefined : titleRowSpan}
            onClick={onClick}
          ></th>
        )
      }
      const prefixCls = mergedPrefixCls.value
      let _title: string | undefined
      let children: VNodeChild | undefined
      if (type === 'selectable') {
        children = <SelectableTrigger />
      } else {
        const { title, customTitle, ellipsis = tableProps.ellipsis, sortable, filterable } = column as HeadColumn
        children = renderChildren(title, customTitle, slots)
        _title = getColTitle(ellipsis, children!, title)

        const iconTriggers = renderTrigger(sortable, activeSortOrderBy, filterable, activeFilterBy, onUpdateFilterBy)

        if (iconTriggers.length > 0) {
          children = (
            <span class={`${prefixCls}-cell-triggers`}>
              <span class={`${prefixCls}-cell-title`}>{children}</span>
              {iconTriggers}
            </span>
          )
        } else if (ellipsis) {
          children = <span class={`${prefixCls}-cell-title`}>{children}</span>
        }
      }

      const customAdditionalFn = tableProps.customAdditional?.headCell
      const customAdditional = customAdditionalFn ? customAdditionalFn({ column }) : undefined
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Tag = (tableProps.customTag?.headCell ?? 'th') as any
      return (
        <Tag
          class={classes.value}
          style={style.value}
          colSpan={titleColSpan === 1 ? undefined : titleColSpan}
          rowSpan={titleRowSpan === 1 ? undefined : titleRowSpan}
          title={_title}
          {...additional}
          {...customAdditional}
          onClick={onClick}
        >
          {children}
        </Tag>
      )
    }
  },
})

function renderChildren(
  title: string | undefined,
  customTitle: string | ((options: { title?: string }) => VNodeChild) | undefined,
  slots: Slots,
) {
  let children: VNodeChild | undefined = title
  if (isFunction(customTitle)) {
    children = customTitle({ title })
  } else if (isString(customTitle) && slots[customTitle]) {
    children = slots[customTitle]!({ title })
  }
  return children
}

function renderTrigger(
  sortable: TableColumnSortable | undefined,
  activeSortOrderBy: ComputedRef<TableColumnSortOrder | undefined>,
  filterable: TableColumnFilterable | undefined,
  activeFilterBy: ComputedRef<VKey[]>,
  onUpdateFilterBy: (filterBy: VKey[]) => void,
) {
  const children: VNodeChild[] = []
  sortable && children.push(<SortableTrigger activeOrderBy={activeSortOrderBy.value} sortable={sortable} />)
  if (filterable) {
    children.push(
      <FilterableTrigger
        activeFilterBy={activeFilterBy.value}
        filterable={filterable}
        onUpdateFilterBy={onUpdateFilterBy}
      />,
    )
  }
  return children
}
