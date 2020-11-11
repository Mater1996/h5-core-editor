/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-11 10:39:58
 * @Description :
 */
import Shape from './components/Shape'
import AuxiliayLine from './components/AuxiliayLine'
import ElementRender from './components/ElementRender'
import ContextMenu from './components/Contexmenu'
import AdjustHeight from './components/AdjustHeight'
import Element from '@/models/element'
import { InputNumber, Radio, Layout } from 'ant-design-vue'
import { getPropDefaultValue } from '@/utils/element'

export default {
  components: {
    [InputNumber.name]: InputNumber,
    [Radio.Button.name]: Radio.Button,
    [Radio.Group.name]: Radio.Group,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout
  },
  props: ['data'],
  data: () => ({
    contextmenuPos: [],
    activeElement: null,
    auxiliayVisible: false
  }),
  computed: {
    elements() {
      console.log('[pageRender]', this.data)
      return this.data.elements || []
    },
    elementsRect() {
      return this.elements.map(({ props }) => props)
    },
    pageStyle() {
      return {
        width: `${this.data.width}px`,
        height: `${this.data.height}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    bindContextMenu(e) {
      const { x, y } = this.$el.getBoundingClientRect()
      this.contextmenuPos = [e.clientX - x, e.clientY - y]
    },
    hideContextMenu() {
      this.contextmenuPos = []
    },
    handleElementActive(activeElement) {
      console.log('active')
      this.activeElement = activeElement
      this.$emit('active', activeElement)
    },
    handleElementDeactive(deactiveElement) {
      console.log('deactive')
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
      this.$emit('deactive', deactiveElement)
    },
    updateActiveElement(props) {
      this.activeElement && Object.assign(this.activeElement.props, props)
    },
    addElement(component) {
      const props = {}
      const { name, props: propsDefine } = component
      Object.entries(propsDefine).forEach(([key, prop]) => {
        props[key] = getPropDefaultValue(null, prop)
      })
      this.elements.push(
        new Element({
          name,
          props
        })
      )
    },
    handleElementRectChange(props) {
      this.updateActiveElement(props)
    },
    handlePageHeightChange(height) {
      this.data.height = height
    },
    hideAuxiliay() {
      this.auxiliayVisible = false
    },
    showAuxiliay() {
      this.auxiliayVisible = true
    }
  },
  render() {
    const elements = this.elements
    return (
      <a-layout id="canvas-outer-wrapper">
        <a-layout-content>
          <div class="canvas-wrapper">
            <div
              class="page-render"
              style={this.pageStyle}
              onMouseup={this.hideAuxiliay}
              onMousedown={this.showAuxiliay}
            >
              <AuxiliayLine
                data={this.elementsRect}
                width={this.data.width}
                height={this.data.height}
                v-show={this.auxiliayVisible}
              />
              <div class="elements">
                {elements.map(element => (
                  <Shape
                    props={element.props}
                    onActive={() => this.handleElementActive(element)}
                    onDeactive={() => this.handleElementDeactive(element)}
                    onChange={this.handleElementRectChange}
                  >
                    <ElementRender element={element}></ElementRender>
                  </Shape>
                ))}
              </div>
            </div>
            <AdjustHeight
              height={this.data.height}
              onChange={this.handlePageHeightChange}
            />
          </div>
        </a-layout-content>
      </a-layout>
    )
  }
}
