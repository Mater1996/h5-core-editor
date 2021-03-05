/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-03-05 10:59:11
 * @Description :
 */

import { cloneDeep, pickBy } from 'lodash'
import { isPromise } from '../utils'

const ShapeLayerDefaultProps = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: 100,
  height: 40
}

const elementComponentMap = {}

let id = 0
class LubanElement {
  constructor (options = {}) {
    const {
      pluginName,
      component,
      props = {},
      style = {},
      attrs = {},
      animations = []
    } = options
    this.pluginName = pluginName
    this.id = id++
    // 传入具体的element render 的 参数
    this.props = {
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

    if (component) {
      LubanElement.saveComponent(this.id, component)
      this.props = {
        ...LubanElement.getComponentProps(component),
        ...this.props
      }
    }
  }

  /**
   * close一个新的lubanElement
   */
  clone () {
    return new LubanElement({
      ...cloneDeep(this),
      component: this.getComponent()
    })
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
    const component = this.getComponent()
    return pickBy(component.props, c => !!c.name)
  }

  /**
   * 获取当前element对应的组件
   */
  getComponent () {
    return elementComponentMap[this.id]
  }

  /**
   * 保存element对应的组件
   */
  static saveComponent (id, component) {
    elementComponentMap[id] = elementComponentMap[id] || component
  }

  /**
   * 获取element对应的组件
   */
  static getComponent (id) {
    return elementComponentMap[id]
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
  static getComponentAsync (component, cb) {
    const cachedComponent = LubanElement.getCachedComponent(component)
    if (cachedComponent) {
      return cb && cb(cachedComponent)
    } else {
      if (LubanElement.isSyncComponent(component)) {
        LubanElement.cacheComponent(component)
        cb && cb(component)
      } else {
        const c = component()
        if (isPromise(c)) {
          c.then(res => {
            const component = res.default
            LubanElement.cacheComponent(component)
            cb && cb(component)
          })
        } else {
          LubanElement.cacheComponent(c)
          cb && cb(c)
        }
      }
    }
  }

  /**
   * 获取组件的默认属性
   * @param {Object} component 组件
   */
  static getComponentProps (component) {
    const props = {}
    const { props: propsDefine } = component
    Object.entries(propsDefine).forEach(([key, prop]) => {
      props[key] = LubanElement.getPropDefaultValue(null, prop)
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

  static create (...options) {
    return new LubanElement(...options)
  }
}

export default LubanElement
