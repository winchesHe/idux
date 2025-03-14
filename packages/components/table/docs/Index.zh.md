---
category: components
type: 数据展示
title: Table
subtitle: 表格
order: 0
---

## API

### IxTable

#### TableProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:expandedRowKeys` | 展开行的 `key` 数组 | `(string \| number)[]` | - | - | - |
| `v-model:selectedRowKeys` | 选中行的 `key` 数组 | `(string \| number)[]` | - | - | - |
| `autoHeight` | 是否自适应高度 | `boolean` | `false` | ✅ | - |
| `borderless` | 是否无边框 | `boolean` | `true` | ✅ | - |
| `childrenKey` | 指定树形结构的 `key` | `string` | `children` | ✅ | - |
| `columns` | 表格列的配置描述 | `TableColumn[]` | - | - |  参见[TableColumn](#TableColumn)  |
| `customAdditional` | 自定义表格行和单元格的额外属性 | `TableCustomAdditional` | - | - | 参见[TableCustomAdditional](#TableCustomAdditional) |
| `dataSource` | 表格数据数组 | `object[]` | - | - | - |
| `ellipsis` | 超过宽度将自动省略 | `boolean \| { title: boolean }` | `false` | - | `title` 为 `false` 时, 不显示原生的 `title` |
| `empty` | 空数据时的内容 | `string \| EmptyProps \| #empty` | - | - | - |
| `getKey` | 获取数据的唯一标识 | `string \| (record: any) => VKey` | `key` | ✅ | - |
| `headless` | 是否隐藏表头 | `boolean` | `false` | - |- |
| `pagination` | 配置分页器, 参见[TablePagination](#TablePagination) | `boolean \| TablePagination` | - | ✅ | 设置 `false` 时表示不显示分页 |
| `scroll` | 表格滚动配置项，可以指定滚动区域的宽、高, 参见[TableScroll](#TableScroll) | `TableScroll` | - | - | - |
| `size` | 表格大小 | `'lg' \| 'md' \| 'sm'` | `md` | ✅ |- |
| `spin` | 表格是否加载中 | `boolean \| SpinProps` | - | - | - |
| `tableLayout` | 表格元素的 [table-layout](https://developer.mozilla.org/zh-CN/docs/Web/CSS/table-layout) 属性 | `'auto' \| 'fixed'` | - | - | 固定表头/列或设置了 `column.ellipsis` 时，默认值为 `fixed` |
| `virtual` | 是否开启虚拟滚动 | `boolean` | `false` | - | 需要设置 `scroll.y` |
| `onScroll` | 滚动事件 | `(evt: Event) => void` | - | - | - |
| `onScrolledChange` | 滚动的位置发生变化 | `(startIndex: number, endIndex: number, visibleNodes: TreeNode[]) => void` | - | - | 仅 `virtual` 模式下可用 |
| `onScrolledBottom` | 滚动到底部时触发 | `() => void` | - | - | 仅 `virtual` 模式下可用 |

#### TableColumn

表格列的配置描述，`T` 为 `dataSource` 的数据类型, `V` 为对应列的值类型。

```ts
export type TableColumn<T = any, V = any> =
  | TableColumnBase<T, V>
  | TableColumnExpandable<T, V>
  | TableColumnSelectable<T>
```

#### 通用配置。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `align` | 文本对齐方式 | `'start' \| 'center' \| 'end'` | `'start'` | ✅ | - |
| `colSpan` | 计算列的 `colSpan` | `(record: T, rowIndex: number) => number` | - | - | 返回为 `0` 时，不渲染, 通常用于列合并 |
| `fixed` | 是否固定 | `'start' \| 'end'` | - | - | - |
| `rowSpan` | 计算列的 `rowSpan` | `(record: T, rowIndex: number) => number` | - | - | 返回为 `0` 时，不渲染, 通常用于行合并 |
| `titleColSpan` | 设置表头的 `colSpan` | - | - | - | 为 `0` 时，不渲染 |
| `width` | 列宽度 | `string \| number` | - | - | - |

##### TableColumnBase

普通列配置的属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `key` | 表格列 `key` 的取值 | `string \| number` | - | - | 默认为 `dataKey` 或者 `type` |
| `children` | 子列的配置项 | `TableColumnBase[]` | - | - | 用于设置分组表头 |
| `dataKey` | 数据在数据项中对应的路径 | `string \| string[]` | - | - | 支持通过数组查询嵌套路径 |
| `ellipsis` | 超过宽度将自动省略 | `boolean` | - | - | 优先级高于 `props` 中的 `ellipsis` |
| `sortable` | 是否可排序, 参见[TableColumnSortable](#TableColumnSortable) | `TableColumnSortable` | - | - | - |
| `title` | 列头的文本 | `string` | - | - | - |
| `customCell` | 自定义单元格内容 | `string \| ((data: { value: V; record: T; rowIndex: number }) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |
| `customTitle` | 自定义表头标题 | `string \| ((data: { title?: string }) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

##### TableColumnExpandable

可展开列配置的属性, 继承 `TableColumnBase`。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 列类型 | `'expandable'` | - | - | 必填 |
| `disabled` |  设置是否允许行展开 | `(record:T) => boolean` | - | - | - |
| `icon` | 展开按钮图标 | `string` | `'right'` | ✅ | - |
| `indent` | 展示树形数据时，每层缩进的宽度 | `number` | `12` | - | - |
| `trigger` | 不通过图标，触发行展开的方式 | `'click' \| 'doubleClick'` | - | - | - |
| `onChange` | 展开状态发生变化时触发 | `(expendedRowKeys: (string \| number)[], expendedRecords: T[]) => void` | - | - | - |
| `onExpand` | 点击展开图标，或通过 `trigger` 触发 | `(expanded: boolean, record: T) => void` | - | - | - |
| `customExpand` | 自定义展开内容 | `string \| ((data: { record: T; rowIndex: number }) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |
| `customIcon` | 自定义展开图标 | `string \| ((data: { expanded: boolean; record: T }) => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

##### TableColumnSelectable

可选择列配置的属性。

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `type` | 列类型 | `'selectable'` | - | - | 必填 |
| `disabled` |  设置是否允许行选择 | `(record: T, rowIndex: number) => boolean` | - | - | - |
| `multiple` | 是否支持多选 | `boolean` | `true` | - | - |
| `menus` | 自定义列头下拉菜单 | `('all' \| 'invert' \| 'none' \| 'pageInvert' \| MenuData)[]` | - | - | - |
| `trigger` | 不通过点击选择框，触发行选择的方式 | `'click' \| 'doubleClick'` | - | - | - |
| `onChange` | 选中状态发生变化时触发 | `(selectedRowKeys: (string \| number)[], selectedRecords: T[]) => void` | - | - | - |
| `onMenuClick` | 点击下拉菜单时触发 | `(options: MenuClickOptions, currentPageRowKeys: VKey[]) => void` | - | - | 如果点击时预设的值, 则不会触发该回调（例如：`all`, 那么触发的是 `onSelectAll`） |
| `onSelect` | 点击选择框，或通过 `trigger` 触发 | `(selected: boolean, record: T) => void` | - | - | - |
| `onSelectAll` | 点击全选所有时触发 | `(selectedRowKeys: (string \| number)[]) => void` | - | - | - |
| `onSelectInvert` | 点击反选所有时触发 | `(selectedRowKeys: (string \| number)[]) => void` | - | - | - |
| `onSelectNone` | 点击清空所有时触发 | `() => void` | - | - | - |
| `onSelectPageInvert` | 点击反选当页所有时触发 | `() => void` | - | - | - |

##### TableColumnSortable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `nextTooltip` | 是否显示下一次排序的 `tooltip` 提示 | `boolean` | `false` | ✅ | - |
| `multiple` | 排序优先级 | `number` | - | - | 设置后，支持多列排序 |
| `orderBy` | 当前排序规则 | `'ascend' \| 'descend'` | - | - | - |
| `orders` | 支持的排序方式 | `Array<'ascend' \| 'descend'>` | `['ascend', 'descend']` | ✅ | - |
| `sorter` | 本地模式下，排序的运行函数 | `(curr: T, next: T) => number` | - | - | 参考 [`Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) |
| `onChange` | 排序规则改变后的回调 | `(currOrderBy?: TableColumnSortOrder) => void` | - | - | 通常用于受控模式或服务端排序 |

##### TableColumnFilterable

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `filter` | 本地模式下的筛选函数 | `(currFilterBy: VKey[], record: T) => boolean` | - | - | - |
| `filterBy` | 当前激活的筛选项 | `VKey[]` | - | - | - |
| `footer` | 是否显示页脚 | `boolean` | `false` | ✅ | - |
| `menus` | 删选菜单 | `MenuData[]` | - | - | - |
| `multiple` | 是否支持多选 | `boolean` | `true` | - | - |
| `onChange` | 筛选规则改变后的回调 | `(currFilterBy: any[]) => void` | - | - | 通常用于受控模式或服务端筛选 |
| `customTrigger` | 自定义展开内容 | `string \| () => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |
| `customMenu` | 自定义表头标题 | `string \| () => VNodeChild)` | - | - | 类型为 `string` 时，对应插槽名 |

#### TableCustomAdditional

```ts
export interface TableCustomAdditional<T = any> {
  bodyCell: (data: { column: TableColumn<T>; record: T; rowIndex: number }) => Record<string, any> | undefined
  bodyRow: (data: { record: T; rowIndex: number }) => Record<string, any> | undefined
  headCell: (data: { column: TableColumn<T> }) => Record<string, any> | undefined
  headRow: (data: { columns: TableColumn<T>[] }) => Record<string, any> | undefined
}

```

参考示例：[斑马纹表格](#components-table-demo-CustomAdditional), 返回值可以是任意的原生 dom 属性或者事件。

#### TablePagination

```ts
export interface TablePagination extends PaginationProps {
  position: TablePaginationPosition
}
export type TablePaginationPosition = 'topStart' | 'top' | 'topEnd' | 'bottomStart' | 'bottom' | 'bottomEnd'
```

#### TableScroll

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `width` | 设置横向滚动，用于指定滚动区域的宽 | `string \| number` | - | - | 可以设置为像素值，百分比， `max-content` 和 `auto` |
| `height` | 设置纵向滚动，用于指定滚动区域的高 | `string \| number` | - | - | 可以设置为像素值,当开启虚拟滚动时，必须为 `number` |
| `fullHeight` | 是否使用 `height` 设置滚动区域高度 | `boolean` | - | - | 为 `true` 时使用 `height`, 否则使用 `max-height` 设置滚动区域的高度 |

#### TableSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `alert` | 表格提示 | - | - |
| `footer` | 表格尾部 | - | - |
| `header` | 表格头部 | - | - |
| `summary` | 表格总结栏 | - | - |

#### TableMethods

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `scrollTo` | 滚动到指定位置 | `(option?: number \| VirtualScrollToOptions) => void` | 仅 `virtual` 模式下可用 |

### IxTableColumn

在 `template` 中描述 `columns` 的语法糖。

```html
<template>
  <IxTable :dataSource="data">
    <IxTableColumn title="Name" dataKey="name">
      <template #title="{ title }">
        <h1>{{ title }}</h1>
      </template>
      <template #cell="{ value }">
        <a>{{ value }}</a>
      </template>
    </IxTableColumn>
    <IxTableColumn type="expandable">
      <template #expand="{ record }">
        <span>{{ record.description }}</span>
      </template>
    </IxTableColumn>
  </IxTable>
</template>
```

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@table-color` | `@text-color` | - | - |
| `@table-head-line-height` | `@line-height-base` | `1` | - |
| `@table-body-line-height` | `@line-height-base` | `1.084` | - |
| `@table-head-height-lg` | `@height-xxl` | `@height-lg` | - |
| `@table-head-height-md` | `@height-xl` | `@height-md` | - |
| `@table-head-height-sm` | `@height-md` | `@height-sm` | - |
| `@table-padding-top-lg` | `@spacing-lg` | - | - |
| `@table-padding-bottom-lg` | `@spacing-lg` | - | - |
| `@table-padding-left-lg` | `@spacing-lg` | - | - |
| `@table-padding-right-lg` | `@spacing-lg` | `@spacing-md` | - |
| `@table-padding-top-md` | `@spacing-md` | - | - |
| `@table-padding-bottom-md` | `@spacing-md` | - | - |
| `@table-padding-left-md` | `@spacing-md` | - | - |
| `@table-padding-right-md` | `@spacing-md` | - | - |
| `@table-padding-top-sm` | `@spacing-sm` | - | - |
| `@table-padding-bottom-sm` | `@spacing-sm` | - | - |
| `@table-padding-left-sm` | `@spacing-sm` | - | - |
| `@table-padding-right-sm` | `@spacing-sm` | `@spacing-md` | - |
| `@table-font-size-lg` | `@font-size-lg` | `@font-size-md` | - |
| `@table-font-size-md` | `@font-size-md` | `@font-size-sm` | - |
| `@table-font-size-sm` | `@font-size-sm` | - | - |
| `@table-border-width` | `@border-width-sm` | - | - |
| `@table-border-style` | `@border-style` | `@border-style` | - |
| `@table-border-color` | `@border-color-split` | `@color-graphite-l30` | - |
| `@table-background-color` | `@background-color-component` | - | - |
| `@table-border-radius` | `@border-radius-sm` | - | - |
| `@table-head-background-color` | `@background-color-light` | `@color-graphite-l50` | - |
| `@table-head-color` | `@color-black` | `@color-graphite-d20` | - |
| `@table-head-split-height` | `16px` | - | - |
| `@table-head-split-color` | `rgba(0, 0, 0, 0.06)` | - | - |
| `@table-head-icon-color` | `@color-black` | `@color-graphite-l10` | - |
| `@table-head-icon-active-color` | `@color-primary` | - | - |
| `@table-head-icon-hover-background-color` | `@color-graphite-l40` | - | - |
| `@table-head-font-weight` | `@font-weight-lg` | `@font-weight-md` | - |
| `@table-body-hover-background` | `@background-color-light` | `@color-graphite-l50` | - |
| `@table-pagination-margin` | `@spacing-lg 0` | - | - |
| `@table-icon-margin` | `@spacing-xs` | - | - |
| `@table-filterable-trigger-font-size` | `@font-size-md` | `@font-size-sm` | - |
| `@table-expandable-icon-size` | `@font-size-lg` | `@font-size-md` | - |
| `@table-expandable-icon-color` | `@color-black` | `@color-graphite` | - |
| `@table-sticky-scroll-bar-background` | `fade(#000, 35%)` | - | - |
| `@table-sticky-scroll-bar-radius` | `4px` | - | - |
<!--- insert less variable end  --->