/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime : 2020-11-19 14:12:47
 * @Description :
 */
import LbpElement from '@/editor/models/LbpElement'
import Render from './Render'
import ShapeLayer from './ShapeLayer'
import AnimateLayer from './AnimateLayer'

export default {
  props: {
    element: {
      type: LbpElement,
      require: true
    }
  },
  render () {
    const { element } = this
    return (
      <ShapeLayer elStyle={element.style} on={this.$listeners}>
        <AnimateLayer animations={element.animations}>
          <Render element={element}></Render>
        </AnimateLayer>
      </ShapeLayer>
    )
  }
}
