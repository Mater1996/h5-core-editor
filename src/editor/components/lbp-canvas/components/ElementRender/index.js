/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime : 2020-11-17 17:03:19
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
      default: () => new LbpElement({})
    }
  },
  created () {
    this.element.setVm(this)
  },
  render () {
    const element = this.element
    return (
      <ShapeLayer elStyle={element.style} on={this.$listeners}>
        <AnimateLayer animations={element.animations}>
          <Render elProps={element.props} elName={element.name}></Render>
        </AnimateLayer>
      </ShapeLayer>
    )
  }
}
