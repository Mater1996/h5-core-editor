/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-19 16:41:15
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-video.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import { Input, Switch } from '@luban-h5/support'

import playIcon from './play.svg'
import './index.scss'
// 这里有个动画演示，可以用来学习 CSS：《CSS制作播放、暂停按钮》https://codepen.io/chriscoyier/full/lotjh

export default {
  name: 'lbp-video',
  props: {
    src: Input({ label: '视频地址' }),
    disabled: Switch({ label: 'disabled' }),
    useIframe: Switch({ label: '使用iframe' }),
    iframeSrc: Input({ label: 'iframe 地址' })
  },
  watch: {
    src () {
      this.appendIframe()
    },
    disabled () {
      this.appendIframe()
    },
    useIframe () {
      this.appendIframe()
    },
    iframeSrc () {
      this.appendIframe()
    }
  },
  mounted () {
    this.appendIframe()
  },
  methods: {
    appendIframe () {
      if (this.useIframe && this.iframeSrc) {
        // v-html
        this.$refs.iframeWrapper &&
          (this.$refs.iframeWrapper.innerHTML = this.iframeSrc)
      }
    }
  },
  render (h) {
    const style = this.disabled ? { 'pointer-events': 'none' } : {}
    return (
      <div class="lbc-video" style={style}>
        {this.useIframe ? (
          <div ref="iframeWrapper">
            <img src={playIcon} width="100%" height="100%" />
          </div>
        ) : (
          <video
            playsinline="true"
            webkit-playsinline=""
            width="100%"
            height="100%"
            poster={playIcon}
            ref="videoTag"
            controls
          >
            <source type="video/mp4" src={this.src} />
          </video>
        )}
      </div>
    )
  },
  componentsForPropsEditor: {}
}
