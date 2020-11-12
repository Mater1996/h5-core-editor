/*
 * @Author: ly525
 * @Date: 2019-11-24 18:51:58
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-12 16:33:52
 * @FilePath: /luban-h5/front-end/h5/src/components/@/mixins/animation.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description:
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import EventBus from '@/bus'

export default {
  methods: {
    runAnimations() {
      if (!this.activeElement) return
      const animationQueue = this.activeElement.animations || []
      const len = animationQueue.length
      if (len === 0) return
      const parentNode = this.activeElement.vm.$el
      let animIdx = 0
      runAnimation()
      function runAnimation() {
        if (animIdx < len) {
          const animation = animationQueue[animIdx]
          Object.assign(parentNode.style, {
            animationName: animation.type,
            animationDuration: `${animation.duration}s`,
            animationIterationCount: animation.infinite
              ? 'infinite'
              : animation.interationCount,
            animationDelay: `${animation.delay}s`,
            animationFillMode: 'both'
          })
          animIdx++
        } else {
          Object.assign(parentNode.style, {
            animationName: null,
            animationDuration: null,
            animationIterationCount: null,
            animationDelay: null,
            animationFillMode: null
          })
        }
      }
      parentNode.addEventListener('animationend', runAnimation, false)
    }
  },
  created() {
    const that = this
    EventBus &&
      EventBus.$on('RUN_ANIMATIONS', () => {
        that.runAnimations()
      })
  }
}
