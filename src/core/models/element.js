/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-16 18:30:23
 * @Description :
 */

import { ShapeLayerDefaultProps } from '../components/Element/ShapeLayer/'
import pluginsControl from '@/plugins'
import { isFunction } from 'lodash'

class LbpElement {
  constructor(options = {}) {
    const {
      name = '',
      props = {},
      style = {},
      attrs = {},
      animations = [],
      vm = null
    } = options
    if (name) {
      this.name = name
      this.uuid = +new Date()
      this.vm = vm
      const plugin = pluginsControl.getPlugin(name)
      const pluginDefaultProps = LbpElement.getPluginProps(plugin.component)
      // 传入具体的element render
      this.props = {
        ...pluginDefaultProps,
        ...props
      }
      this.attrs = {
        ...attrs
      }
      this.class = {
        ...options.class
      }
      // 传入shapeLayer
      this.style = {
        ...ShapeLayerDefaultProps,
        ...style
      }
      this.animations = [...animations]
    } else {
      console.error('lbpElement need a name of plugin')
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

  update({ props, style, animations }) {
    props && Object.assign(this.props, props)
    style && Object.assign(this.style, style)
    if (animations) {
      Object.assign(this.animations, animations)
      this.animations.length = animations.length
    }
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
    return isFunction(def) ? def.call(vm) : def
  }
}

export default LbpElement
