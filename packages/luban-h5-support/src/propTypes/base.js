/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-02 10:38:47
 * @Description:
 */
export default class LbpPropEditor {
  constructor ({
    editor,
    label = '',
    props = {}
  }) {
    this.editor = editor
    this.label = label
    this.props = props
  }
}
