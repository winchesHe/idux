/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePickerSearchField, PanelRenderContext, Segment } from '../types'
import type { DateConfig } from '@idux/components/config'

import DatePickerPanel from '../panel/DatePickerPanel'

const defaultFormat = {
  date: 'yyyy-MM-dd',
  week: 'RRRR-II',
  month: 'yyyy-MM',
  quarter: "yyyy-'Q'Q",
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
} as const
const defaultType = 'date'

export function createDatePickerSegment(
  prefixCls: string,
  searchField: DatePickerSearchField,
  dateConfig: DateConfig,
): Segment<Date | undefined> {
  const {
    fieldConfig: { type, cellTooltip, disabledDate, timePanelOptions },
    defaultValue,
    inputClassName,
  } = searchField

  const panelRenderer = (context: PanelRenderContext<Date | undefined>) => {
    const { value, setValue, cancel, ok } = context

    return (
      <DatePickerPanel
        panelType="datePicker"
        value={value}
        cellTooltip={cellTooltip}
        disabledDate={disabledDate}
        type={type ?? defaultType}
        timePanelOptions={timePanelOptions}
        onChange={setValue as ((value: Date | Date[] | undefined) => void) | undefined}
        onConfirm={ok}
        onCancel={cancel}
      />
    )
  }

  return {
    name: searchField.type,
    inputClassName: [inputClassName, `${prefixCls}-date-picker-segment-input`],
    defaultValue,
    parse: input => parseInput(input, dateConfig, searchField),
    format: value => formatValue(value, dateConfig, searchField),
    panelRenderer,
  }
}

function parseInput(input: string, dateConfig: DateConfig, searchField: DatePickerSearchField): Date | undefined {
  const {
    fieldConfig: { format, type },
  } = searchField
  const _format = format ?? defaultFormat[type ?? defaultType]
  const date = dateConfig.parse(input, _format)
  return dateConfig.isValid(date) ? date : undefined
}

function formatValue(value: Date | undefined, dateConfig: DateConfig, searchField: DatePickerSearchField): string {
  const {
    fieldConfig: { format, type },
  } = searchField
  const _format = format ?? defaultFormat[type ?? defaultType]
  return value ? dateConfig.format(value, _format) : ''
}
