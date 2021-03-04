/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 14:11:44
 * @LastEditTime: 2021-02-02 14:00:47
 * @Description :
 */

import 'animate.css/animate.css'
import './index.scss'

const AnimateLayer = {
  name: 'AnimateWrapper',
  props: {
    animations: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      animationIndex: 0,
      runingAnimation: {}
    }
  },
  computed: {
    animationStyle () {
      const animation = this.runingAnimation
      const { duration, type, infinite, interationCount, delay } = animation
      return {
        animationName: type,
        animationDuration: duration ? `${duration}s` : null,
        animationIterationCount: infinite
          ? 'infinite'
          : interationCount || null,
        animationDelay: delay ? `${delay}s` : null,
        animationFillMode: 'both'
      }
    }
  },
  methods: {
    runAnimations () {
      this.clear()
      this.runAnimation(this.animationIndex)
    },
    runAnimation (animationIndex) {
      setTimeout(() => {
        const animations = this.animations
        this.animationIndex = animationIndex
        this.runingAnimation = animations[animationIndex] || {}
      })
    },
    handleAnimationend () {
      this.clearAnimation()
      const len = this.animations.length
      const nextIndex = this.animationIndex + 1
      if (nextIndex >= len) return
      this.runAnimation(nextIndex)
    },
    clear () {
      this.clearAnimation()
      this.animationIndex = 0
    },
    clearAnimation () {
      this.runingAnimation = {}
    }
  },
  render () {
    return (
      <div
        class="animate-layer"
        style={this.animationStyle}
        onAnimationend={this.handleAnimationend}
      >
        {this.$slots.default}
      </div>
    )
  }
}

export default AnimateLayer
