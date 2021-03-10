<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-10-29 19:52:14
 * @Description: 
-->
# LubanH5 Editor

- [Demo](https://mater1996.github.io/h5-core-editor)

## Usage

```js
import LubanH5, { LubanH5Editor, LubanH5Preview } from 'luban-h5'
import { LbpButton } from 'luban-h5-plugins'

LubanH5.plugins.register({
  component: LbpButton
})

export default {
  data(){
    return {
      h5: LubanH5.create()
    }
  }
}
```

```html
<LubanH5Editor :h5="h5"></LubanH5Editor>
<LubanH5Preview :h5="h5"></LubanH5Preview>
```

预览模式也可以使用cdn的方式创建

```html
<head>
  <script src="vue.js"></script>
  <script src="luban-h5/luban-h5.js"></script>
  <script src="luban-h5/preview.js"></script>
  <script type="javascript">
    LubanH5.plugin.register({
      component: LbpButton
    })
    new Vue({
      el: '#app',
      data(){
        return {
          h5: LubanH5.create()
        }
      },
      render(){
        return <luban-h5-preview :h5="h5"></luban-h5-preview>
      }
    })
  </script>
</head>
```

#### LubanH5Editor props

| name | default |      |
| ---- | ------- | ---- |
| h5 | {}      | h5数据 |

#### LubanH5Editor method

实例方法

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

## 文档

- [鲁班H5中文文档-编辑器模块](https://www.yuque.com/luban-h5/docs/esniuh)

## 本地开发

```sh
yarn install
yarn build
```

## Feature

- 自定义插件
- 数据源
- 更小的体积
- 拖拽范围限制
- 更多API支持扩展功能

## TODO
- psd支持