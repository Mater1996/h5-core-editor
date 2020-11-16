/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 14:11:44
 * @LastEditTime : 2020-11-16 18:33:42
 * @Description :
 */

import 'animate.css/animate.css'
import './index.scss'
import EventBus from '@/bus'

const AnimateLayer = {
  props: {
    animations: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    runAnimations() {
      if (!this.animations) return
      const animationQueue = this.animations || []
      const len = animationQueue.length
      if (len === 0) return
      const parentNode = this.$el
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
    EventBus.$on('RUN_ANIMATIONS', () => {
      this.runAnimations()
    })
  },
  render() {
    return <div class="animate-layer">{this.$slots.default}</div>
  }
}

export default AnimateLayer
