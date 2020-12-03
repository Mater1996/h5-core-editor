/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-19 20:10:47
 * @Description :
 */

import pluginsControl from '@/plugins'
import { isFunction } from 'lodash'
import { ShapeLayerDefaultProps } from '../components/lbp-canvas/components/LbpElementRender/ShapeLayer'

let id = 0
class LbpElement {
  constructor (options = {}) {
    const {
      pluginName = '',
      props = {},
      style = {},
      attrs = {},
      animations = []
    } = options
    if (pluginName) {
      this.id = id++
      this.pluginName = pluginName
      const plugin = pluginsControl.getPlugin(pluginName)
      // 传入具体的element render 的 参数
      this.props = {
        ...LbpElement.getPluginProps(plugin.component),
        ...props
      }
      // 传入具体的element render 的 属性
      this.attrs = {
        ...attrs
      }
      // 传入具体的element render 的 样式
      this.class = {
        ...options.class
      }
      // 传入 shapeLayer 以改变位置以及大小
      this.style = {
        ...ShapeLayerDefaultProps,
        ...style
      }
      // 传入 animateLayer 以实现动画效果
      this.animations = [...animations]
    } else {
      console.error('lbpElement need a name of plugin ：pluginName')
    }
  }

  clone ({ zIndex = this.zIndex + 1 } = {}) {
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

  update ({ props, style, animations }) {
    props && Object.assign(this.props, props)
    style && Object.assign(this.style, style)
    if (animations) {
      Object.assign(this.animations, animations)
      this.animations.length = animations.length
    }
  }

  static getPluginProps (component) {
    const props = {}
    const { props: propsDefine } = component
    Object.entries(propsDefine).forEach(([key, prop]) => {
      props[key] = LbpElement.getPropDefaultValue(null, prop)
    })
    return props
  }

  static getPropDefaultValue (vm, prop) {
    if (!Object.prototype.hasOwnProperty.call(prop, 'default')) {
      return undefined
    }
    const def = prop.default
    return isFunction(def) ? def.call(vm) : def
  }
}

export default LbpElement
