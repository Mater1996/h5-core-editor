/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-02 10:38:47
 * @Description:
 */

function LbpPropEditor (options = {}) {
  const { name, label, props, type, validator } = options
  this.name = name
  this.label = label
  this.props = props
  this.type = type
  this.validator = validator
  this.default = options.default
}

export const genLbpPropEditor = (name, defaultOptions) => options => {
  const newOp = Object.assign({}, defaultOptions, options)
  return new LbpPropEditor({
    name,
    label: newOp.label,
    props: newOp.props,
    type: newOp.type,
    default: newOp.default,
    validator: newOp.validator
  })
}
