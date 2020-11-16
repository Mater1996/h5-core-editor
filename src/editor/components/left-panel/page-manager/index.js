/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-04 14:27:31
 * @Description :
 */
import { mapState, mapActions } from 'vuex'
import { Button } from 'ant-design-vue'
import PageTitleEditor from './title-editor'
import PageTitleMenu from './title-menu'
import PageTitleText from './title-text'

export default {
  name: 'page-manager',
  components: {
    [Button.name]: Button
  },
  data: () => ({
    hoverIndex: -1 // 显示编辑按钮
  }),
  computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      pages: state => state.work.pages
    })
  },
  methods: {
    ...mapActions('editor', [
      'elementManager',
      'pageManager',
      'saveWork',
      'setEditingPage'
    ]),
    onSelectMenuItem(menuKey) {
      this.pageManager({ type: menuKey })
    },
    onEditTitle({ pageIndex, newTitle }) {
      this.pageManager({ type: 'editTitle', value: { pageIndex, newTitle } })
      this.saveWork({ isSaveCover: false })
    },
    onSelectPage(pageIndex) {
      this.setEditingPage(pageIndex)
    },
    onLeave() {
      this.hoverIndex = -1
    }
  },
  render(h) {
    const addPageText = this.$t('editor.pageManager.action.add')
    return (
      <div class="page-manager-panel">
        {this.pages.map((page, index) => (
          <span
            class={[
              'cursor-pointer',
              'page-manager-panel__item',
              page.uuid === this.editingPage.uuid && 'active'
            ]}
            onClick={() => this.onSelectPage(index)}
            // https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/components/VHover/VHover.ts
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
          {addPageText}
        </a-button>
      </div>
    )
  }
}