/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-17 13:41:12
 * @Description :
 */
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
import Page from './models/page'
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
      default () {
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
  computed: {
    currentPage () {
      const { pages = [] } = this.work
      const currentPage = pages[this.pageIndex] || {}
      return currentPage
    },
    elementsRect () {
      const { currentPage = {} } = this
      const { elements = [] } = currentPage
      return elements.map(({ style }) => style)
    }
  },
  watch: {
    data: {
      handler (data = {}) {
        this.work = new Work(data)
        console.log(this.work)
      },
      immediate: true
    },
    currentPage (currentPage = {}) {
      const { elements = [] } = currentPage
      this.$editor.clear()
      this.$editor.addElement(...elements)
    }
  },
  mounted () {
    this.$editor = this.$refs.editor
    this.$editor.addElement(...this.currentPage.elements)
  },
  methods: {
    hideAuxiliay () {
      this.auxiliayVisible = false
    },
    showAuxiliay () {
      this.auxiliayVisible = true
    },
    handlePageHeightChange (height) {
      this.currentPage.height = height
    },
    getData () {
      return this.$store.state.editor.work
    },
    handleElementActive (element) {
      this.activeElement = element
    },
    handleElementDeactive (deactiveElement) {
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
    },
    handlePropsChange (value) {
      this.$editor.updateElement({ props: value })
    },
    handleAnimationsChange (value) {
      this.$editor.updateElement({ animations: value })
    },
    handleAddElement ({ name }) {
      const element = new CoreRender.LbpElement({ name })
      this.currentPage.elements.push(element)
      this.$editor.addElement(element)
    },
    handleAddPage (title) {
      this.work.pages.push(new Page({ title }))
    },
    handleAdjustLieMove (offset) {
      this.rightPanelWidth += offset
    },
    handlePageChange (index) {
      this.pageIndex = index
    }
  },
  render () {
    return (
      <a-layout style={{ height: '100%' }}>
        <EditorLeftPanel
          pages={this.work.pages}
          onPageChange={this.handlePageChange}
          onAddElement={this.handleAddElement}
          onAddPage={this.handleAddPage}
        />
        <a-layout id="editor-wrapper">
          <a-layout-content class="scroll-view remove-scrollbar">
            <div
              class="editor-content"
              onMousedown={this.showAuxiliay}
              onMouseup={this.hideAuxiliay}
            >
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
        <AdjustLineV onLineMove={this.handleAdjustLieMove} />
        <FixedTools />
        <EditorRightPanel
          width={this.rightPanelWidth}
          element={this.activeElement}
          onPropsChange={this.handlePropsChange}
          onAnimationsChange={this.handleAnimationsChange}
        />
      </a-layout>
    )
  }
}

export default Editor
