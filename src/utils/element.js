import Vue from 'vue'

const styleKey = 'commonStyle'

export function getVM(pluginName) {
  const Ctor = Vue.component(pluginName)
  return new Ctor()
}

export function swapZindex(x, y) {
  const tmp = y[styleKey].zindex
  y[styleKey].zindex = x[styleKey].zindex
  x[styleKey].zindex = tmp
}

/**
 * !#zh 将 px 转换为 rem
 * @param {Number} px
 */
function px2Rem(px) {
  const rem = (px * 2) / 100 + 'rem'
  return rem
}

/**
 *
 * @param {Number} px 元素的某个属性的像素值，比如 height
 * @param {Boolean} isToRem 是否将 px 转换为 rem
 */
export function parsePx(px, isRem = false) {
  if (isRem) return px2Rem(px)
  return `${px}px`
}

export const genUUID = () => {
  // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  )
}
/**
 * Get the default value of a prop.
 * copy with vue source code
 */

export function getPropDefaultValue(vm, prop) {
  // no default, return undefined
  if (!prop.hasOwnProperty('default')) {
    return undefined
  }
  const def = prop.default
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' ? def.call(vm) : def
}
