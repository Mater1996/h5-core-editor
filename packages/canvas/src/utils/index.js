/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-01-06 14:39:08
 * @Description:
 */
/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-17 16:59:14
 * @LastEditTime: 2021-01-15 11:19:23
 * @Description :
 */
import { isNumber } from 'lodash'

export const hyphenateStyleName = function (name) {
  const uppercasePattern = /([A-Z])/g
  const msPattern = /^ms-/
  return name
    .replace(uppercasePattern, '-$1')
    .toLowerCase()
    .replace(msPattern, '-ms-')
}

/**
 * styleObj 转为 元素style
 * @param {*} styleObj style-in-js Object
 * @param {*} unit 单位
 * @param {*} config 配置
 * rootValue
 *
 */
export const renderStyle = function (
  styleObj,
  unit = 'px',
  { rootValue = 50 } = {}
) {
  const newStyle = {}
  Object.entries(styleObj).forEach(([key, value]) => {
    if (isNumber(value)) {
      switch (unit) {
        case 'rem':
          value = value / rootValue
          break
      }
    }
    const v = `${value}${unit}`
    const n = hyphenateStyleName(key)
    newStyle[n] = v
  })
  return newStyle
}

export function isPromise (value) {
  return value && typeof value.subscribe !== 'function' && typeof value.then === 'function'
}