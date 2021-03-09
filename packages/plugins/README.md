<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-12-03 11:33:24
 * @LastEditTime: 2021-03-09 18:54:31
 * @Description:
-->

# `luban-h5-plugins`

> LubanH5 插件集（为编辑器以及预览提供服务）

## Usage

```js
import LubanH5 from 'luban-h5'
import { LbpButton } from 'luban-h5-plugins'
LubanH5.plugin.register({
  title: '普通按钮',
  name: LbpButton.name,
  icon: 'hand-pointer-o',
  visible: true,
  component: LbpButton
})
```

## 插件列表

| name                 | props |          |
| -------------------- | ----- | -------- |
| LbpPicture           |       | 图片     |
| LbpText              |       | 文字     |
| LbpFormInput         |       | 输入     |
| LbpFormButton        |       | 按钮     |
| LbpFormRadioGroup    |       | 单选     |
| LbpFormCheckboxGroup |       | 多选     |
| LbpBackground        |       | 背景     |
| LbpSlide             |       | 滚动播放 |
| LbpBgMusic           |       | 背景音乐 |
| LbpNoticeBar         |       | 公告栏   |
| LbpRate              |       | 星星     |
| LbpTable             |       | 表格     |
| LbpNewsList          |       | 新闻列表 |

## 自定义插件

```js
import LubanH5 from 'luban-h5'
import { Input } from '@luban-h5/support' // 引入luban自定义修改属性，由该方法声明的属性会可编辑

const CustomComponent {
  name: 'CustomComponent',
  props: {
    text: Input({
      label:'默认文字'
    })
  },
  render(){
    return <div class="custom-component"></div>
  }
}

LubanH5.plugin.register({
  title: '自定义组件',
  name: CustomComponent.name,
  icon: 'hand-pointer-o',
  visible: true,
  component: CustomComponent
})
```
