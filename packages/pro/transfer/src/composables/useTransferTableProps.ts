/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ProTransferProps } from '../types'
import type { TableColumn, TableColumnSelectable, TableProps } from '@idux/components/table'

import { type ComputedRef, type Slots, computed } from 'vue'

import { isString } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { type TransferBindings } from '@idux/components/transfer'

import { renderRemovableLabel } from '../content/RenderRemovableLabel'

export function useTransferTableProps(
  props: ProTransferProps,
  slots: Slots,
  transferBindings: TransferBindings,
  mergedPrefixCls: ComputedRef<string>,
  isSource: boolean,
): ComputedRef<TableProps> {
  const { paginatedData, paginatedDataSource, selectedKeys, getKey } = transferBindings

  return computed<TableProps>(() => {
    const columns = isSource ? props.tableProps?.sourceColumns : props.tableProps?.targetColumns
    const scroll = props.scroll && {
      height: props.scroll.height,
      fullHeight: props.scroll.fullHeight,
      width: '100%',
    }

    const customTableProps = { ...(props.tableProps ?? {}) }
    delete customTableProps.sourceColumns
    delete customTableProps.targetColumns

    return {
      ...customTableProps,
      dataSource: isSource && props.mode === 'immediate' ? paginatedDataSource.value : paginatedData.value,
      columns: convertTableColumns(columns, mergedPrefixCls, transferBindings, props, slots, isSource),
      scroll,
      pagination: false,
      selectedRowKeys: selectedKeys.value,
      virtual: props.virtual,
      rowKey: getKey.value as (record: unknown) => number | string,
      onScroll: evt => {
        callEmit(props.onScroll, isSource, evt)
      },
      onScrolledChange: (startIndex, endIndex, visibleData) => {
        callEmit(props.onScrolledChange, isSource, startIndex, endIndex, visibleData)
      },
      onScrolledBottom: () => {
        callEmit(props.onScrolledBottom, isSource)
      },
    }
  })
}

function convertTableColumns(
  columns: TableColumn[] | undefined,
  mergedPrefixCls: ComputedRef<string>,
  transferBindings: TransferBindings,
  props: ProTransferProps,
  slots: Slots,
  isSource: boolean,
): TableColumn[] {
  const { handleSelectChange, getKey, triggerRemove, disabledDataSourceKeys } = transferBindings

  const convertedColumns = (columns && [...columns]) ?? []
  const selectableColumnIdx = convertedColumns.findIndex(col => 'type' in col && col.type === 'selectable')

  const defaultSelectableColumn: TableColumnSelectable = {
    type: 'selectable',
    disabled: record => disabledDataSourceKeys.value.has(getKey.value(record)) || !!props.disabled,
    multiple: true,
    trigger: 'click',
    onChange: selectedKeys => handleSelectChange(selectedKeys),
  }

  if (isSource || props.mode !== 'immediate') {
    if (selectableColumnIdx < 0) {
      convertedColumns.unshift(defaultSelectableColumn)
    } else {
      convertedColumns[selectableColumnIdx] = {
        ...convertedColumns[selectableColumnIdx],
        ...defaultSelectableColumn,
      }
    }
  } else {
    selectableColumnIdx > -1 && convertedColumns.splice(selectableColumnIdx, 1)
  }

  if (props.mode === 'immediate' && !isSource) {
    const lastCol = convertedColumns[convertedColumns.length - 1]
    if ('type' in lastCol) {
      convertedColumns.push({
        customCell: ({ record }) => {
          const key = getKey.value(record)
          return renderRemovableLabel(
            key,
            disabledDataSourceKeys.value.has(key),
            null,
            triggerRemove,
            mergedPrefixCls.value,
          )
        },
      })
    } else {
      const originalCustomCell = lastCol.customCell
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const renderLabel = (data: { value: any; record: any; rowIndex: number }) => {
        if (!originalCustomCell) {
          return data.value
        }

        if (isString(originalCustomCell)) {
          return slots[originalCustomCell]?.(data)
        }

        return originalCustomCell(data)
      }

      convertedColumns.splice(convertedColumns.length - 1, 1, {
        ...lastCol,
        customCell: data => {
          const key = getKey.value(data.record)
          return renderRemovableLabel(
            key,
            disabledDataSourceKeys.value.has(key),
            () => renderLabel(data),
            triggerRemove,
            mergedPrefixCls.value,
          )
        },
      })
    }
  }

  return convertedColumns
}
