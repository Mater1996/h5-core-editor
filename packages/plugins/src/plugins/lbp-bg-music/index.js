/*
 * @Author: ly525
 * @Date: 2020-01-03 23:43:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-19 14:07:12
 * @FilePath: /luban-h5/front-end/h5/src/components/@/plugins/lbp-bg-music.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import { Switch, Input } from '@luban-h5/support'
import './index.scss'

export default {
  name: 'lbp-bg-music',
  props: {
    disabled: Switch({ label: '禁用' }),
    autoplay: Switch({ label: '自动播放' }),
    src: Input({ label: '音乐URL' })
  },
  data: () => ({
    isPlaying: true
  }),
  methods: {
    toggle () {
      const bgAudio = this.$refs.bgAudio
      if (!bgAudio) return

      this.isPlaying ? bgAudio.pause() : bgAudio.play()
      this.isPlaying = !this.isPlaying
    }
  },
  render () {
    const btnStyle = {
      'animation-play-state': this.isPlaying ? 'running' : 'paused'
    }
    return (
      <div class="bg-music-wrapper" style="display: block;">
        <div class="bg-music-btn rotate" style={btnStyle} onClick={this.toggle} disabled={this.disabled}>
          <audio src={this.src} autoplay={this.autoplay} preload loop ref='bgAudio'></audio>
        </div>
      </div>
    )
  },
  created () {
    // 在初始化的时候，autoplay 控制是否播放
    // 后面是否播放，由用户的点击行为决定
    this.isPlaying = this.autoplay
  }
}
