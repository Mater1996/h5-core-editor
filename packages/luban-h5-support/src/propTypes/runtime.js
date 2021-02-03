/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-03 14:22:51
 * @Description:
 */
import LbpPropEditor from './base'

const genLbpPropEditor = (editor, defaultOptions) => (
  options = { ...defaultOptions }
) =>
  new LbpPropEditor({
    editor,
    label: options.label,
    props: options.props,
    type: options.type,
    default: options.default,
    validator: options.validator
  })

// 布尔
export const boolean = genLbpPropEditor(null, { type: Boolean })
// 数字
export const number = genLbpPropEditor(null, {
  type: Number
})
// 字符串
export const string = genLbpPropEditor(null, {
  type: String
})
// 选项
export const select = genLbpPropEditor(null, {
  type: null
})

export default {
  boolean,
  number,
  string,
  select
}
