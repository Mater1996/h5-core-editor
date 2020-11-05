/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-27 15:04:59
 * @LastEditTime : 2020-11-04 14:26:47
 * @Description :
 */
import { mapState, mapActions } from 'vuex'
import { Layout, Radio } from 'ant-design-vue'

import RenderEditCanvas from './edit'
import RenderPreviewCanvas from './preview'

export default {
  name: 'EditorCanvas',
  components: {
    [Radio.Button.name]: Radio.Button,
    [Radio.Group.name]: Radio.Group,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout
  },
  data: () => ({
    isPreviewMode: false
  }),
  computed: {
    ...mapState('editor', {
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work,
      scaleRate: state => state.scaleRate
    }),
    canvasStyle() {
      return {
        height: `${this.work.height}px`
      }
    },
    layoutStyle() {
      return {
        transform: `scale(${this.scaleRate})`,
        'transform-origin': 'center top',
        overflow: 'auto'
      }
    }
  },
  methods: {
    ...mapActions('editor', ['setEditingElement']),
    handleToggleMode(isPreviewMode) {
      this.isPreviewMode = isPreviewMode
      if (isPreviewMode) {
        // 当切换到预览模式的时候，清空当前编辑元素
        this.setEditingElement() // 相当于  setEditingElement(null)
      }
    }
  },
  render(h) {
    return (
      <a-layout id="canvas-outer-wrapper">
        <a-radio-group
          class="mode-toggle-wrapper"
          size="small"
          value={this.isPreviewMode}
          onInput={this.handleToggleMode}
        >
          {/* 编辑模式、预览模式 */}
          <a-radio-button label={false} value={false}>
            {this.$t('editor.centerPanel.mode.edit')}
          </a-radio-button>
          <a-radio-button label={true} value={true}>
            {this.$t('editor.centerPanel.mode.preview')}
          </a-radio-button>
        </a-radio-group>
        <a-layout-content style={this.layoutStyle}>
          <div class="canvas-wrapper" style={this.canvasStyle}>
            {this.isPreviewMode ? (
              <RenderPreviewCanvas elements={this.elements} />
            ) : (
              <RenderEditCanvas class="edit-mode" elements={this.elements} />
            )}
          </div>
        </a-layout-content>
      </a-layout>
    )
  }
}
