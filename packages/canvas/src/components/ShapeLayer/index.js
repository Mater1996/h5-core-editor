/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-04 15:49:54
 * @Description:
 */
import Shape from './shape'
export default {
  name: 'ShapeLayer',
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    _trigger (hookName, data) {
      const hook = this.element.getComponent()[hookName]
      hook && hook.call(this.$lubanElement, data)
    },
    _handleChange (...args) {
      this.$emit('elementChange', ...args)
    },
    _handleActive (element) {
      this.$emit('elementActive', element)
    },
    _handleDeactive (element) {
      this.$emit('elementDeactive', element)
    }
  },
  render () {
    return (
      <div class="shape-layer">
        {this.elements.map(element => {
          const { style } = element
          return (
            <Shape
              ref="shapeLayer"
              left={style.left}
              top={style.top}
              width={style.width}
              height={style.height}
              onChange={(...args) => this._handleChange(...args, element)}
              onActive={() => this._handleActive(element)}
              onDeactive={() => this._handleDeactive(element)}
            />
          )
        })}
      </div>
    )
  }
}
