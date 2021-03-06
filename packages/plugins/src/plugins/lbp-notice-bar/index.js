/*
 * @Author: ly525
 * @Date: 2020-05-14 08:09:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-02 18:59:03
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-notice-bar.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */

import { Input, Select, Switch } from '@luban-h5/support'
import NoticeBar from 'vant/lib/notice-bar'
import 'vant/lib/notice-bar/style'

export default {
  name: 'lbp-notice-bar',
  props: {
    width: {
      default: 120
    },
    height: {
      default: 120
    },
    text: Input({
      default: '请填写内容，如果过长，将会在手机上滚动显示',
      label: '公告',
      props: {
        type: 'textarea'
      }
    }),
    vertical: Switch(),
    mode: Select({
      label: '模式',
      options: [
        {
          label: '默认',
          value: ''
        },
        {
          label: '右侧有箭头',
          value: 'link'
        },
        {
          label: '可关闭',
          value: 'closeable'
        }
      ]
    })
  },
  render () {
    return <NoticeBar
      mode={this.mode}
      color={this.color}
      left-icon="volume-o"
      text={this.text}
      background={this.backgroundColor}
    />
  }
}
