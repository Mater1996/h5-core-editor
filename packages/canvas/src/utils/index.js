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
 * @LastEditTime: 2021-03-03 16:09:42
 * @Description :
 */
import { isNumber } from 'lodash'

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
    let v = value
    if (isNumber(v)) {
      switch (unit) {
        case 'rem':
          v = v / rootValue
          break
      }
      v += unit
    }
    newStyle[key] = v
  })
  return newStyle
}

export function isPromise (value) {
  return value && typeof value.subscribe !== 'function' && typeof value.then === 'function'
}
