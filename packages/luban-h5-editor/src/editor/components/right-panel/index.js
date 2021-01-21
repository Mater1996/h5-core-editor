/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-01-21 10:20:51
 * @Description : 右侧panel为修改 props， events, animations 等属性
 */
import { pick } from 'lodash'
import RenderPropsEditor from './props'
import RenderActionEditor from './action'

export default {
  name: 'ElementPropsEditor',
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
      <div
        width={this.width}
        theme="light"
        style={{ padding: '0 12px' }}
      >
        <div
          style="height: 100%;"
          tabBarGutter={10}
          defaultActiveKey={this.activeTabKey}
          activeKey={this.activeTabKey}
          onChange={this.setActiveTab}
        >
          <div key="属性">
            <span slot="tab">{this.$t('editor.editPanel.tab.prop')}</span>
            <RenderPropsEditor
              config={this.editPropsConfig}
              value={this.editPropsValue}
              onChange={this.$listeners.propsChange}
            />
          </div>
          <div
            label="动画"
            key="动画"
            tab={this.$t('editor.editPanel.tab.animation')}
          >
            {/* <RenderAnimationEditor
              value={this.editAnimationValue}
              onChange={this.$listeners.animationsChange}
            /> */}
          </div>
          <div
            label="动作"
            key="动作"
            tab={this.$t('editor.editPanel.tab.action')}
          >
            {this.activeTabKey === '动作' && <RenderActionEditor />}
          </div>
        </div>
      </div>
    )
  }
}
