/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-06 17:29:57
 * @Description :
 */
import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import RenderPageTree from './page-tree/index.vue'
import { Layout, Tabs } from 'ant-design-vue'

export default {
  props: {
    pages: {
      type: Array,
      default: () => []
    }
  },
  components: {
    [Layout.Sider.name]: Layout.Sider,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane
  },
  name: 'EditorLeftPanel',
  render (h) {
    return (
      <a-layout-sider
        width="240"
        theme="light"
        style={{ padding: '0 12px', height: '100%', overflow: 'auto' }}
      >
        <a-tabs tabBarGutter={10}>
          <a-tab-pane
            key="plugin-list"
            tab={this.$t('editor.sidebar.components')}
          >
            <RenderShortcutsPanel onAdd={this.$listeners.addElement} />
          </a-tab-pane>
          <a-tab-pane key="page-manager" tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager
              pages={this.pages}
              onAdd={this.$listeners.addPage}
              onPageChange={this.$listeners.pageChange}
            />
          </a-tab-pane>
          <a-tab-pane key="page-tree" tab={this.$t('editor.sidebar.tree')}>
            <RenderPageTree />
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    )
  }
}
