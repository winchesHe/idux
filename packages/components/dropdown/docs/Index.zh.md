---
category: components
type: 导航
title: Dropdown
subtitle: 下拉菜单
order: 0
---

## API

### IxDropdown

#### DropdownProps

| 名称 | 说明 | 类型  | 默认值 | 全局配置 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `v-model:visible` | 菜单是否显示 | `boolean` | - | - | - |
| `autoAdjust` | 悬浮层被遮挡时自动调整位置 | `boolean` | `true` | ✅ | - |
| `destroyOnHide` | 隐藏时是否销毁浮层 | `boolean` | `false` | ✅ | - |
| `disabled` | 菜单是否禁用 | `boolean` | `false` | - | - |
| `hideOnClick` | 点击后是否隐藏菜单 | `boolean` | `true` | - | - |
| `offset` | 悬浮层位置偏移量 | `[number, number]` | `[0,8]` | ✅ | - |
| `overlayContainer` | 自定义下拉框容器节点  | `string \| HTMLElement \| () => string \| HTMLElement` | - | ✅ | - |
| `placement` | 悬浮层的对齐方式 | `PopperPlacement` | `'bottomStart'` | ✅ | - |
| `showArrow` | 是否显示箭头 | `boolean` | `false` | ✅ | - |
| `trigger` | 悬浮层触发方式 | `PopperTrigger` | `hover` | ✅ | - |

#### DropdownSlots

| 名称 | 说明 | 参数类型 | 备注 |
| --- | --- | --- | --- |
| `overlay` | 悬浮菜单, 传入一个 `IxMenu` 组件 | - | - |

<!--- insert less variable begin  --->
## 主题变量

| 名称 | default | seer | 备注 |
| --- | --- | --- | --- |
| `@dropdown-menu-item-height` | `@height-md` | - | - |
| `@dropdown-menu-item-margin` | `0` | - | - |
| `@dropdown-overlay-arrow-color` | `@background-color-component` | - | - |
| `@dropdown-overlay-zindex` | `@menu-overlay-zindex` | - | - |
| `@dropdown-overlay-min-width` | `@menu-overlay-min-width` | - | - |
| `@dropdown-overlay-background-color` | `@menu-background-color` | - | - |
| `@dropdown-overlay-border-radius` | `@menu-overlay-border-radius` | - | - |
| `@dropdown-overlay-box-shadow` | `@menu-overlay-box-shadow` | - | - |
<!--- insert less variable end  --->