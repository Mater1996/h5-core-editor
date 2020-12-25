/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime: 2020-12-24 16:36:28
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
  methods: {
    _handleChange (value) {
      this.$emit('elementChange', value)
    },
    _handleActive () {
      this.$emit('elementActive', this.element)
    },
    _handleDeactive () {
      this.$emit('elementDeactive', this.element)
    }
  },
  render () {
    const { element } = this
    return (
      <ShapeLayer
        elStyle={element.style}
        onChange={this._handleChange}
        onActive={this._handleActive}
        onDeactive={this._handleDeactive}
      >
        <AnimateLayer animations={element.animations}>
          <Render element={element}></Render>
        </AnimateLayer>
      </ShapeLayer>
    )
  }
}
