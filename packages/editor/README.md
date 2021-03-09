<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-12-03 11:27:45
 * @LastEditTime: 2021-03-09 10:58:19
 * @Description:
-->

# `luban-h5-editor`

> 鲁班 H5 核心编辑器

## Usage

```js
import '@luban-h5/editor/dist/luban-h5-editor.css'
import lubanH5Editor from '@luban-h5/editor'

Vue.use(lubanH5Editor)
```

```html
<CoreEditor :h5="{}" ref="editor" />
```

#### props

| name | default |      |
| ---- | ------- | ---- |
| h5 | {}      | 数据 |

#### method

```js
const $editor = this.$refs['editor']
$editor.getData() // 获取当前数据
$editor.changePageIndex(index) // 修改当前页面
$editor.addPage(title) // 添加页面
$editor.updatePage(data) // 更新页面
$editor.addElement(...elements) // 向当前页面添加元素
$editor.updateElement(data) // 更新当前选中的元素
$editor.clear() // 清空当前元素
$editor.undo() // 后退一步
$editor.redo() // 前进一步
```
