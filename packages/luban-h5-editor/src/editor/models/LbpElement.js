/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2020-12-29 10:45:40
 * @Description :
 */

import { cloneDeep } from 'lodash'
import { isPromise } from '@/utils'
import lbpH5Plugins from '@/plugins'
import { ShapeLayerDefaultProps } from '../components/lbp-canvas/components/LbpElementRender/ShapeLayer'

const cachedComponents = {}
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
      // 传入具体的element render 的 参数
      this.props = {
        ...props
      }
      LbpElement.getComponentAsync(pluginName, component => {
        this.props = {
          ...LbpElement.getComponentProps(component),
          ...this.props
        }
      })
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

  /**
   * close一个新的lbpElement
   */
  clone () {
    return new LbpElement(cloneDeep(this))
  }

  /**
   *
   * @param {Object} data // 需要更新的element数据包括props ,style,animations
   */
  update ({ props, style, animations }) {
    props && Object.assign(this.props, props)
    style && Object.assign(this.style, style)
    if (animations) {
      Object.assign(this.animations, animations)
      this.animations.length = animations.length
    }
  }

  /**
   * 获取可编辑的元素数据一般会直接取缓存
   */
  getEditorProps () {
    const component = LbpElement.getCachedComponent(this.pluginName)
    return Object.fromEntries(
      Object.entries(component.props).filter(([, value]) => value.editor)
    )
  }

  /**
   * 获取插件用于实例化element
   * @param {String} pluginName 插件名称
   */
  static getPlugin (pluginName) {
    return lbpH5Plugins.getPlugin(pluginName)
  }

  /**
   * 判断是否为一个同步组件
   * @param {Object} component 组件
   */
  static isSyncComponent (component) {
    return !(typeof component === 'function')
  }

  /**
   * 异步获取插件的组件
   * @param {String} pluginName 插件名称
   * @param {Function} cb 回调
   */
  static getComponentAsync (pluginName, cb) {
    const cachedComponent = LbpElement.getCachedComponent(pluginName)
    if (cachedComponent) {
      return cb && cb(cachedComponent)
    } else {
      const plugin = LbpElement.getPlugin(pluginName)
      const { component } = plugin
      if (LbpElement.isSyncComponent(component)) {
        cachedComponents[pluginName] = component
        cb && cb(component)
      } else {
        const c = component()
        if (isPromise(c)) {
          c.then(res => {
            const component = res.default
            cachedComponents[pluginName] = component
            cb && cb(component)
          })
        } else {
          cachedComponents[pluginName] = cb
          cb && cb(c)
        }
      }
    }
  }

  /**
   * 获取缓存的组件
   * @param {String}} pluginName 插件名称
   */
  static getCachedComponent (pluginName) {
    return cachedComponents[pluginName]
  }

  /**
   * 获取组件的默认属性
   * @param {Object} component 组件
   */
  static getComponentProps (component) {
    const props = {}
    const { props: propsDefine } = component
    Object.entries(propsDefine).forEach(([key, prop]) => {
      props[key] = LbpElement.getPropDefaultValue(null, prop)
    })
    return props
  }

  /**
   * 获取默认值
   * @param {VueComponent} vm
   * @param {Object} prop
   */
  static getPropDefaultValue (vm, prop) {
    if (!Object.prototype.hasOwnProperty.call(prop, 'default')) {
      return undefined
    }
    const def = prop.default
    return typeof def === 'function' ? def.call(vm) : def
  }
}

export default LbpElement
