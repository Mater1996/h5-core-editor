/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-15 11:24:40
 * @Description :
 */
import 'font-awesome/css/font-awesome.min.css'
import 'ant-design-vue/dist/antd.css'
import { Layout } from 'ant-design-vue'
import { debounce } from 'lodash'
import LbpH5Canvas, { Element } from 'luban-h5-canvas'

import '../styles/index.scss'
import i18n from '../locales'
import history from '../utils/history'

import config from './config'
import LbpWork from './models/LbpWork'
import LbpPage from './models/LbpPage'
import lbpPlugins from '../plugins'
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
    rightPanelWidth: config.rightPanelWidth,
    lockElementUpdate: false
  }),
  computed: {
    currentPage () {
      const { pages = [] } = this.work
      const currentPage = pages[this.pageIndex] || {}
      return currentPage
    },
    elementsRect () {
      const { currentPage = {}, activeElement } = this
      const { elements = [] } = currentPage
      return elements.filter(v => v !== activeElement).map(({ style }) => style)
    }
  },
  watch: {
    data: {
      handler (data = {}) {
        this.work = new LbpWork(data)
        history.init(this.work)
        console.log(this.work)
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
        if (element instanceof Element) {
          this.currentPage.elements.push(element)
        } else {
          const lbpElement = Element.create({
            ...element,
            component: lbpPlugins.getPlugin(element.pluginName).component
          })
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
    _handlerEditorMouseDown () {
      this.activeElement && this._showAuxiliay()
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
    /**
     * TODO 目前只做到了锁定元素在辅助线位置 但是未做到吸附动作
     * 因此需要判断当前拖拽的点 例如右侧影响宽 那么采取吸附的动作是增加宽度到辅助线
     */
    _handleElementRectChange: (function () {
      const lock = []
      const vHandler = ['l', 'm', 'r']
      const hHandler = ['t', 'm', 'b']
      const effectRegex = [/l/, /t/, /r|lm/, /b|mt/]
      const isFalse = v => v === false
      return function (value = {}, [point = 'mm'] = []) {
        const [vLines, hLines] = this.$refs.auxiliayLine.calcVHLine(value) || []
        const lockHandlerSet = new Set([])
        let hasVLine = false
        let hasHLine = false
        vLines.forEach((v, vk) => {
          hLines.forEach((h, hk) => {
            const hasV = !isFalse(v)
            const hasH = !isFalse(h)
            !hasVLine && (hasVLine = hasV)
            !hasHLine && (hasHLine = hasH)
            const res = `${hasV ? vHandler[vk] : ''}${hasH ? hHandler[hk] : ''}`
            if (res && new RegExp(res).test(point)) lockHandlerSet.add(res)
          })
        })
        const [lockLeft, lockTop, lockW, lockH] = lock
        lockLeft && delete value.left && delete value.width
        lockTop && delete value.top && delete value.height
        !lockLeft && lockW && delete value.width
        !lockTop && lockH && delete value.height
        this.updateElement({ style: value })
        const lockHandler = [...lockHandlerSet]
        const isLock = v => !!lockHandler.find(v.test.bind(v))
        const lockTypes = effectRegex.map(isLock)
        Object.assign(lock, point === 'mm' ? [hasVLine, hasHLine] : lockTypes)
      }
    })(),
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
              onMousedown={this._handlerEditorMouseDown}
              onMouseup={this._hideAuxiliay}
            >
              <AuxiliayLine
                ref="auxiliayLine"
                data={this.elementsRect}
                width={this.currentPage.width}
                height={this.currentPage.height}
                v-show={this.auxiliayVisible}
              />
              <LbpH5Canvas
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
