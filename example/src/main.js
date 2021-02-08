/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 09:25:51
 * @LastEditTime: 2021-02-07 15:02:59
 * @Description :
 */
import Vue from 'vue'
import App from './App.vue'

import 'luban-h5/dist/luban-h5.esm.css'
import lubanH5, { LubanH5Editor } from 'luban-h5'

// import 'luban-h5-support/dist/luban-h5-support.esm.css'
import 'luban-h5-plugins/dist/luban-h5-plugins.esm.css'
import {
  // LbpButton,
  LbpPicture,
  // LbpVideo,
  // LbpText,
  // LbpFormInput,
  // LbpFormButton,
  // LbpFormRadioGroup,
  // LbpFormCheckboxGroup,
  // LbpBackground,
  // LbpSlide,
  // LbpBgMusic,
  // LbpNoticeBar,
  // LbpRate,
  // LbpTable,
  // LbpNewsList
} from 'luban-h5-plugins'


console.log(lubanH5, LubanH5Editor)


const plugins = [
  // {
  //   title: '公告',
  //   name: LbpNoticeBar.name,
  //   icon: 'volume-up',
  //   visible: true,
  //   component: LbpNoticeBar
  // },
  // {
  //   title: '评分',
  //   name: LbpRate.name,
  //   icon: 'star-o',
  //   visible: true,
  //   component: LbpRate
  // },
  {
    title: '图片',
    name: LbpPicture.name,
    icon: 'photo',
    visible: true,
    component: LbpPicture,
    asyncComponent: () => ({
      component: () => import('luban-h5-plugins/lib/lbp-picture')
    })
  },
  // {
  //   title: '文字',
  //   name: LbpText.name,
  //   icon: 'text-width',
  //   visible: true,
  //   component: LbpText
  // },
  // {
  //   title: '普通按钮',
  //   name: LbpButton.name,
  //   icon: 'hand-pointer-o',
  //   visible: true,
  //   component: LbpButton
  // },
  // {
  //   title: '轮播图',
  //   name: LbpSlide.name,
  //   icon: 'photo',
  //   visible: true,
  //   component: LbpSlide
  // },
  // {
  //   title: '视频',
  //   name: LbpVideo.name,
  //   icon: 'file-video-o',
  //   visible: true,
  //   component: LbpVideo
  // },
  // {
  //   title: '表单输入',
  //   name: LbpFormInput.name,
  //   icon: 'pencil-square-o',
  //   visible: true,
  //   component: LbpFormInput
  // },
  // {
  //   title: '表单提交',
  //   name: LbpFormButton.name,
  //   icon: 'hand-pointer-o',
  //   visible: true,
  //   component: LbpFormButton
  // },
  // {
  //   title: '表单多选',
  //   name: LbpFormCheckboxGroup.name,
  //   icon: 'check-square-o',
  //   visible: true,
  //   component: LbpFormCheckboxGroup
  // },
  // {
  //   title: '表单单选',
  //   name: LbpFormRadioGroup.name,
  //   icon: 'dot-circle-o',
  //   visible: true,
  //   component: LbpFormRadioGroup
  // },
  // {
  //   title: '背景',
  //   name: LbpBackground.name,
  //   icon: 'dot-circle-o',
  //   visible: false,
  //   component: LbpBackground
  // },
  // {
  //   title: '背景音乐',
  //   name: LbpBgMusic.name,
  //   icon: 'music',
  //   visible: true,
  //   component: LbpBgMusic
  // },
  // {
  //   title: '默认表格',
  //   name: LbpTable.name,
  //   icon: 'table',
  //   visible: true,
  //   component: LbpTable
  // },
  // {
  //   icon: 'table',
  //   name: LbpTable.name,
  //   visible: true,
  //   title: '表格',
  //   component: LbpTable
  // },
  // {
  //   title: '新闻列表',
  //   name: LbpNewsList.name,
  //   icon: 'list',
  //   visible: true,
  //   component: LbpNewsList
  // }
]

plugins.forEach(v => lubanH5.plugin.register(v))

Vue.config.productionTip = false

Vue.use(LubanH5Editor)

new Vue({
  render: h => h(App)
}).$mount('#app')
