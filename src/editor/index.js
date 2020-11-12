/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-12 15:15:52
 * @Description :
 */
import 'animate.css/animate.css'
import 'font-awesome/css/font-awesome.min.css'
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'

import '@/styles/index.scss'
import '@/plugins'
import store from '@/store'
import i18n from '@/locales'
import CoreRender from '@/core'

import FixedTools from './components/fixed-tools/index'
import EditorRightPanel from './components/right-panel/index'
import EditorLeftPanel from './components/left-panel/index'
import AuxiliayLine from './components/AuxiliayLine'
import AdjustHeight from './components/AdjustHeight'
import AdjustLineV from './components/adjust-line/vertical'
import Work from './models/work'
import config from './config'

const Editor = {
  name: 'lbp-editor',
  store,
  i18n,
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    work: {},
    pageIndex: 0,
    activeElement: null,
    auxiliayVisible: false,
    rightPanelWidth: config.rightPanelWidth
  }),
  watch: {
    data: {
      handler(data) {
        this.work = new Work(data)
        console.log(this.work)
      },
      immediate: true
    }
  },
  computed: {
    currentPage() {
      const { pages = [] } = this.work
      return pages[this.pageIndex]
    },
    elementsRect() {
      return this.currentPage.elements.map(({ props }) => props)
    }
  },
  mounted() {
    this.$editor = this.$refs['editor']
    this.$editor.addElement(...this.currentPage.elements)
  },
  methods: {
    hideAuxiliay() {
      this.auxiliayVisible = false
    },
    showAuxiliay() {
      this.auxiliayVisible = true
    },
    handlePageHeightChange(height) {
      this.currentPage.height = height
    },
    getData() {
      return this.$store.state.editor.work
    },
    handleElementActive(element) {
      this.activeElement = element
    },
    handleElementDeactive(deactiveElement) {
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
    },
    handlePropsChange(value) {
      this.$refs['editor'].updateActiveElement({ props: value })
    },
    handleAnimationsChange(value) {
      console.log(value)
      this.$refs['editor'].updateActiveElement({ animations: value })
    },
    handleAddElement({ name }) {
      this.$refs['editor'].addElement(new CoreRender.Element({ name }))
    }
  },
  render() {
    return (
      <a-layout>
        <a-layout style={{ height: '100%' }}>
          <EditorLeftPanel onAdd={this.handleAddElement} />
          <a-layout id="canvas-outer-wrapper">
            <a-layout-content
              class="scroll-view remove-scrollbar"
              onMouseup={this.hideAuxiliay}
              onMousedown={this.showAuxiliay}
            >
              <div class="content">
                <AuxiliayLine
                  data={this.elementsRect}
                  width={this.currentPage.width}
                  height={this.currentPage.height}
                  v-show={this.auxiliayVisible}
                />
                <CoreRender
                  ref="editor"
                  width={this.currentPage.width}
                  height={this.currentPage.height}
                  onActive={this.handleElementActive}
                  onDeactive={this.handleElementDeactive}
                />
                <AdjustHeight
                  height={this.currentPage.height}
                  onChange={this.handlePageHeightChange}
                />
              </div>
            </a-layout-content>
          </a-layout>
          <AdjustLineV
            onLineMove={offset => {
              this.rightPanelWidth += offset
            }}
          />
          <FixedTools />
          <EditorRightPanel
            width={this.rightPanelWidth}
            element={this.activeElement}
            onPropsChange={this.handlePropsChange}
            onAnimationsChange={this.handleAnimationsChange}
          />
        </a-layout>
      </a-layout>
    )
  }
}

export default Editor
