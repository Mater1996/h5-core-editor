/*
 * @Author: ly525
 * @Date: 2020-05-17 20:04:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-21 16:18:05
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-rate.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import PropTypes from '../../PropTypes'
import { Rate } from 'vant'
import 'vant/lib/rate/style'
import 'vant/lib/icon/local.css'

export default {
  name: 'lbp-rate',
  props: {
    value: PropTypes.number({
      defaultValue: 5,
      label: '当前分值'
    }),
    count: PropTypes.number({
      defaultValue: 5,
      label: '图标总数'
    }),
    size: PropTypes.number({
      defaultValue: 16,
      label: '图标大小'
    }),
    gutter: PropTypes.number({
      defaultValue: 16,
      label: '图标间距'
    }),
    mode: PropTypes.select({
      label: '模式',
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
    })
  },
  render () {
    return (
      <Rate
        value={this.value}
        count={this.count}
        size={this.size}
        color={this.color}
        gutter={this.gutter}
        void-icon="star"
        void-color="#eee"
      />
    )
  }
}
