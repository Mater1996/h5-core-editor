/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 15:49:25
 * @Description :
 */

import { ShapeLayerDefaultProps } from '../components/ShapeLayer'
import pluginsControl from '@/plugins'

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
      this.isRem = isRem
      this.vm = vm
      this.disabled = disabled
      const plugin = pluginsControl.getPlugin(name)
      const defaultPluginProps = LbpElement.getPluginProps(plugin.component)
      this.props = {
        ...ShapeLayerDefaultProps,
        ...defaultPluginProps,
        ...props
      }
      this.events = events
      this.animations = animations
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

  updateProps(props) {
    return Object.assign(this.props, props)
  }

  updateAnimations(animations) {
    return (this.animations = animations)
  }

  setVm(vm) {
    this.vm = vm
  }

  static getPluginProps(component) {
    const props = {}
    const { props: propsDefine } = component
    Object.entries(propsDefine).forEach(([key, prop]) => {
      props[key] = LbpElement.getPropDefaultValue(null, prop)
    })
    return props
  }

  static getPropDefaultValue(vm, prop) {
    if (!prop.hasOwnProperty('default')) {
      return undefined
    }
    const def = prop.default
    return typeof def === 'function' ? def.call(vm) : def
  }
}

export default LbpElement
