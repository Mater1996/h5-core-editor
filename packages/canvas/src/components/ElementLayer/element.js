/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-04 16:49:37
 * @Description:
 */
import { renderStyle, getPropertyValue, setPropertyValue } from '../../utils'
export default {
  props: {
    element: {
      type: Object,
      default: () => ({})
    }
  },
  inject: ['h5'],
  computed: {
    componentDataSourceReceiveKey () {
      const dataSourceReceive = this.element.getDataSourceReceiveProps()
      return Object.keys(dataSourceReceive)[0]
    },
    elementSubDataSourceKey () {
      const { subDataSource } = this.element
      return subDataSource[0]
    },
    componentDataSourceReceiveValue () {
      const dataSource = this.h5.getData()
      return getPropertyValue(dataSource, this.elementSubDataSourceKey)
    },
    dataSourceProp () {
      if (this.componentDataSourceReceiveKey) {
        return {
          [this.componentDataSourceReceiveKey]: this
            .componentDataSourceReceiveValue
        }
      } else {
        return {}
      }
    },
    appliedStyle () {
      return renderStyle(this.element.style)
    }
  },
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
      setPropertyValue(this.h5.getData(), value, this.elementSubDataSourceKey)
    }
  },
  render () {
    const { element } = this
    const { props, events } = element
    const component = element.getComponent()
    const options = {
      nativeOn: {
        ...events.reduce((result, [name, fn]) => {
          result[name] = fn
          return result
        }, {})
      }
    }
    return (
      component && (
        <component
          ref="lubanElement"
          {...options}
          props={{ ...props, ...this.dataSourceProp }}
          style={this.appliedStyle}
          onChange={this._handleChange}
        ></component>
      )
    )
  }
}
