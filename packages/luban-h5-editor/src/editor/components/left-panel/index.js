/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-21 10:56:52
 * @Description :
 */
import { Tabs, Tab } from '../../../components/vue-tabs-component'
import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'

export default {
  name: 'LeftPanel',
  props: {
    pages: {
      type: Array,
      default: () => []
    }
  },
  render (h) {
    return (
      <div>
        <Tabs options={{ useUrlFragment: false }} tabBarGutter={10}>
          <Tab name="插件" tab={this.$t('editor.sidebar.components')}>
            <RenderShortcutsPanel onAdd={this.$listeners.addElement} />
          </Tab>
          <Tab name="页面" tab={this.$t('editor.sidebar.pages')}>
            <RenderPageManager
              pages={this.pages}
              onAdd={this.$listeners.addPage}
              onPageChange={this.$listeners.pageChange}
            />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
