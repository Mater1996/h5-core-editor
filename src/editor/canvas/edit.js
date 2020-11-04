import { mapState, mapActions } from 'vuex'
import Shape from 'core/support/shape'
import ContextMenu from 'core/support/contexmenu'
import { InputNumber, Radio } from 'ant-design-vue'

export default {
  components: {
    [InputNumber.name]: InputNumber,
    [Radio.Button.name]: Radio.Button
  },
  props: ['elements', 'handleClickElementProp', 'handleClickCanvasProp'],
  data: () => ({
    vLines: [],
    hLines: [],
    contextmenuPos: []
  }),
  computed: {
    ...mapState('editor', ['editingElement', 'work'])
  },
  methods: {
    ...mapActions('editor', [
      'setEditingElement',
      'setElementPosition',
      'setElementShape',
      'recordElementRect',
      'elementManager',
      'updateWork'
    ]),
    // generate vertical line
    drawVLine(newLeft) {
      this.vLines = [{ left: newLeft }]
    },
    clearVLine() {
      this.vLines = []
    },
    // generate horizontal line
    drawHLine(newTop) {
      this.hLines = [{ top: newTop }]
    },
    clearHLine() {
      this.hLines = []
    },
    calcVHLine(isPointMove) {
      const uuid = this.editingElement.uuid
      const referElements = this.elements.filter(e => e.uuid !== uuid)
      let referElementsXCoords = []
      let referElementsYCoords = []
      referElements.forEach(e => {
        const width = e.commonStyle.width
        const left = e.commonStyle.left
        const height = e.commonStyle.height
        const top = e.commonStyle.top

        referElementsXCoords = [
          ...referElementsXCoords,
          left,
          left + width / 2,
          left + width
        ]
        referElementsYCoords = [
          ...referElementsYCoords,
          top,
          top + height / 2,
          top + height
        ]
      })

      // e代表 editingElement
      const eleft = this.editingElement.commonStyle.left
      const etop = this.editingElement.commonStyle.top
      const ewidth = this.editingElement.commonStyle.width
      const eheight = this.editingElement.commonStyle.height
      const exCoords = [eleft + ewidth, eleft + ewidth / 2, eleft]
      const eyCoords = [etop + eheight, etop + eheight / 2, etop]
      let hasVLine = false
      let hasHLine = false
      exCoords.forEach(eX => {
        referElementsXCoords.forEach(referX => {
          let offset = referX - eX
          if (Math.abs(offset) <= 5) {
            if (isPointMove) {
              this.setElementPosition({ width: ewidth + offset })
            } else {
              this.setElementPosition({ left: eleft + offset })
            }
            this.drawVLine(referX)
            hasVLine = true
          }
        })
      })
      eyCoords.forEach(eY => {
        referElementsYCoords.forEach(referY => {
          let offset = referY - eY
          if (Math.abs(offset) <= 5) {
            if (isPointMove) {
              this.setElementPosition({ height: eheight + offset })
            } else {
              this.setElementPosition({ top: etop + offset })
            }
            this.drawHLine(referY)
            hasHLine = true
          }
        })
      })
      if (!hasVLine) {
        this.clearVLine()
      }
      if (!hasHLine) {
        this.clearHLine()
      }
    },
    /**
     * #!zh: 在元素移动过程中，计算和生成辅助线
     */
    handleElementMove(pos) {
      this.setElementPosition(pos)
      this.calcVHLine(false)
    },
    handlePointMove(pos) {
      this.setElementPosition(pos)
      this.calcVHLine(true)
    },
    bindContextMenu(e) {
      // 优化右击菜单的显示，去除冗余的无效逻辑
      const { x, y } = this.$el.getBoundingClientRect()
      this.contextmenuPos = [e.clientX - x, e.clientY - y]
    },
    hideContextMenu() {
      this.contextmenuPos = []
    },
    handleClickCanvas(e) {
      if (!e.target.classList.contains('element-on-edit-canvas')) {
        this.setEditingElement()
      }
    },
    /**
     * 更新作品高度
     * @param {Number} height
     */
    updateWorkHeight(height) {
      this.updateWork({ height })
    },
    /**
     * TODO 封装 adjust editor scale 组件
     * scale: height/width
     * @param {MouseEvent} e
     */
    mousedownForAdjustLine(e) {
      let startY = e.clientY
      let startHeight = this.work.height

      const canvasOuterWrapper = document.querySelector('#canvas-outer-wrapper')

      let move = moveEvent => {
        // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
        moveEvent.stopPropagation()
        moveEvent.preventDefault()

        let currY = moveEvent.clientY
        let currentHeight = currY - startY + startHeight
        this.updateWorkHeight(currentHeight)
        // 交互效果：滚动条同步滚动至底部
        canvasOuterWrapper &&
          (canvasOuterWrapper.scrollTop = canvasOuterWrapper.scrollHeight)
      }

      let up = moveEvent => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }
  },
  render() {
    const elements = this.elements
    return (
      <div
        style={{ height: '100%', position: 'relative' }}
        onClick={e => {
          this.hideContextMenu()
          this.handleClickCanvas(e)
        }}
        onContextmenu={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {elements.map((element, index) => {
          if (element.name === 'lbp-background') {
            return <lbp-background {...element.getProps()}></lbp-background>
          }
          const data = {
            style: {
              width: '100%',
              height: '100%'
            },
            class: 'element-on-edit-canvas',
            props: {
              ...element.getProps(), // #6 #3,
              editorMode: 'edit'
            },
            on: {
              input: ({ value, pluginName }) => {
                if (pluginName === 'lbp-text') {
                  element.pluginProps.text = value
                }
              }
            }
          }
          return (
            <Shape
              onDelete={() => this.elementManager({ type: 'delete' })}
              style={element.getStyle({ position: 'absolute' })}
              defaultPosition={element.commonStyle} // {top, left}
              element={element}
              active={this.editingElement === element}
              handleMousedownProp={() => {
                this.hideContextMenu()
                this.setEditingElement(element)
              }}
              handlePointMoveProp={this.handlePointMove}
              handleElementMoveProp={this.handleElementMove}
              handleElementMouseUpProp={() => {
                this.clearHLine()
                this.clearVLine()
                this.recordElementRect()
              }}
              handlePointMouseUpProp={() => {
                this.clearHLine()
                this.clearVLine()
                this.recordElementRect()
              }}
              nativeOnContextmenu={e => {
                this.bindContextMenu(e)
              }}
            >
              <element.name {...data}></element.name>
            </Shape>
          )
        })}
        {this.vLines.map(line => (
          <div class="v-line" style={{ left: `${line.left}px` }}></div>
        ))}
        {this.hLines.map(line => (
          <div class="h-line" style={{ top: `${line.top}px` }}></div>
        ))}
        {this.contextmenuPos.length ? (
          <ContextMenu
            style={{
              left: this.contextmenuPos[0] + 'px',
              top: this.contextmenuPos[1] + 'px',
              userSelect: 'none',
              position: 'absolute',
              zIndex: 999
            }}
            onSelect={({ item, key, selectedKeys }) => {
              this.elementManager({ type: key })
              this.hideContextMenu()
            }}
            onHideMenu={this.hideContextMenu}
          />
        ) : null}
        <div
          style={{
            position: 'absolute',
            top: `${this.work.height}px`,
            width: '100%'
          }}
        >
          <div class="adjust-line-wrapper adjust-line-wrapper-h">
            <div class="adjust-line adjust-line-h"></div>
            <div
              class="adjust-button"
              onMousedown={this.mousedownForAdjustLine}
            >
              <div class="indicator"></div>
            </div>
            <div class="adjust-tip">
              <span>375 x</span>
              <a-input-number
                size="small"
                style="margin: 0 4px; width:60px;"
                value={this.work.height}
                onChange={height => {
                  this.updateWork({ height })
                }}
              />
              <span>px</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
