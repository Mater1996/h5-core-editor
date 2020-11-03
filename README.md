<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-10-29 19:52:14
 * @LastEditTime: 2020-11-03 17:10:56
 * @Description: 
-->
# 鲁班H5核心编辑模块

- [Demo](https://mater1996.github.io/h5-core-editor)

## Usage Example

```js
import 'luban-h5-editor/dist/luban-h5-editor.css'
import lubanH5Editor from 'luban-h5-editor'

Vue.use(lubanH5Editor)
```

```html
<CoreEditor work={this.work} ref="editor" />
```

#### method

```js
this.$refs['editor'].getData() // newWorkData
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