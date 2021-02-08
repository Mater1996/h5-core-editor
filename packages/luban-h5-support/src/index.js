/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-02 16:53:57
 * @Description:
 */
/* eslint-disable spaced-comment */
import { genLbpPropEditor } from './prop-types/base'

export const boolean = /*#__PURE__*/ genLbpPropEditor(null, { type: Boolean })
export const number = /*#__PURE__*/ genLbpPropEditor(null, {
  type: Number
})
export const string = /*#__PURE__*/ genLbpPropEditor(null, {
  type: String
})
export const select = /*#__PURE__*/ genLbpPropEditor(null, {
  type: null
})

export default {
  boolean,
  number,
  string,
  select
}
