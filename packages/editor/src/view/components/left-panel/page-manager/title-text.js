/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-21 10:08:09
 * @Description :
 */
export default {
  name: 'TitleText',
  props: ['page', 'pageIndex'],
  methods: {
    getTitle () {
      return (
        this.page.title ||
        this.$t('editor.pageManager.title', { index: this.pageIndex })
      )
    }
  },
  render (h) {
    return (
      <span>
        <span
          count={this.pageIndex + 1}
          numberStyle={{
            backgroundColor: '#fff',
            color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset'
          }}
        />
        <span class="ml-3">{this.getTitle()}</span>
      </span>
    )
  }
}
