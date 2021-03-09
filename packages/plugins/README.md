<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-12-03 11:33:24
 * @LastEditTime: 2021-03-09 10:58:08
 * @Description:
-->

# `luban-h5-plugins`

> 鲁班 h5 插件集（为编辑器以及预览提供服务）

## Usage

```js
import lubanH5 from 'luban-h5'
import { LbpButton } from 'luban-h5-plugins'
lubanH5.plugin.register({
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
import lubanH5 from 'luban-h5'
import {Input} from '@luban-h5/support' // 引入luban自定义修改属性，由该方法声明的属性会可编辑

const customComponent {
  name: 'lbp-button2',
  props: {
    text: Input({
      label:'默认文字'
    })
  }
}

lubanH5.plugin.register({
  title: '普通按钮',
  name: customComponent.name,
  icon: 'hand-pointer-o',
  visible: true,
  component: customComponent
})
```

