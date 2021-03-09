<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-12-03 11:33:55
 * @LastEditTime: 2021-03-09 11:03:51
 * @Description:
-->

# `luban-h5-support`

> lubanH5 属性编辑器扩展支持/为插件编写提供支持

## Usage

```js
import { Switch } from '@luban-h5/support'

export default {
  props: {
    disable: Switch({
      type: Boolean,
      default: false,
      validator() {},
      label: '是否禁用'
    })
  }
}
```

#### support 类型

| name              | type    | default |                |
| ----------------- | ------- | ------- | -------------- |
| Input             | String  | null    | 输入类型的属性 |
| InputNumber       | Number  | null    | 数字类型的属性 |
| Switch            | Boolean | null    | 布尔类型的属性 |
| Select            | any     | null    | 选项类型的属性 |
| DataSourceReceive | any     | null    | 数据源接收属性 |
