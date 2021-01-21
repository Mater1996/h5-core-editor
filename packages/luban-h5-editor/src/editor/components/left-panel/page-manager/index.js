/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-21 10:07:41
 * @Description :
 */
import './index.scss'
import PageTitleEditor from './title-editor'
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
    onSelectMenuItem (menuKey) {
      this.$emit('add')
    },
    onEditTitle ({ pageIndex, newTitle }) {
      this.pageManager({ type: 'editTitle', value: { pageIndex, newTitle } })
    },
    onSelectPage (pageIndex) {
      this.pageIndex = pageIndex
      this.$emit('pageChange', pageIndex)
    },
    onLeave () {
      this.hoverIndex = -1
    }
  },
  render (h) {
    return (
      <div class="page-manager-panel">
        {this.pages.map((page, index) => (
          <span
            class={[
              'cursor-pointer',
              'page-manager-panel__item',
              index === this.pageIndex && 'active'
            ]}
            onClick={() => this.onSelectPage(index)}
            onMouseenter={() => {
              this.hoverIndex = index
            }}
          >
            <PageTitleText page={page} pageIndex={index} />
            <span>
              {this.hoverIndex === index && (
                <PageTitleEditor
                  page={page}
                  pageIndex={index}
                  onEditTitle={this.onEditTitle}
                />
              )}
              <PageTitleMenu onSelectMenuItem={this.onSelectMenuItem} />
            </span>
          </span>
        ))}
        <button
          icon="plus"
          type="dashed"
          class="footer-actions"
          onClick={() => this.onSelectMenuItem('add')}
        >
          {this.$t('editor.pageManager.action.add')}
        </button>
      </div>
    )
  }
}
