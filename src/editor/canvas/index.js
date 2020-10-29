/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-27 15:04:59
 * @LastEditTime : 2020-10-29 09:40:52
 * @Description :
 */
import { mapState, mapActions } from 'vuex'

import RenderEditCanvas from './edit'
import RenderPreviewCanvas from './preview'

export default {
  name: 'EditorCanvas',
  data: () => ({
    isPreviewMode: false
  }),
  computed: {
    ...mapState('editor', {
      editingPage: state => state.editingPage,
      editingElement: state => state.editingElement,
      elements: state => state.editingPage.elements,
      pages: state => state.work.pages,
      work: state => state.work,
      scaleRate: state => state.scaleRate
    })
  },
  methods: {
    ...mapActions('editor', ['setEditingElement']),
    handleToggleMode (isPreviewMode) {
      this.isPreviewMode = isPreviewMode
      if (isPreviewMode) {
        // 当切换到预览模式的时候，清空当前编辑元素
        this.setEditingElement() // 相当于  setEditingElement(null)
      }
    }
  },
  created () {
    console.log(this.elements)
  },
  render (h) {
    return (
      <a-layout id="canvas-outer-wrapper" style={{ 'margin-bottom': '24px' }}>
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
        <a-layout-content
          style={{
            transform: `scale(${this.scaleRate})`,
            'transform-origin': 'center top'
          }}
        >
          <div
            class="canvas-wrapper"
            style={{
              height: `${this.work.height}px`
            }}
          >
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
