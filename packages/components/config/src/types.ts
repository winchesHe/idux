/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BreakpointKey } from '@idux/cdk/breakpoint'
import type { PopperPlacement, PopperTrigger } from '@idux/cdk/popper'
import type { PortalTargetType } from '@idux/cdk/portal'
import type { AlertType } from '@idux/components/alert'
import type { AvatarShape, AvatarSize } from '@idux/components/avatar'
import type { ButtonSize } from '@idux/components/button'
import type { CardSize } from '@idux/components/card'
import type { CarouselDotPlacement, CarouselDotTrigger } from '@idux/components/carousel'
import type { CascaderData } from '@idux/components/cascader'
import type { DatePickerType } from '@idux/components/date-picker'
import type { FormLabelAlign, FormLayout, FormSize } from '@idux/components/form'
import type { ListSize } from '@idux/components/list'
import type { LoadingBarAnimation } from '@idux/components/loading-bar'
import type { Locale } from '@idux/components/locales'
import type { MenuData, MenuTheme } from '@idux/components/menu'
import type { MessageType } from '@idux/components/message'
import type { ModalType } from '@idux/components/modal'
import type { NotificationPlacement, NotificationType } from '@idux/components/notification'
import type { PaginationSize } from '@idux/components/pagination'
import type { ProgressFormat, ProgressIcons, ProgressSize } from '@idux/components/progress'
import type { ResultStatus } from '@idux/components/result'
import type { SelectData } from '@idux/components/select'
import type { SpaceSize } from '@idux/components/space'
import type { SpinSize, SpinTipAlignType } from '@idux/components/spin'
import type { StepperLabelPlacement, StepperSize } from '@idux/components/stepper'
import type { TableColumnAlign, TableColumnSortOrder, TablePaginationPosition, TableSize } from '@idux/components/table'
import type { TagShape } from '@idux/components/tag'
import type { TextareaAutoRows, TextareaResize } from '@idux/components/textarea'
import type { TreeNode } from '@idux/components/tree'
import type { UploadFilesType, UploadIconType, UploadRequestMethod, UploadRequestOption } from '@idux/components/upload'
import type { VNode } from 'vue'

export interface GlobalConfig {
  common: CommonConfig
  locale: Locale

  alert: AlertConfig
  anchor: AnchorConfig
  avatar: AvatarConfig
  backTop: BackTopConfig
  badge: BadgeConfig
  button: ButtonConfig
  card: CardConfig
  carousel: CarouselConfig
  cascader: CascaderConfig
  checkbox: CheckboxConfig
  collapse: CollapseConfig
  datePicker: DatePickerConfig
  divider: DividerConfig
  drawer: DrawerConfig
  dropdown: DropdownConfig
  empty: EmptyConfig
  form: FormConfig
  icon: IconConfig
  input: InputConfig
  inputNumber: InputNumberConfig
  list: ListConfig
  loadingBar: LoadingBarConfig
  image: ImageConfig
  imageViewer: ImageViewerConfig
  menu: MenuConfig
  message: MessageConfig
  modal: ModalConfig
  notification: NotificationConfig
  pagination: PaginationConfig
  popconfirm: PopconfirmConfig
  popover: PopoverConfig
  progress: ProgressConfig
  radio: RadioConfig
  rate: RateConfig
  result: ResultConfig
  row: RowConfig
  select: SelectConfig
  skeleton: SkeletonConfig
  space: SpaceConfig
  spin: SpinConfig
  statistic: StatisticConfig
  stepper: StepperConfig
  switch: SwitchConfig
  table: TableConfig
  tag: TagConfig
  tagGroup: TagGroupConfig
  textarea: TextareaConfig
  timePicker: TimePickerConfig
  transfer: TransferConfig
  tooltip: TooltipConfig
  tree: TreeConfig
  treeSelect: TreeSelectConfig
  upload: UploadConfig
  uploadFiles: UploadFilesConfig
}

export type GlobalConfigKey = keyof GlobalConfig
export interface CommonConfig {
  prefixCls: string
  zIndex: number
}

export interface AlertConfig {
  closable: boolean
  icon: string | Partial<Record<AlertType, string>>
}

export interface AnchorConfig {
  bounds: number
  hideLinkBall: boolean
}

export interface AvatarConfig {
  gap: number
  icon: string | VNode
  shape: AvatarShape
  size: AvatarSize | Partial<Record<BreakpointKey, number>>
}

export interface BackTopConfig {
  duration: number
  visibilityHeight: number
}

export interface BadgeConfig {
  showZero: boolean
  dot: boolean
  overflowCount: number | string
}

export interface ButtonConfig {
  size: ButtonSize
}

