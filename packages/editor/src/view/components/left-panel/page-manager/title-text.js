/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-03-01 16:49:53
 * @Description :
 */
export default {
  name: 'TitleText',
  props: ['page', 'pageIndex'],
  methods: {
    getTitle () {
      return (
        this.$t('editor.pageManager.title', { index: this.pageIndex + 1 })
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
        <span class="text-base font-medium text-gray-900">{this.getTitle()}</span>
      </span>
    )
  }
}
