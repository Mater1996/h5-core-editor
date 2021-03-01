/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-21 10:08:01
 * @Description :
 */
export default {
  name: 'TitleMenu',
  render () {
    const addPageText = this.$t('editor.pageManager.action.add')
    const copyPageText = this.$t('editor.pageManager.action.copy')
    const deletePageText = this.$t('editor.pageManager.action.delete')
    return (
      <div trigger={['hover']} placement="bottomCenter">
        <div
          slot="overlay"
          onClick={({ key }) => this.$emit('selectMenuItem', key)}
        >
          <div key="add">
            {addPageText}
          </div>
          <div key="copy">
            {copyPageText}
          </div>
          <div key="delete">
            {deletePageText}
          </div>
        </div>
      </div>
    )
  }
}
