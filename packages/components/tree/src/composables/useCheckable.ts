/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CheckStrategy, TreeNode, TreeProps } from '../types'
import type { MergedNode } from './useDataSource'
import type { ComputedRef, WritableComputedRef } from 'vue'

import { computed } from 'vue'

import { isNil } from 'lodash-es'

import { VKey, callEmit, useControlledProp } from '@idux/cdk/utils'

import { callChange, getChildrenKeys, getParentKeys } from '../utils'

export interface CheckableContext {
  checkedKeys: WritableComputedRef<VKey[]>
  allCheckedKeys: ComputedRef<VKey[]>
  checkDisabledKeys: ComputedRef<VKey[]>
  indeterminateKeys: ComputedRef<VKey[]>
  handleCheck: (node: MergedNode) => void
}

export function useCheckable(props: TreeProps, mergedNodeMap: ComputedRef<Map<VKey, MergedNode>>): CheckableContext {
  const [checkedKeys, setCheckedKeys] = useControlledProp(props, 'checkedKeys', () => [])

  const checkDisabledKeys = computed(() => {
    const disabledKeys: VKey[] = []
    if (props.checkable) {
      mergedNodeMap.value.forEach((node, key) => {
        if (node.checkDisabled) {
          disabledKeys.push(key)
        }
      })
    }
    return disabledKeys
  })

  // allCheckedKeys控制勾选框的勾选状态，checkedKeys控制回调的返回值
  const allCheckedKeys = computed(() => {
    if (props.cascade) {
      return findAllCheckedKeys(mergedNodeMap.value, checkedKeys.value, checkDisabledKeys.value)
    } else {
      return checkedKeys.value
    }
  })

  const indeterminateKeys = computed(() => {
    const _checkedKeys = allCheckedKeys.value
    if (_checkedKeys.length === 0 || !props.cascade) {
      return []
    }

    const indeterminateKeySet = new Set<VKey>()
    const disabledKeys = checkDisabledKeys.value
    const nodeMap = mergedNodeMap.value
    _checkedKeys.forEach(key => {
      const { parentKey } = nodeMap.get(key) || {}
      if (!isNil(parentKey)) {
        let parent = nodeMap.get(parentKey)
        if (parent && !_checkedKeys.includes(parent.key)) {
          if (!disabledKeys.includes(parentKey)) {
            indeterminateKeySet.add(parentKey)
          }
          while (parent && !isNil(parent.parentKey)) {
            if (!disabledKeys.includes(parent.parentKey)) {
              indeterminateKeySet.add(parent.parentKey)
            }
            parent = nodeMap.get(parent.parentKey)
          }
        }
      }
    })
    return [...indeterminateKeySet]
  })

  const handleCheck = (node: MergedNode) => {
    const currKey = node.key
    const nodeMap = mergedNodeMap.value
    const disabledKeys = checkDisabledKeys.value
    const childrenKeys = props.cascade ? getChildrenKeys(node, disabledKeys) : []
    const index = allCheckedKeys.value.indexOf(currKey)
    const checked = index > -1
    let tempKeys = [...allCheckedKeys.value]

    if (
      checked ||
      (childrenKeys.length &&
        childrenKeys.every(key => tempKeys.includes(key) || indeterminateKeys.value.includes(key)))
    ) {
      const parentKeys = props.cascade ? getParentKeys(nodeMap, node, disabledKeys) : []
      tempKeys.splice(index, 1)
      tempKeys = tempKeys.filter(key => !parentKeys.includes(key) && !childrenKeys.includes(key))
    } else {
      tempKeys.push(currKey)
      props.cascade && setParentChecked(nodeMap, node, tempKeys, disabledKeys)
      tempKeys.push(...childrenKeys)
    }

    tempKeys = [...new Set(tempKeys)]

    if (props.cascade) {
      tempKeys = processAllCheckedKeysByCheckStrategy(nodeMap, tempKeys, disabledKeys, props.checkStrategy)
    }

    handleChange(checked, node.rawNode, tempKeys)
  }

  const handleChange = (checked: boolean, rawNode: TreeNode, newKeys: VKey[]) => {
    const { onCheck, onCheckedChange } = props
    callEmit(onCheck, !checked, rawNode)
    setCheckedKeys(newKeys)
    callChange(mergedNodeMap, newKeys, onCheckedChange)
  }

  return {
    checkedKeys,
    allCheckedKeys,
    checkDisabledKeys,
    indeterminateKeys,
    handleCheck,
  }
}

function setParentChecked(
  dataMap: Map<VKey, MergedNode>,
  currNode: MergedNode | undefined,
  tempKeys: VKey[],
  disabledKeys: VKey[],
) {
  let parentSelected = true
  while (parentSelected && currNode && !isNil(currNode.parentKey)) {
    const parent = dataMap.get(currNode.parentKey)
    if (parent && !disabledKeys.includes(currNode.parentKey)) {
      parentSelected = parent.children!.every(item => disabledKeys.includes(item.key) || tempKeys.includes(item.key))
      if (parentSelected) {
        tempKeys.push(currNode.parentKey)
      }
    }
    currNode = parent
  }
}
function processAllCheckedKeysByCheckStrategy(
  dataMap: Map<VKey, MergedNode>,
  checkedKys: VKey[],
  disabledKeys: VKey[],
  checkStrategy: CheckStrategy,
) {
  let res: VKey[] = []

  checkedKys = filterCheckedKeysWithDisabled(dataMap, checkedKys, disabledKeys)

  // 将禁用且勾选的节点先push
  if (disabledKeys.length) {
    res = checkedKys.filter(item => disabledKeys.includes(item))
  }

  for (const checkedKey of checkedKys) {
    const currNode = dataMap.get(checkedKey)
    if (currNode) {
      const selfKey = currNode.key
      const parentKey = currNode.parentKey

      if (checkStrategy === 'parent') {
        if (!checkedKys.includes(parentKey!)) {
          res.push(selfKey)
        }
      } else if (checkStrategy === 'child') {
        if (currNode.isLeaf) {
          res.push(selfKey)
        }
      } else {
        res.push(selfKey)
      }
    }
  }

  return [...new Set(res)]
}

function findAllCheckedKeys(dataMap: Map<VKey, MergedNode>, checkedKys: VKey[], disabledKeys: VKey[]) {
  let res = [...checkedKys]
  let lastParentKey

  for (const checkedKey of checkedKys) {
    const currNode = dataMap.get(checkedKey)
    const parentKey = currNode?.parentKey
    const childrenKeys = getChildrenKeys(currNode, disabledKeys)
    res = res.concat(childrenKeys)
    if (!isNil(parentKey) && lastParentKey !== parentKey) {
      setParentChecked(dataMap, currNode, res, disabledKeys)
      lastParentKey = parentKey
    }
  }

  res = filterCheckedKeysWithDisabled(dataMap, [...new Set(res)], disabledKeys)

  return res
}

// 把禁用且未勾选节点的父节点从checkedKeys中排除
function filterCheckedKeysWithDisabled(dataMap: Map<VKey, MergedNode>, tempKeys: VKey[], disabledKeys: VKey[]) {
  let res = [...tempKeys]
  if (disabledKeys.length) {
    for (const disabledKey of disabledKeys) {
      if (!res.includes(disabledKey)) {
        const currNode = dataMap.get(disabledKey)
        const parentKeys = getParentKeys(dataMap, currNode, disabledKeys)
        res = res.filter(key => !parentKeys.includes(key))
      }
    }
  }
  return res
}
