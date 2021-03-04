/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-13 10:09:46
 * @LastEditTime: 2021-03-04 16:17:41
 * @Description :
 */
import { renderStyle } from '../../utils'

export default {
  name: 'ElementRender',
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    // const { $refs } = this
    // const { lubanElement, shapeLayer, animateLayer } = $refs
    // this.$lubanElement = lubanElement
    // Object.defineProperties(this.element, {
    //   __shapeLayer__: {
    //     value: shapeLayer
    //   },
    //   __animateLayer__: {
    //     value: animateLayer
    //   },
    //   __element__: {
    //     value: lubanElement
    //   }
    // })
  },
  methods: {
    renderElement (element) {
      const component = element.getComponent()
      const { style, props } = element
      return (
        component && (
          <component
            ref="lubanElement"
            props={props}
            style={renderStyle(style)}
          ></component>
        )
      )
    }
  },
  render () {
    return (
      <div class="element-layer">
        {this.elements.map(element => {
          return this.renderElement(element)
        })}
      </div>
    )
  }
}
