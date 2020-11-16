/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 14:11:44
 * @LastEditTime : 2020-11-16 14:33:15
 * @Description :
 */

import './index.scss'
import animationMixin from '@/mixins/animation.js'

const AnimateLayer = {
  mixins: [animationMixin],
  props: {
    animations: {
      type: Array,
      default: () => []
    }
  },
  render() {
    return <div class="animate-layer">{this.$slots.default}</div>
  }
}

export default AnimateLayer
