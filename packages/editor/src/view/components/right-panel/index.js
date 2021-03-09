/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-03-09 10:14:55
 * @Description : 右侧panel为修改 props， events, animations 等属性
 */
import { pick } from 'lodash'
import { Tabs, Tab } from '../../../components/tabs'
import RenderPropsEditor from './props'
import RenderLayoutEditor from './layout'
import RenderActionEditor from './action'
import RenderSubDataSource from './sub-data-source'

export default {
  name: 'RightPanel',
  props: {
    width: {
      type: Number,
      default: 0
    },
    element: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    editPropsConfig () {
      const { element } = this
      if (element) {
        return element.getEditorProps()
      } else {
        return {}
      }
    },
    editPropsValue () {
      const { element, editPropsConfig } = this
      const editPropsConfigKeys = Object.keys(editPropsConfig)
      const props = element ? element.props : {}
      return pick(props, editPropsConfigKeys)
    },
    editStylevalue () {
      const { element } = this
      const style = element ? element.style : {}
      return style
    },
    editAnimationValue () {
      const { element } = this
      const animations = element ? element.animations : []
      return animations
    },
    editSubDataSource () {
      const { element } = this
      const subDataSource = element ? element.subDataSource : []
      return subDataSource
    }
  },
  render () {
    return (
      <div style={{ width: `${this.width}px` }}>
        <Tabs options={{ useUrlFragment: false }}>
          <Tab name="属性" class="p-2">
            <RenderPropsEditor
              config={this.editPropsConfig}
              value={this.editPropsValue}
              onChange={this.$listeners.propsChange}
            />
          </Tab>
          <Tab name="布局" class="p-2">
            <RenderLayoutEditor
              element={this.element}
              value={this.editStylevalue}
              onChange={this.$listeners.styleChange}
            />
          </Tab>
          <Tab name="动画" class="p-2">
            {/* <RenderAnimationEditor
              value={this.editAnimationValue}
              onChange={this.$listeners.animationsChange}
            /> */}
          </Tab>
          <Tab name="动作" class="p-2">
            {<RenderActionEditor />}
          </Tab>
          <Tab name="订阅数据源" class="p-2">
            {
              <RenderSubDataSource
                subDataSource={this.editSubDataSource}
                onChange={this.$listeners.subDataSourceChange}
              />
            }
          </Tab>
        </Tabs>
      </div>
    )
  }
}
