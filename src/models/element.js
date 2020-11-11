/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-11 09:47:48
 * @Description :
 */
export const defaultProps = {
  top: 0,
  left: 0,
  width: 100,
  height: 40
}
class Element {
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
    this.name = name
    this.uuid = uuid
    this.props = Object.assign({ ...defaultProps }, props)
    this.events = events
    this.animations = animations
    this.isRem = isRem
    this.vm = vm
    this.disabled = disabled
  }

  clone({ zIndex = this.zIndex + 1 } = {}) {
    return new Element({
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

  setVm(vm) {
    this.vm = vm
  }
}

export default Element
