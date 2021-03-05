/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-03-05 14:46:59
 * @Description :
 */
import { debounce } from 'lodash'
import LubanH5Canvas from '@luban-h5/canvas'
import lubanH5 from 'luban-h5'

import i18n from '../locales'
import history from '../utils/history'

import config from '../config'
import EditorRightPanel from './components/right-panel'
import EditorLeftPanel from './components/left-panel'
import AuxiliayLine from './components/auxiliay-line'
import AdjustHeight from './components/adjust-height'
import AdjustLine from './components/adjust-line'

const LpbH5Editor = {
  name: 'LubanH5Editor',
  i18n,
  props: {
    h5: {
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
    h5: {
      handler (h5 = {}) {
        this.work = h5
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
    addPage (page) {
      this.work.addPage(page)
      this.record()
    },
    deletePage (index) {
      this.work.deletePage(index)
    },
    updatePage (data) {
      Object.assign(this.currentPage, data)
      this.record()
    },
    addElement (...elements) {
      this.currentPage.addElement(...elements)
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
      this.work = lubanH5.create(history.undo())
    },
    redo () {
      this.work = lubanH5.create(history.redo())
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
      console.log('active', element)
      this.activeElement = element
    },
    _handleElementDeactive (deactiveElement) {
      console.log('deactive', deactiveElement)
      if (deactiveElement === this.activeElement) this.activeElement = null
    },
    _handleAdjustLieMove (offset) {
      this.rightPanelWidth -= offset
    },
    _handlePropsChange (value) {
      this.updateElement({ props: value })
    },
    _handleStyleChange (value) {
      this.updateElement({ style: value })
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
      this.addElement(data)
    },
    _handleAddPage (data) {
      this.addPage(data)
    },
    _handleDeletePage (index) {
      this.deletePage(index)
    },
    _handleCopyPage (index) {
      const newPage = this.work.pages[index].clone()
      this.addPage(newPage)
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
      <div class="luban-h5-editor flex flex-row justify-between h-full">
        <EditorLeftPanel
          class="section plugins flex flex-none w-64 overflow-auto h-full box-border"
          pages={this.work.pages}
          dropTarget=".luban-h5-canvas"
          onPageChange={this._handlePageIndexChange}
          onAddElement={this._handleAddElement}
          onAdd={this._handleAddPage}
          onDelete={this._handleDeletePage}
          onCopy={this._handleCopyPage}
        />
        <div
          class="section container flex flex-1 justify-center px-4 pb-8 pt-16 bg-gray-200"
          id="editor-wrapper"
        >
          <div class="scroll-view remove-scrollbar overflow-auto h-full text-center">
            <div
              class="editor-content inline-block relative self-center"
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
              <LubanH5Canvas
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
          </div>
        </div>
        <AdjustLine onLineMove={this._handleAdjustLieMove} />
        <EditorRightPanel
          class="section feature w-72"
          width={this.rightPanelWidth}
          element={this.activeElement}
          onPropsChange={this._handlePropsChange}
          onStyleChange={this._handleStyleChange}
          onAnimationsChange={this._handleAnimationsChange}
        />
      </div>
    )
  }
}

export default LpbH5Editor
