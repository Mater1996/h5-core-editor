/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-04 16:49:37
 * @Description:
 */
import { renderStyle } from '../../utils'
export default {
  props: {
    element: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    const { $refs } = this
    const { lubanElement } = $refs
    this.$lubanElement = lubanElement
    Object.defineProperties(this.element, {
      __element__: {
        value: lubanElement
      }
    })
  },
  render () {
    const { element } = this
    const { style, props } = element
    const component = element.getComponent()
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
}
