/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-11 17:00:18
 * @Description :
 */
import './css/common.scss'
import './css/lb-canvas.scss'
import Element from './models/element'
import Shape from './components/Shape'
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
    const elements = this.elements
    return (
      <div class="lb-canvas-wrapper">
        <div class="lb-canvas" style={this.canvasStyle}>
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
      </div>
    )
  }
}
