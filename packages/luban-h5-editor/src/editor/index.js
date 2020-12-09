/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-12-04 16:15:33
 * @Description :
 */
import 'font-awesome/css/font-awesome.min.css'
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'
import { debounce } from 'lodash'

import '@/styles/index.scss'
import '@/plugins'
import i18n from '@/locales'
import history from '@/utils/history'

import config from './config'
import LbpWork from './models/LbpWork'
import LbpPage from './models/LbpPage'
import LbpElement from './models/LbpElement'
import LbpCanvas from './components/lbp-canvas'
import FixedTools from './components/fixed-tools/index'
import EditorRightPanel from './components/right-panel'
import EditorLeftPanel from './components/left-panel'
import AuxiliayLine from './components/AuxiliayLine'
import AdjustHeight from './components/AdjustHeight'
import AdjustLineV from './components/adjust-line/vertical'

const LpbH5Editor = {
  name: 'lbp-h5-editor',
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
        this.work = new LbpWork(data)
        history.init(this.work)
      },
      immediate: true
    }
  },
  methods: {
    record: debounce(function () {
      history.addState(this.work)
    }, 80),
    getData () {
      return this.work
    },
    changePageIndex (index) {
      this.pageIndex = index
    },
    addPage (title) {
      this.work.pages.push(new LbpPage({ title }))
      this.record()
    },
    updatePage (data) {
      Object.assign(this.currentPage, data)
      this.record()
    },
    addElement (...elements) {
      elements.forEach(element => {
        if (element instanceof LbpElement) {
          this.currentPage.elements.push(element)
        } else {
          const lbpElement = new LbpElement(element)
          this.currentPage.elements.push(lbpElement)
        }
      })
      this.record()
    },
    updateElement (data) {
      this.activeElement && this.activeElement.update(data)
      this.record()
    },
    clear () {
      this.currentPage.elements = []
      this.record()
    },
    undo () {
      this.work = new LbpWork(history.undo())
    },
    redo () {
      this.work = new LbpWork(history.redo())
    },
    _hideAuxiliay () {
      this.auxiliayVisible = false
    },
    _showAuxiliay () {
      this.auxiliayVisible = true
    },
    _handleElementActive (element) {
      this.activeElement = element
    },
    _handleElementDeactive (deactiveElement) {
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
    },
    _handleAdjustLieMove (offset) {
      this.rightPanelWidth += offset
    },
    _handlePropsChange (value) {
      this.updateElement({ props: value })
    },
    _handleAnimationsChange (value) {
      this.updateElement({ animations: value })
    },
    _handleElementRectChange (value) {
      this.updateElement({ style: value })
    },
    _handleAddElement (data) {
      this.addElement({
        pluginName: data.name,
        style: data.dragStyle
      })
    },
    _handleAddPage (data) {
      this.addPage(data)
    },
    _handlePageHeightChange (height) {
      this.updatePage({ height })
    },
    _handlePageIndexChange (index) {
      this.changePageIndex(index)
    },
    _handleRedo () {
      this.redo()
    },
    _handleUndo () {
      this.undo()
    }
  },
  render () {
    return (
      <a-layout style={{ height: '100%' }}>
        <EditorLeftPanel
          pages={this.work.pages}
          onPageChange={this._handlePageIndexChange}
          onAddElement={this._handleAddElement}
          onAddPage={this._handleAddPage}
        />
        <a-layout id="editor-wrapper">
          <a-layout-content class="scroll-view remove-scrollbar">
            <div
              class="editor-content"
              onMousedown={this._showAuxiliay}
              onMouseup={this._hideAuxiliay}
            >
              <AuxiliayLine
                data={this.elementsRect}
                width={this.currentPage.width}
                height={this.currentPage.height}
                v-show={this.auxiliayVisible}
              />
              <LbpCanvas
                width={this.currentPage.width}
                height={this.currentPage.height}
                elements={this.currentPage.elements}
                onElementActive={this._handleElementActive}
                onElementDeactive={this._handleElementDeactive}
                onElementChange={this._handleElementRectChange}
              />
              <AdjustHeight
                height={this.currentPage.height}
                onChange={this._handlePageHeightChange}
              />
            </div>
          </a-layout-content>
        </a-layout>
        <AdjustLineV onLineMove={this._handleAdjustLieMove} />
        <FixedTools onRedo={this._handleRedo} onUndo={this._handleUndo} />
        <EditorRightPanel
          width={this.rightPanelWidth}
          element={this.activeElement}
          onPropsChange={this._handlePropsChange}
          onAnimationsChange={this._handleAnimationsChange}
        />
      </a-layout>
    )
  }
}

export default LpbH5Editor
