<template>
  <IxProLayout v-model:activeKey="activeKey" :menus="dataSource">
    <template #itemLabel="item">
      <router-link to="#pro-layout-demo-Basic">{{ item.label }}</router-link>
    </template>
    <template #logo>
      <div class="logo">Logo</div>
    </template>
    <div class="content">
      <div>Currently active is: {{ activeKey }}</div>
    </div>
  </IxProLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type MenuData } from '@idux/components/menu'

const activeKey = ref()
const dataSource: MenuData[] = [
  {
    type: 'sub',
    key: 'sub1',
    icon: 'setting',
    label: 'Sub Menu 1',
    children: [
      { type: 'item', key: 'item4', label: 'Item 4', icon: 'setting' },
      { type: 'item', key: 'item5', label: 'Item 5', icon: 'setting' },
      { type: 'divider', key: 'divider2' },
      {
        type: 'sub',
        key: 'sub2',
        icon: 'setting',
        label: 'Menu Sub 2',
        children: [
          { type: 'item', key: 'item6', label: 'Item 6' },
          { type: 'item', key: 'item7', label: 'Item 7' },
        ],
      },
      {
        type: 'sub',
        key: 'sub3',
        icon: 'setting',
        label: 'Menu Sub 3',
        children: [
          { type: 'item', key: 'item8', label: 'Item 8' },
          { type: 'item', key: 'item9', label: 'Item 9' },
        ],
      },
    ],
  },
  {
    type: 'sub',
    key: 'sub4',
    icon: 'github',
    label: 'Menu Sub 4',
    children: [
      { type: 'item', key: 'item10', label: 'Item 10' },
      { type: 'item', key: 'item11', label: 'Item 11' },
    ],
  },
  { type: 'item', key: 'item2', icon: 'mail', label: 'Item 2' },
]
</script>

<style lang="less" scoped>
.logo {
  padding-left: 24px;
  font-weight: bold;
  font-size: 24px;
}

.content {
  padding: 24px;
  line-height: 24px;
}
</style>
