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
  inject: ['h5'],
  mounted () {
    const { $refs } = this
    const { lubanElement } = $refs
    this.$lubanElement = lubanElement
    if (!this.element.__element__) {
      Object.defineProperties(this.element, {
        __element__: {
          value: lubanElement
        }
      })
    }
  },
  methods: {
    _handleChange (value) {
      this.element.onChange('rate', value)
    }
  },
  render () {
    const { element } = this
    const { style, props, subDataSource } = element
    const component = element.getComponent()
    const dataSourceReceive = element.getDataSourceReceiveProps()
    const componentDataSource = subDataSource.reduce((a, b) => {
      a[b] = this.h5.data[b]
      return a
    }, {})
    const dataSourceProp = {
      [Object.keys(dataSourceReceive)[0]]: componentDataSource
    }
    return (
      component && (
        <component
          ref="lubanElement"
          props={{ ...props, ...dataSourceProp }}
          style={renderStyle(style)}
          onChange={this._handleChange}
        ></component>
      )
    )
  }
}
