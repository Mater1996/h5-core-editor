# `luban-h5`

> LubanH5

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