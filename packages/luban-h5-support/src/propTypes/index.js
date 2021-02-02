import Select from 'ant-design-vue/lib/select'
import 'ant-design-vue/lib/select/style/css'
import Switch from 'ant-design-vue/lib/switch'
import 'ant-design-vue/lib/switch/style/css'
import Input from 'ant-design-vue/lib/input'
import 'ant-design-vue/lib/input/style/css'
import InputNumber from 'ant-design-vue/lib/input-number'
import 'ant-design-vue/lib/input-number/style/css'

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
export const boolean = genLbpPropEditor(Switch, { type: Boolean })
// 数字
export const number = genLbpPropEditor(InputNumber, {
  type: Number
})
// 字符串
export const string = genLbpPropEditor(Input, {
  type: String
})
// 选项
export const select = genLbpPropEditor(Select, {
  type: null
})

export default {
  boolean,
  number,
  string,
  select
}
