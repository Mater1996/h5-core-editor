<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-10-29 19:52:14
 * @Description: 
-->
# 鲁班H5核心编辑模块

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

## Note

关于注册异步组件的预览方面，有两种解决方案

一个是直接构建预览页面，然后直接异步构建，这里也是可以分开的，因为preview也可以渲染异步组件，在使用方看来，他们在发布的时候需要的就是多执行一次build构建而已与example一样

一个是预览包提供systemjs状态，这样不需要build，而是直接内联preview.js并进行渲染就可以了 // TODO

luban-h5-support 包含了editor的组件 目前看起来不是很好  他会包裹 props 导致props增大 另外他不能用到内联script中



## 本地开发

```sh
yarn install
yarn build
```

## feature

- 分离请求数据
- rollup重新构建
- 分离不需要的js文件等
- ant-design 按需引用
- 测试模式开发