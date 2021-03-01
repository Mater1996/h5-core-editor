/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-03-01 17:03:20
 * @Description :
 */
import './index.scss'
import PageTitleMenu from './title-menu'
import PageTitleText from './title-text'

export default {
  name: 'PageManager',
  props: {
    pages: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    pageIndex: 0 // 显示编辑按钮
  }),
  methods: {
    onSelectMenuItem (menuKey, index) {
      this.$emit(menuKey, index)
    },
    onEditTitle ({ pageIndex, newTitle }) {
      this.pageManager({ type: 'editTitle', value: { pageIndex, newTitle } })
    },
    onSelectPage (pageIndex) {
      this.pageIndex = pageIndex
      this.$emit('pageChange', pageIndex)
    }
  },
  render (h) {
    return (
      <div class="page-manager-panel">
        {this.pages.map((page, index) => (
          <div
            class={[
              'page-manager-panel__item cursor-pointer px-2 py-2',
              index === this.pageIndex && 'active bg-gray-100'
            ]}
            onClick={() => this.onSelectPage(index)}
          >
            <PageTitleText page={page} pageIndex={index} />
            <span>
              <PageTitleMenu onSelectMenuItem={(menuKey) => this.onSelectMenuItem(menuKey, index)} />
            </span>
          </div>
        ))}
        <button
          icon="plus"
          type="dashed"
          class="footer-actions text-indigo-600 hover:text-indigo-900 fixed text-center bottom-2"
          onClick={() => this.onSelectMenuItem('add')}
        >
          {this.$t('editor.pageManager.action.add')}
        </button>
      </div>
    )
  }
}
