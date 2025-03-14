/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, mergeProps, normalizeClass } from 'vue'

import { isObject } from 'lodash-es'

import { callEmit } from '@idux/cdk/utils'
import { IxLayoutHeader } from '@idux/components/layout'
import { IxMenu, type MenuClickOptions, type MenuProps } from '@idux/components/menu'

import { proLayoutToken } from '../token'
import { getDefaultPaths } from '../utils/menu'

export default defineComponent({
  name: 'ProLayoutHeader',
  setup() {
    const { props, slots, mergedPrefixCls, setActiveKey, headerMenus, activeHeaderKey } = inject(proLayoutToken)!

    const theme = computed(() => {
      const { theme } = props
      return isObject(theme) ? theme.header : theme
    })

    const fixed = computed(() => {
      const { fixed } = props
      return isObject(fixed) ? fixed.header : fixed
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-header`
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-${theme.value}`]: true,
        [`${prefixCls}-fixed`]: fixed.value,
      })
    })

    const menuSelectedKeys = computed(() => (activeHeaderKey.value ? [activeHeaderKey.value] : []))
    const onMenuClick = (menuClickOption: MenuClickOptions) => {
      if (props.type === 'both') {
        const targetMenu = props.menus.find(menu => menu.key === menuClickOption.key)
        if (targetMenu && 'children' in targetMenu && !!targetMenu.children?.length) {
          const activePaths = getDefaultPaths(targetMenu.children)
          setActiveKey(activePaths.pop()!.key!)
          callEmit(props['onMenuClick'], { ...menuClickOption, type: targetMenu.type })
          return
        }
      }
      if (menuClickOption.type === 'item') {
        setActiveKey(menuClickOption.key)
      }
      callEmit(props['onMenuClick'], menuClickOption)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-header`

      const menuProps = mergeProps(
        {
          overlayClassName: `${prefixCls}-menu-overlay`,
          dataSource: headerMenus.value,
          selectedKeys: menuSelectedKeys.value,
          mode: 'horizontal',
          theme: theme.value,
          onClick: onMenuClick,
        } as MenuProps,
        props.headerMenu!,
      )

      const contentNode = slots.headerContent ? (
        slots.headerContent(menuProps)
      ) : (
        <IxMenu v-slots={slots} {...menuProps} />
      )

      return (
        <IxLayoutHeader class={classes.value}>
          {slots.logo && <div class={`${prefixCls}-logo`}>{slots.logo()}</div>}
          <div class={`${prefixCls}-content`}>{contentNode}</div>
          {slots.headerExtra && <div class={`${prefixCls}-extra`}>{slots.headerExtra()}</div>}
        </IxLayoutHeader>
      )
    }
  },
})
