/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2020-12-21 17:13:38
 * @Description : 右侧panel为修改 props， events, animations 等属性
 */
import { Layout, Tabs } from 'ant-design-vue'
import { pick } from 'lodash'
import RenderPropsEditor from './props'
import RenderScriptEditor from './script'
import RenderAnimationEditor from './animation'
import RenderActionEditor from './action'
import RenderBackgroundEditor from './background'

export default {
  name: 'ElementPropsEditor',
  components: {
    [Layout.Sider.name]: Layout.Sider,
    [Tabs.name]: Tabs,
    [Tabs.TabPane.name]: Tabs.TabPane
  },
  props: {
    width: {
      type: Number,
      default: 375
    },
    element: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    editPropsConfig () {
      const { element } = this
      if (element && element.pluginName) {
        console.log(element.getEditorProps())
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
    editAnimationValue () {
      const { element } = this
      const animations = element ? element.animations : []
      return animations
    }
  },
  data: () => ({
    activeTabKey: '属性'
  }),
  methods: {
    setActiveTab (activeTabKey) {
      this.activeTabKey = activeTabKey
    }
  },
  render () {
    return (
      <a-layout-sider
        width={this.width}
        theme="light"
        style={{ padding: '0 12px' }}
      >
        <a-tabs
          style="height: 100%;"
          tabBarGutter={10}
          defaultActiveKey={this.activeTabKey}
          activeKey={this.activeTabKey}
          onChange={this.setActiveTab}
        >
          <a-tab-pane key="属性">
            <span slot="tab">{this.$t('editor.editPanel.tab.prop')}</span>
            <RenderPropsEditor
              config={this.editPropsConfig}
              value={this.editPropsValue}
              onChange={this.$listeners.propsChange}
            />
          </a-tab-pane>
          <a-tab-pane
            label="动画"
            key="动画"
            tab={this.$t('editor.editPanel.tab.animation')}
          >
            <RenderAnimationEditor
              value={this.editAnimationValue}
              onChange={this.$listeners.animationsChange}
            />
          </a-tab-pane>
          <a-tab-pane
            label="动作"
            key="动作"
            tab={this.$t('editor.editPanel.tab.action')}
          >
            {this.activeTabKey === '动作' && <RenderActionEditor />}
          </a-tab-pane>
          <a-tab-pane
            label="脚本"
            key="脚本"
            tab={this.$t('editor.editPanel.tab.script')}
          >
            <RenderScriptEditor />
          </a-tab-pane>
          <a-tab-pane
            label="页面"
            key="页面"
            tab={this.$t('editor.editPanel.tab.page')}
          >
            {this.activeTabKey === '页面' && <RenderBackgroundEditor />}
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    )
  }
}
