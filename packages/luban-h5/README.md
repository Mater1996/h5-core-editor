# `luban-h5`

> luban-h5

## Usage

```js
import lubanH5, { LubanH5Editor, LubanH5Preview } from 'luban-h5'
import { LbpButton } from 'luban-h5-plugins'
lubanH5.plugins.register({
  component: LbpButton
})
```

```html
<LubanH5Editor :h5="{}"></LubanH5Editor>
<LubanH5Preview :h5="{}"></LubanH5Preview>
```

```html
<head>
  <script src="vue.js"></script>
  <script src="luban-h5/luban-h5.js"></script>
  <script src="luban-h5/preview.js"></script>
  <script type="javascript">
    lubanH5.plugin.register({
      component: LbpButton
    })
    new Vue({
      el: '#app',
      render(){
        return <luban-h5-preview :h5="{}"></luban-h5-preview>
      }
    })
  </script>
</head>
```