/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-11 18:18:26
 * @LastEditTime : 2020-11-17 16:50:08
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
    i18nTitle: {
      'en-US': 'RadarChart',
      'zh-CN': '雷达图'
    },
    title: '雷达图',
    icon: 'line-chart',
    visible: true,
    name: LbpLineChart.name,
    component: LbpLineChart,
    shortcutProps: {
      type: 'radar'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '折线图'
    },
    title: '折线图',
    icon: 'line-chart',
    visible: true,
    name: LbpLineChart.name,
    component: LbpLineChart,
    shortcutProps: {
      type: 'line'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '柱状图'
    },
    title: '柱状图',
    icon: 'bar-chart',
    visible: true,
    name: LbpLineChart.name,
    component: LbpLineChart,
    shortcutProps: {
      type: 'histogram'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '饼状图'
    },
    title: '饼状图',
    icon: 'pie-chart',
    visible: true,
    name: LbpLineChart.name,
    component: LbpLineChart,
    shortcutProps: {
      type: 'pie'
    }
  },
  {
    i18nTitle: {
      'en-US': 'LineChart',
      'zh-CN': '漏斗图'
    },
    title: '漏斗图',
    icon: 'filter',
    visible: true,
    name: LbpLineChart.name,
    component: LbpLineChart,
    shortcutProps: {
      type: 'funnel'
    }
  },
  {
    title: '公告',
    i18nTitle: {
      'en-US': 'Notice-Bar',
      'zh-CN': '公告'
    },
    icon: 'volume-up',
    visible: true,
    name: LbpNoticeBar.name,
    component: LbpNoticeBar
  },
  {
    title: '评分',
    i18nTitle: {
      'en-US': 'Rate',
      'zh-CN': '评分'
    },
    icon: 'star-o',
    visible: true,
    name: LbpRate.name,
    component: LbpRate
  },
  {
    title: '图片',
    i18nTitle: {
      'en-US': 'Picture',
      'zh-CN': '图片'
    },
    icon: 'photo',
    visible: true,
    name: LbpPicture.name,
    component: LbpPicture
  },
  {
    i18nTitle: {
      'en-US': 'Text',
      'zh-CN': '文字'
    },
    title: '文字',
    icon: 'text-width',
    visible: true,
    name: LbpText.name,
    component: LbpText
  },
  {
    i18nTitle: {
      'en-US': 'Button',
      'zh-CN': '普通按钮'
    },
    title: '普通按钮',
    icon: 'hand-pointer-o',
    visible: true,
    name: LbpButton.name,
    component: LbpButton
  },
  {
    i18nTitle: {
      'en-US': 'Carousel',
      'zh-CN': '轮播图'
    },
    title: '轮播图',
    icon: 'photo',
    visible: true,
    name: LbpSlide.name,
    component: LbpSlide
  },
  {
    i18nTitle: {
      'en-US': 'Map',
      'zh-CN': '地图'
    },
    title: '地图',
    icon: 'map-o',
    visible: true,
    name: LbpQQMap.name,
    component: LbpQQMap
  },
  {
    i18nTitle: {
      'en-US': 'Video',
      'zh-CN': '视频'
    },
    title: '视频',
    icon: 'file-video-o',
    visible: true,
    name: LbpVideo.name,
    component: LbpVideo
  },
  {
    i18nTitle: {
      'en-US': 'Form Input',
      'zh-CN': '表单输入'
    },
    title: '表单输入',
    icon: 'pencil-square-o',
    visible: true,
    name: LbpFormInput.name,
    component: LbpFormInput
  },
  {
    i18nTitle: {
      'en-US': 'Form Submit',
      'zh-CN': '表单提交'
    },
    title: '表单提交',
    icon: 'hand-pointer-o',
    visible: true,
    name: LbpFormButton.name,
    component: LbpFormButton
  },
  {
    i18nTitle: {
      'en-US': 'Form Checkbox',
      'zh-CN': '表单多选'
    },
    title: '表单多选',
    icon: 'check-square-o',
    visible: true,
    name: LbpFormCheckboxGroup.name,
    component: LbpFormCheckboxGroup
  },
  {
    i18nTitle: {
      'en-US': 'Form Radio',
      'zh-CN': '表单单选'
    },
    title: '表单单选',
    icon: 'dot-circle-o',
    visible: true,
    name: LbpFormRadioGroup.name,
    component: LbpFormRadioGroup
  },
  {
    i18nTitle: {
      'en-US': 'Background',
      'zh-CN': '背景'
    },
    title: '背景',
    icon: 'dot-circle-o',
    visible: false,
    name: LbpBackground.name,
    component: LbpBackground
  },
  {
    i18nTitle: {
      'en-US': 'BgMusic',
      'zh-CN': '背景音乐'
    },
    title: '背景音乐',
    icon: 'music',
    visible: true,
    name: LbpBgMusic.name,
    component: LbpBgMusic
  },
  {
    i18nTitle: {
      'en-US': 'Table(Default)',
      'zh-CN': '默认表格'
    },
    icon: 'table',
    visible: true,
    name: LbpTable.name,
    component: LbpTable
  },
  {
    i18nTitle: {
      'en-US': 'Table(Stripe)',
      'zh-CN': '(斑马线)表格'
    },
    icon: 'table',
    visible: true,
    name: LbpTable.name,
    component: LbpTable,
    shortcutProps: {
      theme: 'lbp-table-theme-stripe'
    }
  },
  {
    i18nTitle: {
      'en-US': 'Table(LightBlue)',
      'zh-CN': '(淡蓝色)表格'
    },
    icon: 'table',
    visible: true,
    name: LbpTable.name,
    component: LbpTable,
    shortcutProps: {
      theme: 'lbp-table-theme-light-blue'
    }
  },
  {
    i18nTitle: {
      'en-US': 'NewsList',
      'zh-CN': '新闻列表'
    },
    title: '新闻列表',
    icon: 'list',
    visible: true,
    name: LbpNewsList.name,
    component: LbpNewsList
  }
]
