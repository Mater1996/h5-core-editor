/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 09:42:59
 * @Description :
 */

import pluginsControl from '@/plugins'

export const defaultProps = {
  top: 0,
  left: 0,
  width: 100,
  height: 40
}

class LbpElement {
  constructor({
    name = '',
    uuid = +new Date(),
    isRem = false,
    events = [],
    animations = [],
    props = {},
    disabled = false,
    vm = null
  } = {}) {
    if (name) {
      this.name = name
      this.uuid = uuid
      this.events = events
      this.animations = animations
      this.isRem = isRem
      this.vm = vm
      this.disabled = disabled
      const plugin = pluginsControl.getPlugin(name)
      const pluginProps = this.getPluginProps(plugin.component)
      this.props = Object.assign({}, defaultProps, pluginProps, props)
    } else {
      console.error('lbcanvas need a name of plugin')
    }
  }

  clone({ zIndex = this.zIndex + 1 } = {}) {
    return new LbpElement({
      zIndex,
      name: this.name,
      pluginProps: this.pluginProps,
      commonStyle: {
        ...this.commonStyle,
        top: this.commonStyle.top + 20,
        left: this.commonStyle.left + 20
      }
    })
  }

  mergeProps() {}

  setVm(vm) {
    this.vm = vm
  }

  /**
   * Get the default value of a prop.
   * copy with vue source code
   */

  getPluginProps(component) {
    const props = {}
    const { props: propsDefine } = component
    Object.entries(propsDefine).forEach(([key, prop]) => {
      props[key] = this.getPropDefaultValue(null, prop)
    })
    return props
  }

  getPropDefaultValue(vm, prop) {
    // no default, return undefined
    if (!prop.hasOwnProperty('default')) {
      return undefined
    }
    const def = prop.default
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' ? def.call(vm) : def
  }
}

export default LbpElement
