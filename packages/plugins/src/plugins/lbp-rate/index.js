/*
 * @Author: ly525
 * @Date: 2020-05-17 20:04:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-09 16:14:52
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-rate.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import { DataSourceReceive, Select, InputNumber } from '@luban-h5/support'
import Rate from 'vant/lib/rate'
import 'vant/lib/rate/style'
import 'vant/lib/icon/local.css'

export default {
  name: 'lbp-rate',
  props: {
    value: DataSourceReceive({ type: Number }), // 数据源输入例如 rate等 这样在组件初始化时会自动绑定上h5 数据源上的 rate 属性
    count: InputNumber({ label: '图标总数' }),
    size: InputNumber({ label: '图标大小' }),
    gutter: InputNumber({ label: '图标间距' }),
    mode: Select({
      label: '模式',
      default: 'star',
      props: {
        options: [
          {
            label: 'star',
            value: 'star'
          },
          {
            label: '点赞',
            value: 'like'
          },
          {
            label: 'Good',
            value: 'good-job'
          }
        ]
      }
    })
  },
  methods: {
    _handleChange (value) {
      this.$emit('change', value)
    }
  },
  render () {
    return (
      <Rate
        value={this.value}
        count={this.count}
        size={this.size}
        color={this.color}
        gutter={this.gutter}
        icon={this.mode}
        void-icon={`${this.mode}-o`}
        void-color="#eee"
        onChange={this._handleChange}
      />
    )
  }
}