export interface CardConfig {
  size: CardSize
  borderless: boolean
  hoverable: boolean
}

export interface CarouselConfig {
  autoplayTime: number
  dotPlacement: CarouselDotPlacement
  showArrow: boolean
  trigger: CarouselDotTrigger
}

export interface CascaderConfig {
  borderless: boolean
  clearIcon: string
  childrenKey: string
  expandIcon: string
  fullPath: boolean
  getKey: string | ((data: CascaderData<any>) => any)
  labelKey: string
  overlayContainer?: PortalTargetType
  overlayMatchWidth: boolean
  size: FormSize
  suffix: string
}

export interface CheckboxConfig {
  size: FormSize
}

export interface CollapseConfig {
  accordion: boolean
  borderless: boolean
  expandIcon: string
  ghost: boolean
}

export interface DatePickerConfig {
  allowInput: boolean | 'overlay'
  borderless: boolean
  clearable: boolean
  clearIcon: string
  format?: Partial<Record<DatePickerType, string>>
  size: FormSize
  suffix: string
  overlayContainer?: PortalTargetType
}

export interface DividerConfig {
  dashed: boolean
  plain: boolean
  labelPlacement: 'start' | 'center' | 'end'
  size: 'sm' | 'md' | 'lg'
}

export interface DrawerConfig {
  closable: boolean
  closeIcon: string
  closeOnEsc: boolean
  height: string | number
  mask: boolean
  maskClosable: boolean
  target?: PortalTargetType
  width: string | number
}

export interface DropdownConfig {
  autoAdjust: boolean
  destroyOnHide: boolean
  offset: [number, number]
  overlayContainer?: PortalTargetType
  placement: PopperPlacement
  showArrow: boolean
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target?: PortalTargetType
  trigger: PopperTrigger
}

export interface EmptyConfig {
  icon: string | VNode
  image?: string | VNode
}

export interface FormConfig {
  colonless: boolean
  labelAlign: FormLabelAlign
  layout: FormLayout
  size: FormSize
  labelTooltipIcon: string
  controlTooltipIcon: string
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

export interface InputConfig {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
}

export interface InputNumberConfig {
  keyboard: boolean
  size: FormSize
}

export interface ListConfig {
  size: ListSize
  borderless: boolean
}

export interface LoadingBarConfig {
  mask: boolean
  animation: LoadingBarAnimation
}

export interface ImageConfig {
  preview: boolean
}

export interface ImageViewerConfig {
  loop: boolean
  maskClosable: boolean
  zoom: number[]
  target?: PortalTargetType
}

export interface MenuConfig {
  getKey: string | ((data: MenuData<any>) => any)
  indent: number
  offset: [number, number]
  overlayContainer?: PortalTargetType
  suffix: string
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target?: PortalTargetType
  theme: MenuTheme
}

export interface MessageConfig {
  destroyOnHover: boolean
  duration: number
  icon: Partial<Record<MessageType, string | VNode>>
  maxCount: number
  target?: PortalTargetType
  top?: number | string
}

export interface ModalConfig {
  centered: boolean
  closable: boolean
  closeIcon: string
  closeOnEsc: boolean
  icon?: Partial<Record<ModalType, string | VNode>>
  mask: boolean
  maskClosable: boolean
  target?: PortalTargetType
  width: string | number
}

export interface NotificationConfig {
  destroyOnHover: boolean
  duration: number
  icon?: Partial<Record<NotificationType, string | VNode>>
  closeIcon?: string | VNode
  maxCount: number
  offset: number | string | (string | number)[]
  placement: NotificationPlacement
  target?: PortalTargetType
}

export interface PaginationConfig {
  pageSize: number
  pageSizes: number[]
  showQuickJumper: boolean
  showSizeChanger: boolean
  showTitle: boolean
  showTotal: boolean
  simple: boolean
  size: PaginationSize
}

export interface PopconfirmConfig {
  autoAdjust: boolean
  delay: number | [number | null, number | null]
  destroyOnHide: boolean
  placement: PopperPlacement
  target?: PortalTargetType
  trigger: PopperTrigger
}

export interface PopoverConfig {
  autoAdjust: boolean
  delay: number | [number | null, number | null]
  destroyOnHide: boolean
  placement: PopperPlacement
  target?: PortalTargetType
  showArrow: boolean
  trigger: PopperTrigger
  closeIcon: string
}

export interface ProgressConfig {
  size: ProgressSize
  format: ProgressFormat
  defaultCircleStrokeWidth?: string | number
  strokeWidth?: string | number
  strokeLinecap: 'round' | 'square'
  icon?: Partial<ProgressIcons>
}

export interface RadioConfig {
  size: FormSize
}

export interface RateConfig {
  allowHalf: boolean
  clearable: boolean
  count: number
  icon: string
  size: FormSize
}

export interface ResultConfig {
  status: ResultStatus
  icon?: Partial<Record<ResultStatus, string | VNode>>
}

export interface RowConfig {
  wrap: boolean
}

export interface SelectConfig {
  borderless: boolean
  childrenKey: string
  clearIcon: string
  getKey: string | ((data: SelectData<any>) => any)
  labelKey: string
  overlayContainer?: PortalTargetType
  overlayMatchWidth: boolean
  size: FormSize
  suffix: string
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target?: PortalTargetType
  /**
   * @deprecated please use `getKey` instead'
   */
  valueKey?: string
}

export interface SkeletonConfig {
  animated: boolean
}

export interface SpaceConfig {
  size: number | string | [number | string, number | string] | SpaceSize
  wrap: boolean
}

export interface SpinConfig {
  icon?: string
  tip: string
  tipAlign: SpinTipAlignType
  size: SpinSize
  strokeWidth?: Partial<Record<SpinSize, number>>
  radius?: Partial<Record<SpinSize, number>>
}

export interface StatisticConfig {
  precision: number
  formatter: NumFormatter
}

export interface NumFormatted {
  value: string
  int: string
  decimal: string
}

export type NumFormatter = (value: string | number, precision: number) => NumFormatted

export interface StepperConfig {
  clickable: boolean
  labelPlacement: StepperLabelPlacement
  size: StepperSize
}

export interface SwitchConfig {
  size: FormSize
}

export interface TableConfig {
  autoHeight: boolean
  borderless: boolean
  childrenKey: string
  getKey: string | ((data: any) => any)
  /**
   * @deprecated please use `getKey` instead'
   */
  rowKey?: string
  size: TableSize

