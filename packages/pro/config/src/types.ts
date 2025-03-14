/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { PortalTargetType } from '@idux/cdk/portal'
import type { ProFormSchemaFormatter } from '@idux/pro/form'
import type { ProLocale } from '@idux/pro/locales'
import type { ProTableColumnIndexable } from '@idux/pro/table'
import type { Options as AjvOptions } from 'ajv'
import type { Component, VNode } from 'vue'

export interface ProGlobalConfig {
  common: ProCommonConfig
  locale: ProLocale

  form: ProFormConfig
  table: ProTableConfig
  tree: ProTreeConfig
  search: ProSearchConfig
}

export type ProGlobalConfigKey = keyof ProGlobalConfig

export interface ProCommonConfig {
  prefixCls: string
}

interface ProFormConfigFormatComponent {
  component?: string | Component
  componentProps?: any
}

export interface ProFormConfig {
  /**
   * [ajv](https://ajv.js.org/options.html) 参数
   */
  ajvOptions: AjvOptions
  autoId: boolean
  autoLabelFor: boolean
  /**
   * 根据 format 字段渲染的组件
   *
   * @example { 'date': { component: IxDatePicker, componentProps: { format: 'dd/MM/yyyy' }}}
   */
  formatComponents: {
    default?: ProFormConfigFormatComponent
    data?: ProFormConfigFormatComponent
    time?: ProFormConfigFormatComponent
    'date-time'?: ProFormConfigFormatComponent
    uri?: ProFormConfigFormatComponent
    email?: ProFormConfigFormatComponent
    ipv4?: ProFormConfigFormatComponent
    ipv6?: ProFormConfigFormatComponent
    [key: string]: ProFormConfigFormatComponent | undefined
  }
  /**
   * 忽略某些数据类型 (type) 的校验, 默认：['type', 'enum']
   */
  ignoreKeywords: string[]

  schemaFormatter: ProFormSchemaFormatter
}

export interface ProTableConfig {
  columnIndexable: Omit<ProTableColumnIndexable, 'type'>
}

export interface ProTreeConfig {
  clearIcon: string
  collapseIcon: [string, string]
}

export interface ProSearchConfig {
  clearable: boolean
  clearIcon: string | VNode
  searchIcon: string | VNode
  overlayContainer?: PortalTargetType
}
