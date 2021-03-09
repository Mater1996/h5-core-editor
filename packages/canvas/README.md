# `luban-h5-canvas`

> LubanH5渲染 包括形状,动画,以及组件的 render

## Usage

```js
import LubanH5 from 'luban-h5'
import LubanH5Canvas from '@luban-h5/canvas'

export default {
  data() {
    return {
      h5: LubanH5.create({})
    }
  }
}
```

```html
<LubanH5Canvas :h5="h5" />
```

#### props

| name     | type    | default |                |
| -------- | ------- | ------- | -------------- |
| h5       | LubanH5 | null    | 渲染的 H5      |
| page     | Number  | 0       | 渲染的 H5 页面 |
| readonly | boolean | false   | 是否只读       |
| unit     | 'rem'   | 'px'    | 'px'           | 渲染的元素形状单位 |
