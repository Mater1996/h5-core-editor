<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-10-28 09:30:06
 * @LastEditTime: 2020-11-02 11:00:05
 * @Description:
-->
<template>
  <a-tree
    class="draggable-tree"
    :default-expanded-keys="expandedKeys"
    draggable
    :tree-data="treeData"
    @dragenter="onDragEnter"
    @drop="onDrop"
  />
</template>

<script>
import { mapState } from 'vuex'
function getTreeNode(ele) {
  return {
    title: ele.name,
    key: ele.uuid,
    children: (ele.children || []).map(getTreeNode)
  }
}

export default {
  name: 'page-tree',
  computed: {
    ...mapState('editor', {
      elements: (state) => state.editingPage.elements
    }),
    treeData() {
      return this.elements.map(getTreeNode)
    }
  },
  data() {
    return {
      gData: [],
      expandedKeys: []
    }
  },
  methods: {
    onDragEnter(info) {},
    onDrop(info) {}
  }
}
</script>
