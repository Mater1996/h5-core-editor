/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 10:10:44
 * @Description :
 */
import './css/common.scss'
import './css/lb-canvas.scss'
import Element from './models/element'
import ShapeLayer from './components/ShapeLayer'
import ElementRender from './components/ElementRender'

export default {
  Element,
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    activeElement: null,
    elements: []
  }),
  computed: {
    canvasStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    handleElementActive(activeElement) {
      this.activeElement = activeElement
      this.$emit('active', activeElement)
    },
    handleElementDeactive(deactiveElement) {
      if (deactiveElement === this.activeElement) {
        this.activeElement = null
      }
      this.$emit('deactive', deactiveElement)
    },
    updateActiveElement(props) {
      this.activeElement && this.activeElement.updateProps(props)
    },
    addElement(...elements) {
      elements.forEach(element => {
        if (element instanceof Element) {
          this.elements.push(element)
        }
      })
    },
    handleElementRectChange(props) {
      this.updateActiveElement(props)
    },
    clear() {
      this.elements = []
    }
  },
  render() {
    return (
      <div class="lb-canvas-wrapper">
        <div class="lb-canvas" style={this.canvasStyle}>
          <div class="elements">
            {this.elements.map(element => (
              <ShapeLayer
                props={element.props}
                onActive={() => this.handleElementActive(element)}
                onDeactive={() => this.handleElementDeactive(element)}
                onChange={this.handleElementRectChange}
              >
                <ElementRender element={element}></ElementRender>
              </ShapeLayer>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
