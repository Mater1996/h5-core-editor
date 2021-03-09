<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-12-03 11:42:32
 * @LastEditTime: 2021-03-09 18:54:14
 * @Description: 
-->
# `luban-h5-preview`

> LubanH5预览

## Usage

```js
import LubanH5 from 'luban-h5'
import '@luban-h5/editor/dist/luban-h5-preview.css'
import LubanH5Preview from '@luban-h5/preview'

Vue.use(LubanH5Preview)

export default{
  data(){
    return {
      h5: LubanH5.create({})
    }
  }
}
```

```html
<LubanH5Preview :h5="h5" />
```

#### props

| name | default |      |
| ---- | ------- | ---- |
| h5 | {}      | 数据 |