/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-02 16:53:57
 * @Description:
 */
/* eslint-disable spaced-comment */
import { genLubanSupport } from './prop-types/base'

export const Switch = /*#__PURE__*/ genLubanSupport('Switch', { type: Boolean })
export const InputNumber = /*#__PURE__*/ genLubanSupport('InputNumber', { type: Number })
export const Input = /*#__PURE__*/ genLubanSupport('Input', { type: String })
export const Select = /*#__PURE__*/ genLubanSupport('Select', { type: null })

export default {
  Switch,
  InputNumber,
  Input,
  Select
}
