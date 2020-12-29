<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-10-29 19:52:14
 * @LastEditTime: 2020-12-29 12:02:00
 * @Description: 
-->
# 鲁班H5核心编辑模块

- [Demo](https://mater1996.github.io/h5-core-editor)

## Usage

```js
import 'luban-h5-editor/dist/luban-h5-editor.css'
import lubanH5Editor from 'luban-h5-editor'
import { LbpButton } from 'luban-h5-plugins'

lubanH5Editor.LbpH5Plugin.register({
  title: '普通按钮',
  name: LbpButton.name,
  icon: 'hand-pointer-o',
  visible: true,
  component: LbpButton
}) // 注册某个插件

Vue.use(lubanH5Editor)
```

```html
<CoreEditor work="{this.work}" ref="editor" />
```

#### props

| name | default |      |
| ---- | ------- | ---- |
| data | {}      | 数据 |

#### method

实例方法

```js
this.$refs['editor'].getData() // 获取当前数据
this.$refs['editor'].changePageIndex(index) // 修改当前页面
this.$refs['editor'].addPage(title) // 添加页面
this.$refs['editor'].updatePage(data) // 更新页面
this.$refs['editor'].addElement(...elements) // 向当前页面添加元素
this.$refs['editor'].updateElement(data) // 更新当前选中的元素
this.$refs['editor'].clear() // 清空当前元素
this.$refs['editor'].undo() // 后退一步
this.$refs['editor'].redo() // 前进一步
```

## 文档

- [鲁班H5中文文档-编辑器模块](https://www.yuque.com/luban-h5/docs/esniuh)

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