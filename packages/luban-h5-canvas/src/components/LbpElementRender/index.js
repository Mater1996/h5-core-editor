/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime: 2021-01-14 16:21:45
 * @Description :
 */
import Render from './Render'
import ShapeLayer from './ShapeLayer'
import AnimateLayer from './AnimateLayer'

export default {
  props: {
    element: {
      type: Object,
      require: true
    }
  },
  methods: {
    _handleChange (...args) {
      this.$emit('elementChange', ...args)
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
    const { style, animations } = element
    return (
      <ShapeLayer
        width={style.width}
        height={style.height}
        left={style.left}
        top={style.top}
        onChange={this._handleChange}
        onActive={this._handleActive}
        onDeactive={this._handleDeactive}
      >
        <AnimateLayer animations={animations}>
          <Render element={element}></Render>
        </AnimateLayer>
      </ShapeLayer>
    )
  }
}
