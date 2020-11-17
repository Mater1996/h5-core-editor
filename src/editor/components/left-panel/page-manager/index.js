/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-17 11:08:04
 * @Description :
 */
import { Button } from 'ant-design-vue'
import PageTitleEditor from './title-editor'
import PageTitleMenu from './title-menu'
import PageTitleText from './title-text'

export default {
  name: 'page-manager',
  props: {
    pages: {
      type: Array,
      default: []
    }
  },
  components: {
    [Button.name]: Button
  },
  data: () => ({
    pageIndex: -1 // 显示编辑按钮
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
        <a-button
          icon="plus"
          type="dashed"
          class="footer-actions"
          onClick={() => this.onSelectMenuItem('add')}
        >
          {this.$t('editor.pageManager.action.add')}
        </a-button>
      </div>
    )
  }
}
