/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { VirtualScrollToFn } from '@idux/cdk/scroll'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { EmptyProps } from '@idux/components/empty'
import type { TableColumn } from '@idux/components/table'
import type {
  SearchFn,
  TransferData,
  TransferMode,
  TransferPaginationProps,
  TransferScroll,
} from '@idux/components/transfer'
import type { TreeNode } from '@idux/components/tree'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type ProTransferTypes = 'table' | 'tree'
export type { TransferData } from '@idux/components/transfer'

export type TreeTransferData<C extends VKey = 'children'> = TransferData & {
  [key in C]?: TreeTransferData<C>[]
}

export interface ProTransferTableProps<T = any, K = VKey> {
  sourceColumns: TableColumn<T, K>[]
  targetColumns: TableColumn<T, K>[]
  tableLayout?: 'auto' | 'fixed'
  ellipsis?: boolean
  borderless?: boolean
}

export interface ProTransferTreeProps {
  showLine?: boolean
  childrenKey?: string
  expandIcon?: string
  labelKey?: string
  leafLineIcon?: string
  loadChildren?: (node: TreeTransferData<any>) => TreeTransferData<any>[]
  onExpand?: MaybeArray<(expanded: boolean, node: TreeNode<any>) => void>
  onExpandedChange?: MaybeArray<(expendedKeys: any[], expendedNodes: TreeNode<any>[]) => void>
}

export const proTransferProps = {
  type: {
    type: String as PropType<ProTransferTypes>,
    default: 'table',
  },
  dataSource: {
    type: Array as PropType<TransferData[]>,
    default: (): TransferData[] => [],
  },
  value: Array as PropType<VKey[]>,
  sourceSelectedKeys: Array as PropType<VKey[]>,
  targetSelectedKeys: Array as PropType<VKey[]>,
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  virtual: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  searchable: {
    type: [Boolean, Object] as PropType<boolean | { source: boolean; target: boolean }>,
    default: false,
  },
  searchFn: Function as PropType<SearchFn>,
  clearable: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  clearIcon: String as PropType<string>,
  empty: [String, Object] as PropType<string | EmptyProps>,
  pagination: [Boolean, Object] as PropType<boolean | TransferPaginationProps>,
  mode: {
    type: String as PropType<TransferMode>,
    default: 'default',
  },
  spin: [Boolean, Object] as PropType<boolean | { source: boolean; target: boolean }>,
  getKey: [String, Function] as PropType<string | ((item: TransferData<any>) => any)>,
  scroll: Object as PropType<TransferScroll>,

  tableProps: Object as PropType<ProTransferTableProps>,
  treeProps: Object as PropType<ProTransferTreeProps>,

  defaultTargetData: Array as PropType<TransferData[]>,
  flatTargetData: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  sourceExpandedKeys: Array as PropType<VKey[]>,
  targetExpandedKeys: Array as PropType<VKey[]>,

  //Events
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:sourceSelectedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:targetSelectedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:sourceExpandedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  'onUpdate:targetExpandedKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(keys: any[], oldKeys: any[]) => void>>,
  onSearch: [Function, Array] as PropType<MaybeArray<(isSource: boolean, searchValue: string) => void>>,
  onSelectAll: [Function, Array] as PropType<MaybeArray<(isSource: boolean, selectAll: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<() => void>>,
  onScroll: [Function, Array] as PropType<MaybeArray<(isSource: boolean, evt: Event) => void>>,
  onScrolledChange: [Function, Array] as PropType<
    MaybeArray<(isSource: boolean, startIndex: number, endIndex: number, visibleData: unknown[]) => void>
  >,
  onScrolledBottom: [Function, Array] as PropType<MaybeArray<(isSource: boolean) => void>>,
} as const

export const proTransferTableContentProps = {
  isSource: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export const proTransferTreeContentProps = {
  isSource: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export const proTransferListContentProps = {
  isSource: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
} as const

export interface ProTransferApis {
  scrollTo: (isSource: boolean, ...params: Parameters<VirtualScrollToFn>) => ReturnType<VirtualScrollToFn>
}

export type ProTransferProps = ExtractInnerPropTypes<typeof proTransferProps>
export type ProTransferPublicProps = ExtractPublicPropTypes<typeof proTransferProps>
export type ProTransferComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ProTransferPublicProps> & ProTransferPublicProps,
  ProTransferApis
>
export type ProTransferInstance = InstanceType<DefineComponent<ProTransferProps, ProTransferApis>>
