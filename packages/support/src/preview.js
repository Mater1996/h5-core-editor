/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-03 14:22:51
 * @Description:
 */
/* eslint-disable spaced-comment */
import { genLubanSupport } from './prop-types/base'

export const Switch = /*#__PURE__*/ genLubanSupport(null, { type: Boolean })
export const InputNumber = /*#__PURE__*/ genLubanSupport(null, { type: Number })
export const Input = /*#__PURE__*/ genLubanSupport(null, { type: String })
export const Select = /*#__PURE__*/ genLubanSupport(null, { type: null })
export const DataSourceReceive = /*#__PURE__*/ genLubanSupport('DataSourceReceive', {
  type: null,
  label: '数据'
})

export default {
  Switch,
  InputNumber,
  Input,
  Select,
  DataSourceReceive
}
