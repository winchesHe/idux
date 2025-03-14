---
category: components
type: 导航
title: Stepper
subtitle: 步骤条
---

## API

### IxStepper

#### StepperProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`v-model:activeKey` | 当前的激活节点的 `key` | `VKey` | - | - | - |
`clickable` | 是否可点击 | `boolean` | `false` | - | - |
`dot` | 是否为点状步骤条 | `boolean \| #dot={key, status}` | `false` | - | - |
`labelPlacement` | 指定文本信息放置的位置 | `'end' \| 'bottom'` | `'end'` | -| - |
`percent` | 当前激活节点的进度 | `number` | - | - | 取值是 0-100 |
`size` | 指定节点的大小 | `'md' \| 'sm'` | `'md'` | ✅ | - |
`status` | 指定节点的状态 | `'process' \| 'finish' \| 'wait' \| 'error'` | `process` | - | - |

### IxStepperItem

#### StepperItemProps

| 名称 | 说明 | 类型 | 默认值 | 全局配置 | 备注 |
| ---| --- | --- | --- | --- | --- |
`key` | 节点的唯一标识 | `VKey` | - | - | 默认为 `index + 1` |
`description` | 描述信息 | `string \| #description` | - | - | - |
`disabled` | 禁用状态 | `true \| false` | `false` | - | - |
`icon` | 每个节点的图标 | `string \| #icon={key, status}` | - | - | - |
`status` | 当前节点的状态 | `'process' \| 'finish' \| 'wait' \| 'error'` | - | - | 默认会根据激活节点来自动设置 |
`title` | 标题 | `string \| #title` | - | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@stepper-background` | `@background-color-component` | - | - |
| `@stepper-line-border` | `1px solid transparent` | `1px dashed transparent` | - |
| `@stepper-item-process-tail-color` | `@disabled-color` | - | - |
| `@stepper-item-process-icon-color` | `@color-primary` | - | - |
| `@stepper-item-process-title-color` | `@text-color` | `@color-graphite-d40` | - |
| `@stepper-item-process-description-color` | `@text-color` | `@color-graphite` | - |
| `@stepper-item-finish-tail-color` | `@color-primary` | - | - |
| `@stepper-item-finish-icon-color` | `@color-primary` | - | - |
| `@stepper-item-finish-title-color` | `@text-color` | `@color-graphite-d40` | - |
| `@stepper-item-finish-description-color` | `@text-color-secondary` | `@color-graphite` | - |
| `@stepper-item-wait-tail-color` | `@disabled-color` | - | - |
| `@stepper-item-wait-icon-color` | `@disabled-color` | - | - |
| `@stepper-item-wait-title-color` | `@text-color-secondary` | `@color-graphite` | - |
| `@stepper-item-wait-description-color` | `@text-color-secondary` | `@color-graphite` | - |
| `@stepper-item-error-tail-color` | `@stepper-item-wait-tail-color` | - | - |
| `@stepper-item-error-icon-color` | `@color-error` | `@color-error-d10` | - |
| `@stepper-item-error-title-color` | `@color-error` | `@text-color` | - |
| `@stepper-item-error-description-color` | `@color-error` | `@text-color` | - |
| `@stepper-item-spacing-md` | `@spacing-lg` | - | - |
| `@stepper-item-icon-size-md` | `32px` | - | - |
| `@stepper-item-icon-font-size-md` | `@font-size-lg` | - | - |
| `@stepper-item-icon-margin-md` | `0 8px 0 0` | - | - |
| `@stepper-item-title-font-size-md` | `@font-size-lg` | - | - |
| `@stepper-item-description-font-size-md` | `@font-size-md` | - | - |
| `@stepper-item-spacing-sm` | `@spacing-md` | - | - |
| `@stepper-item-icon-size-sm` | `24px` | - | - |
| `@stepper-item-icon-font-size-sm` | `@font-size-md` | - | - |
| `@stepper-item-icon-margin-sm` | `0 8px 0 0` | - | - |
| `@stepper-item-title-font-size-sm` | `@font-size-md` | - | - |
| `@stepper-item-font-weight` | `500` | - | - |
| `@stepper-item-description-font-size-sm` | `@font-size-sm` | - | - |
| `@stepper-item-content-min-height-md` | `80px` | - | - |
| `@stepper-item-content-min-height-sm` | `60px` | - | - |
<!--- insert less variable end  --->