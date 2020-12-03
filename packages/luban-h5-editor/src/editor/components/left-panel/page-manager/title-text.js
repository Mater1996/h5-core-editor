/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-02 10:41:22
 * @Description :
 */
import { Badge } from 'ant-design-vue'

export default {
  components: {
    [Badge.name]: Badge
  },
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
    // #!en: Page<Index>
    // #!zh: 第<Index>页面
    return (
      <span>
        <a-badge
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
