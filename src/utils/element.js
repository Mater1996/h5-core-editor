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
