/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:50
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-17 16:52:08
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-video.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import PropTypes from '../../PropTypes'

import playIcon from './play.svg'
import './index.scss'
// 这里有个动画演示，可以用来学习 CSS：《CSS制作播放、暂停按钮》https://codepen.io/chriscoyier/full/lotjh

export default {
  name: 'lbp-video',
  props: {
    src: PropTypes.string({ label: '视频地址' }),
    disabled: PropTypes.boolean({ label: 'disabled' }),
    useIframe: PropTypes.boolean({ label: '使用iframe' }),
    iframeSrc: PropTypes.string({
      default: '',
      label: 'iframe 地址',
      props: {
        type: 'textarea',
        placeholder: '只有使用iframe打开的时候，这个才有效'
      },
      extra: h => {
        return '「使用iframe」打开的时候，这个才有效；上传视频请忽略该配置'
      }
    })
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
      // else if (this.src) {
      //   this.$refs.videoTag && (this.$refs.videoTag.innerHTML = `<source type="video/mp4" src=${this.src} />`)
      // }
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