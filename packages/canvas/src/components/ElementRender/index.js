/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime: 2021-03-02 16:30:57
 * @Description :
 */
import { cloneDeep } from 'lodash'
import ShapeLayer from './ShapeLayer'
import AnimateLayer from './AnimateLayer'

export default {
  name: 'ElementRender',
  props: {
    element: {
      type: Object,
      require: true
    }
  },
  watch: {
    element: {
      handler (newValue) {
        this._trigger('onLbpElementChange', cloneDeep(newValue))
      },
      deep: true
    }
  },
  mounted () {
    this.$lbpElement = this.$refs.lbpElement
  },
  methods: {
    _trigger (hookName, data) {
      const hook = this.element.getComponent()[hookName]
      hook && hook.call(this.$lbpElement, data)
    },
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
    const component = element.getComponent()
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
          {component ? (
            <component ref="lbpElement" props={element.props}></component>
          ) : null}
        </AnimateLayer>
      </ShapeLayer>
    )
  }
}
