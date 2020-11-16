/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime : 2020-11-16 17:00:15
 * @Description :
 */
import Element from '../../models/element'
import Render from './Render'
import ShapeLayer from './ShapeLayer'
import AnimateLayer from './AnimateLayer'

export default {
  props: {
    element: {
      type: Element,
      default: () => new Element({})
    }
  },
  created() {
    this.element.setVm(this)
  },
  render() {
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
