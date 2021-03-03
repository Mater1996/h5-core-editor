# `luban-h5-canvas`

> 绘制 LubanElement 包括形状,动画,以及组件的 render

## Usage

```js
import { LubanElement } from 'luban-h5'
import LubanH5Canvas from 'luban-h5-canvas'
const elements = [
  LubanElement.create({ component: button, style: {}, props: {}, animations: [] })
]
```

```html
<LubanH5Canvas :width="750" :height="1334" :elements="elements" />
```

#### props

| name     | type    | default |                |
| -------- | ------- | ------- | -------------- |
| width    | number  | 0       | 宽             |
| height   | number  | 0       | 高             |
| elements | array   | []      | 渲染的元素数组 |
| readonly | boolean | false   | 是否只读       |
| unit     | 'rem'   | 'px'    | 'px'           | 渲染的元素形状单位 |
