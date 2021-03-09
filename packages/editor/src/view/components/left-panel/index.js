/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-03-09 10:51:26
 * @Description : 左侧修改为修改H5数据 例如 page,data 等
 */
import { Tabs, Tab } from '../../../components/tabs'
import RenderShortcutsPanel from './shortcuts-panel/index'
import RenderPageManager from './page-manager/index'
import RenderDataSourceEditor from './data-source'

export default {
  name: 'LeftPanel',
  props: {
    pages: {
      type: Array,
      default: () => []
    },
    dropTarget: {
      type: String,
      default: 'body'
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  render (h) {
    return (
      <div>
        <Tabs options={{ useUrlFragment: false }} tabBarGutter={10}>
          <Tab name="插件">
            <RenderShortcutsPanel
              onAdd={this.$listeners.addElement}
              dropTarget={this.dropTarget}
            />
          </Tab>
          <Tab name="页面">
            <RenderPageManager pages={this.pages} on={this.$listeners} />
          </Tab>
          <Tab name="数据源">
            {
              <RenderDataSourceEditor
                dataSource={this.dataSource}
                onChange={this.$listeners.dataSourceChange}
              />
            }
          </Tab>
        </Tabs>
      </div>
    )
  }
}
