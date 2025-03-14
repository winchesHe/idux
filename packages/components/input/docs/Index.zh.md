---
category: components
type: 数据录入
title: Input
subtitle: 输入框
---

## API

### IxInput

#### InputProps

> 除以下表格之外还支持原生 `input` 元素的[所有属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:value` | 控件值 | `string` | - | - | 使用 `control` 时，此配置无效 |
| `control` | 控件控制器 | `string \| number \| AbstractControl` | - | - | 配合 `@idux/cdk/forms` 使用, 参考 [Form](/components/form/zh) |
| `addonAfter` | 设置后置标签 | `string \| #addonAfter` | - | - | - |
| `addonBefore` | 设置前置标签 | `string \| #addonBefore` | - | - | - |
| `borderless` | 是否显示边框 | `boolean` | `false` | ✅ | - |
| `clearable` | 是否显示清除图标 | `boolean` | `false` | ✅ | - |
| `clearIcon` | 设置清除图标 | `string \| #clearIcon` | `'close-circle'` | ✅ | - |
| `disabled` | 是否禁用状态 | `boolean` | `false` | - | 使用 `control` 时，此配置无效 |
| `prefix` | 设置前缀图标 | `string \| #prefix` | - | - | - |
| `readonly` | 是否只读状态 | `boolean` | `false` | - | - |
| `size` | 设置大小 | `'sm' \| 'md' \| 'lg'` | `'md'` | ✅ | - |
| `suffix` | 设置后缀图标 | `string \| #suffix` | - | - | - |
| `trim` | 失去焦点后自动去除前后空格  | `boolean` | `false` | - | - |
| `onChange` | 值发生改变后的回调 | `(value: string, oldValue: string) => void` | - | - | - |
| `onClear` | 清除图标被点击后的回调 | `(evt: MouseEvent) => void` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@input-font-size-sm` | `@form-font-size-sm` | - | - |
| `@input-font-size-md` | `@form-font-size-md` | - | - |
| `@input-font-size-lg` | `@form-font-size-lg` | - | - |
| `@input-line-height` | `@form-line-height` | - | - |
| `@input-height-sm` | `@form-height-sm` | - | - |
| `@input-height-md` | `@form-height-md` | - | - |
| `@input-height-lg` | `@form-height-lg` | - | - |
| `@input-padding-horizontal-sm` | `@form-padding-horizontal-sm` | `12px` | - |
| `@input-padding-horizontal-md` | `@form-padding-horizontal-md` | `12px` | - |
| `@input-padding-horizontal-lg` | `@form-padding-horizontal-lg` | `12px` | - |
| `@input-padding-vertical-sm` | `@form-padding-vertical-sm` | `2px` | - |
| `@input-padding-vertical-md` | `@form-padding-vertical-md` | `6px` | - |
| `@input-padding-vertical-lg` | `@form-padding-vertical-lg` | `8px` | - |
| `@input-addon-margin-with-selector-sm` | `-(@input-padding-vertical-sm + 1) -@input-padding-horizontal-sm` | - | - |
| `@input-addon-margin-with-selector-md` | `-(@input-padding-vertical-md + 1) -@input-padding-horizontal-md` | - | - |
| `@input-addon-margin-with-selector-lg` | `-(@input-padding-vertical-lg + 1) -@input-padding-horizontal-lg` | - | - |
| `@input-border-width` | `@form-border-width` | - | - |
| `@input-border-style` | `@form-border-style` | - | - |
| `@input-border-color` | `@form-border-color` | - | - |
| `@input-border-radius` | `@border-radius-sm` | - | - |
| `@input-color` | `@form-color` | - | - |
| `@input-color-secondary` | `@form-color-secondary` | - | - |
| `@input-background-color` | `@form-background-color` | - | - |
| `@input-placeholder-color` | `@form-placeholder-color` | - | - |
| `@input-hover-color` | `@form-hover-color` | - | - |
| `@input-active-color` | `@form-active-color` | - | - |
| `@input-active-box-shadow` | `@form-active-box-shadow` | - | - |
| `@input-disabled-color` | `@form-disabled-color` | - | - |
| `@input-disabled-background-color` | `@form-disabled-background-color` | - | - |
| `@input-icon-color` | `@form-icon-color` | - | - |
| `@input-icon-hover-color` | `@form-icon-hover-color` | - | - |
| `@input-icon-font-size` | `@font-size-lg` | - | - |
| `@input-clear-icon-line-height` | `@font-size-xl` | `@font-size-lg + 2` | - |
| `@input-addon-background-color` | `@background-color-base` | `@color-graphite-l50` | - |
| `@input-wrapper-inner-margin` | `@spacing-xs` | - | - |
<!--- insert less variable end  --->