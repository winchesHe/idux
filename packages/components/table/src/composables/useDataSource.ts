/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed } from 'vue'

import { type VKey } from '@idux/cdk/utils'

import { type TablePagination, type TableProps } from '../types'
import { type ActiveFilter } from './useFilterable'
import { type GetRowKey } from './useGetRowKey'
import { type ActiveSorter } from './useSortable'

export function useDataSource(
  props: TableProps,
  mergedChildrenKey: ComputedRef<string>,
  mergedGetKey: ComputedRef<GetRowKey>,
  activeSorters: ComputedRef<ActiveSorter[]>,
  activeFilters: ComputedRef<ActiveFilter[]>,
  expandedRowKeys: Ref<VKey[]>,
  mergedPagination: ComputedRef<TablePagination | null>,
): DataSourceContext {
  const mergedData = computed(() => {
    const childrenKey = mergedChildrenKey.value
    const getKey = mergedGetKey.value
    return props.dataSource.map(record => convertMergeData(record, getKey, childrenKey))
  })

  const mergedMap = computed(() => {
    const map = new Map<VKey, MergedData>()
    convertDataMap(mergedData.value, map)
    return map
  })

  const filteredData = computed(() => filterData(mergedData.value, activeFilters.value, expandedRowKeys.value))
  const sortedData = computed(() => sortData(filteredData.value, activeSorters.value, expandedRowKeys.value))
  const paginatedData = computed(() => {
    const pagination = mergedPagination.value
    const data = sortedData.value
    if (pagination === null || !pagination.pageSize) {
      return data
    } else {
      const { total } = pagination
      if (total && data.length < total) {
        return data
      }
      const pageSize = pagination.pageSize!
      const startIndex = (pagination.pageIndex! - 1) * pageSize
      return data.slice(startIndex, startIndex + pageSize)
    }
  })
  const paginatedMap = computed(() => {
    const map = new Map<VKey, MergedData>()
    convertDataMap(paginatedData.value, map)
    return map
  })

  const flattedData = computed(() => {
    const expandedKeys = expandedRowKeys.value
    if (expandedKeys.length > 0) {
      return flatData(paginatedData.value, expandedKeys, 0)
    }
    return paginatedData.value
  })

  return { filteredData, flattedData, mergedMap, paginatedMap }
}

export interface DataSourceContext {
  filteredData: ComputedRef<MergedData[]>
  flattedData: ComputedRef<FlattedData[]>
  mergedMap: ComputedRef<Map<VKey, MergedData>>
  paginatedMap: ComputedRef<Map<VKey, MergedData>>
}

export interface MergedData {
  children?: MergedData[]
  parentKey?: VKey
  record: unknown
  rowKey: VKey
}

export interface FlattedData extends MergedData {
  expanded?: boolean
  level?: number
}

function convertMergeData(record: unknown, getRowKey: GetRowKey, childrenKey: string, parentKey?: VKey) {
  const rowKey = getRowKey(record)
  const result: MergedData = { record, rowKey, parentKey }

  const subData = (record as Record<string, unknown>)[childrenKey] as unknown[]
  if (subData) {
    result.children = subData.map(subRecord => convertMergeData(subRecord, getRowKey, childrenKey, rowKey))
  }
  return result
}

function convertDataMap(mergedData: MergedData[], map: Map<VKey, MergedData>) {
  mergedData.forEach(item => {
    const { rowKey, children } = item
    map.set(rowKey, item)
    if (children) {
      convertDataMap(children, map)
    }
  })
}

function sortData(mergedData: MergedData[], activeSorters: ActiveSorter[], expandedRowKeys: VKey[]) {
  const sorters = activeSorters.filter(item => item.sorter)
  const sorterLength = sorters.length

  if (sorterLength === 0) {
    return mergedData
  }
  const tempData = mergedData.slice()
  tempData.forEach(item => {
    if (expandedRowKeys.includes(item.rowKey) && item.children && item.children.length > 0) {
      item.children = sortData(item.children, activeSorters, expandedRowKeys)
    }
  })
  return tempData.sort((curr, next) => {
    for (let index = 0; index < sorterLength; index++) {
      const { orderBy, sorter } = sorters[index]
      const sorterResult = sorter!(curr.record, next.record)
      if (sorterResult !== 0) {
        return orderBy === 'ascend' ? sorterResult : -sorterResult
      }
    }
    return 0
  })
}

function filterData(mergedData: MergedData[], activeFilters: ActiveFilter[], expandedRowKeys: VKey[]): MergedData[] {
  const filters = activeFilters.filter(item => item.filter)
  if (filters.length === 0) {
    return mergedData
  }

  return mergedData
    .map(item => {
      const valid = filters.every(({ filter, filterBy }) => filter!(filterBy, item.record))

      const { rowKey, children } = item
      const isExpanded = expandedRowKeys.includes(rowKey)
      let newItem = item
      if (isExpanded && children && children.length) {
        const newChildren = filterData(children, activeFilters, expandedRowKeys)
        if (newChildren.length !== children.length) {
          newItem = { ...item, children: newChildren }
        }
      }
      return valid || (isExpanded && newItem.children && newItem.children.length) ? newItem : null
    })
    .filter(item => item !== null) as MergedData[]
}

// TODO: performance optimization
// when virtual scrolling is enabled, this do not need to traverse all nodes
function flatData(mergedData: MergedData[], expandedRowKeys: VKey[], level: number) {
  return mergedData.reduce((result, item) => {
    const { children, parentKey, record, rowKey } = item
    const expanded = expandedRowKeys.includes(rowKey)

    result.push({ children, parentKey, record, rowKey, level, expanded })

    if (expanded && item.children) {
      const childrenFlatData = flatData(item.children, expandedRowKeys, level + 1)
      result.push(...childrenFlatData)
    }

    return result
  }, [] as FlattedData[])
}