  extra: { icon: string }
  pagination: { position: TablePaginationPosition } & Partial<PaginationConfig>

  columnBase: TableColumnBaseConfig
  columnExpandable: TableColumnExpandableConfig
}

export interface TableColumnBaseConfig {
  align: TableColumnAlign
  filterable: { multiple: boolean; footer: true }
  sortable: { nextTooltip: boolean; orders: TableColumnSortOrder[] }
}

export interface TableColumnExpandableConfig {
  icon: string
}

export interface TagConfig {
  shape?: TagShape
}

export interface TagGroupConfig {
  gap: number | string
  wrap: boolean
}

export interface TextareaConfig {
  autoRows: boolean | TextareaAutoRows
  clearable: boolean
  clearIcon: string
  computeCount?: (value: string) => string
  maxCount?: number | string
  resize: TextareaResize
  size: FormSize
  showCount: boolean
}

export interface TimePickerConfig {
  borderless: boolean
  clearable: boolean
  clearIcon: string
  size: FormSize
  suffix: string
  overlayContainer?: PortalTargetType
  allowInput: boolean | 'overlay'
  format: string
}

export interface TransferConfig {
  getKey: string
  searchable?: boolean | { source: boolean; target: boolean }
  clearable: boolean
  clearIcon: string
  showSelectAll: boolean
}

export interface TooltipConfig {
  autoAdjust: boolean
  delay: number | [number | null, number | null]
  destroyOnHide: boolean
  placement: PopperPlacement
  target?: PortalTargetType
  trigger: PopperTrigger
}

export interface TreeConfig {
  blocked: boolean
  childrenKey: string
  expandIcon: string | [string, string]
  draggableIcon: string
  getKey: string | ((data: TreeNode<any>) => any)
  labelKey: string
  /**
   * @deprecated please use `labelKey` instead'
   */
  nodeKey?: string
  showLine: boolean
}

export interface TreeSelectConfig {
  borderless: boolean
  childrenKey: string
  clearIcon: string
  getKey: string | ((data: TreeNode<any>) => any)
  labelKey: string
  /**
   * @deprecated please use `labelKey` instead'
   */
  nodeKey?: string
  overlayMatchWidth: boolean
  overlayContainer?: PortalTargetType
  size: FormSize
  suffix: string
  /**
   * @deprecated please use `overlayContainer` instead'
   */
  target?: PortalTargetType
}

export interface UploadConfig {
  multiple: boolean
  dragable: boolean
  directory: boolean
  name: string
  withCredentials: boolean
  requestMethod: UploadRequestMethod
  customRequest?: (option: UploadRequestOption) => { abort: () => void }
}

export interface UploadFilesConfig {
  type: UploadFilesType
  icon: Partial<Record<UploadIconType, string | VNode>>
}
