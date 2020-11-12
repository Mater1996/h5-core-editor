/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 16:35:48
 * @Description :
 */
export default {
  data: () => ({}),
  render() {
    const ele = this.editingElement
    if (!ele) return <span>{this.$t('editor.editPanel.common.empty')}</span>
    return <div>TODO</div>
  }
}
