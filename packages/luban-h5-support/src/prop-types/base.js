/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-02 10:38:47
 * @Description:
 */

function LbpPropEditor ({ editor, label, props }) {
  this.editor = editor
  this.label = label
  this.props = props
}

export const genLbpPropEditor = (editor, defaultOptions) => options => {
  const newOp = Object.assign({}, defaultOptions, options)
  return new LbpPropEditor({
    editor,
    label: newOp.label,
    props: newOp.props,
    type: newOp.type,
    default: newOp.default,
    validator: newOp.validator
  })
}
