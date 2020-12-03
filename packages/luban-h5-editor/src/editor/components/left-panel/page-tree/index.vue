<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-10-28 09:30:06
 * @LastEditTime: 2020-11-17 13:01:29
 * @Description:
-->
<template>
  <a-tree
    class="draggable-tree"
    :default-expanded-keys="expandedKeys"
    draggable
    :tree-data="treeData"
  />
</template>

<script>
import { Tree } from 'ant-design-vue'

function getTreeNode (ele) {
  return {
    title: ele.name,
    key: ele.id,
    children: (ele.children || []).map(getTreeNode)
  }
}

export default {
  name: 'page-tree',
  components: {
    [Tree.name]: Tree
  },
  computed: {
    treeData () {
      return this.elements.map(getTreeNode)
    }
  },
  data () {
    return {
      gData: [],
      expandedKeys: []
    }
  }
}
</script>
