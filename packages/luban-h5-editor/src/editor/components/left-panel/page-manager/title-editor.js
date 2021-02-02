/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-21 10:07:53
 * @Description :
 */
export default {
  name: 'TitleEditor',
  props: ['page', 'pageIndex'],
  data: () => ({
    editingTitle: '' // 临时缓存当前编辑的 title，点击 Yes 再真正用其更新 page title
  }),
  methods: {
    getTitle () {
      return (
        this.page.title ||
        this.$t('editor.pageManager.title', { index: this.pageIndex })
      )
    }
  },
  render () {
    return (
      <div
        placement="bottom"
        onConfirm={() => {
          this.$emit('editTitle', {
            newTitle: this.editingTitle,
            pageIndex: this.pageIndex
          })
        }}
        onCancel={() => {}}
        okText="Yes"
        cancelText="No"
      >
        <input
          slot="title"
          value={this.editingTitle}
          size="small"
          onChange={e => {
            this.editingTitle = e.target.value
          }}
        ></input>
      </div>
    )
  }
}
