# `luban-h5`

> luban-h5 core

## Usage

```js
import lubanH5, { lubanH5Editor, lubanH5Preview } from 'luban-h5'
import { LbpButton } from 'luban-h5-plugins'
lubanH5.plugins.register({
  component: LbpButton
})
```

```html
<luban-h5-editor :h5="{}"></luban-h5-editor>
<luban-h5-preview :h5="{}"></luban-h5-preview>
```

```html
<head>
  <script src="vue.js"></script>
  <script src="luban-h5/luban-h5.js"></script>
  <script src="luban-h5/preview.js"></script>
  <script type="javascript">
    lubanH5.plugins.register({
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