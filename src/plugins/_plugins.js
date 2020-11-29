/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-11 18:18:26
 * @LastEditTime : 2020-11-29 11:15:14
 * @Description :
 */

import LbpButton from './components/lbp-button'
import LbpPicture from './components/lbp-picture'
import LbpVideo from './components/lbp-video'
import LbpText from './components/lbp-text'
import LbpFormInput from './components/lbp-form-input'
import LbpFormButton from './components/lbp-form-button'
import LbpFormRadioGroup from './components/lbp-form-radio-group'
import LbpFormCheckboxGroup from './components/lbp-form-checkbox-group'
import LbpBackground from './components/lbp-background'
import LbpSlide from './components/lbp-slide'
import LbpBgMusic from './components/lbp-bg-music'
import LbpNoticeBar from './components/lbp-notice-bar'
import LbpRate from './components/lbp-rate'
import LbpQQMap from './components/lbp-qq-map/src/index.vue'
import LbpLineChart from './components/charts/line'
import LbpTable from './components/lbp-table'
import LbpNewsList from './components/lbp-news-list'

export default [
  {
    title: '雷达图',
    name: LbpLineChart.name,
    icon: 'line-chart',
    visible: true,
    component: LbpLineChart
  },
  {
    title: '折线图',
    name: LbpLineChart.name,
    icon: 'line-chart',
    component: LbpLineChart
  },
  {
    title: '柱状图',
    name: LbpLineChart.name,
    icon: 'bar-chart',
    visible: true,
    component: LbpLineChart
  },
  {
    title: '饼状图',
    name: LbpLineChart.name,
    icon: 'pie-chart',
    visible: true,
    component: LbpLineChart
  },
  {
    title: '漏斗图',
    name: LbpLineChart.name,
    icon: 'filter',
    visible: true,
    component: LbpLineChart
  },
  {
    title: '公告',
    name: LbpNoticeBar.name,
    icon: 'volume-up',
    visible: true,
    component: LbpNoticeBar
  },
  {
    title: '评分',
    name: LbpRate.name,
    icon: 'star-o',
    visible: true,
    component: LbpRate
  },
  {
    title: '图片',
    name: LbpPicture.name,
    icon: 'photo',
    visible: true,
    component: LbpPicture
  },
  {
    title: '文字',
    name: LbpText.name,
    icon: 'text-width',
    visible: true,
    component: LbpText
  },
  {
    title: '普通按钮',
    name: LbpButton.name,
    icon: 'hand-pointer-o',
    visible: true,
    component: LbpButton
  },
  {
    title: '轮播图',
    name: LbpSlide.name,
    icon: 'photo',
    visible: true,
    component: LbpSlide
  },
  {
    title: '地图',
    name: LbpQQMap.name,
    icon: 'map-o',
    visible: true,
    component: LbpQQMap
  },
  {
    title: '视频',
    name: LbpVideo.name,
    icon: 'file-video-o',
    visible: true,
    component: LbpVideo
  },
  {
    title: '表单输入',
    name: LbpFormInput.name,
    icon: 'pencil-square-o',
    visible: true,
    component: LbpFormInput
  },
  {
    title: '表单提交',
    name: LbpFormButton.name,
    icon: 'hand-pointer-o',
    visible: true,
    component: LbpFormButton
  },
  {
    title: '表单多选',
    name: LbpFormCheckboxGroup.name,
    icon: 'check-square-o',
    visible: true,
    component: LbpFormCheckboxGroup
  },
  {
    title: '表单单选',
    name: LbpFormRadioGroup.name,
    icon: 'dot-circle-o',
    visible: true,
    component: LbpFormRadioGroup
  },
  {
    title: '背景',
    name: LbpBackground.name,
    icon: 'dot-circle-o',
    visible: false,
    component: LbpBackground
  },
  {
    title: '背景音乐',
    name: LbpBgMusic.name,
    icon: 'music',
    visible: true,
    component: LbpBgMusic
  },
  {
    title: '默认表格',
    name: LbpTable.name,
    icon: 'table',
    visible: true,
    component: LbpTable
  },
  {
    icon: 'table',
    name: LbpTable.name,
    visible: true,
    title: '表格',
    component: LbpTable
  },
  {
    title: '新闻列表',
    name: LbpNewsList.name,
    icon: 'list',
    visible: true,
    component: LbpNewsList
  }
]
