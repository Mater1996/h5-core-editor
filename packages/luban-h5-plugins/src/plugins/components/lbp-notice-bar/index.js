/*
 * @Author: ly525
 * @Date: 2020-05-14 08:09:44
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-10 15:09:00
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-notice-bar.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */

import PropTypes from '../../../commom-props'
import { NoticeBar } from 'vant'
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
    text: PropTypes.string({
      defaultValue: '请填写内容，如果过长，将会在手机上滚动显示',
      label: '公告',
      props: {
        type: 'textarea'
      }
    }),
    vertical: PropTypes.boolean(),
    backgroundColor: PropTypes.color({ label: '背景色', defaultValue: '#fffbe8' }), /** 淡黄色 */
    color: PropTypes.color({ defaultValue: '#ed6a0c' }), /** 淡黄色 */
    mode: {
      type: String,
      default: '',
      editor: {
        type: 'a-select',
        label: '模式',
        props: {
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
        }
      }
    }
  },
  componentsForPropsEditor: {
  },
  mounted () {
  },
  methods: {

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