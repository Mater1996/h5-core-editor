/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-16 17:19:24
 * @Description :
 */
import './css/common.scss'
import './css/lb-canvas.scss'
import ElementRender from './components/Element'
import Element from './models/element'
import animationsMixin from '@/mixins/animation'

export default {
  Element,
  mixins: [animationsMixin],
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
  provide() {
    return {
      canvas: this.canvas
    }
  },
  data() {
    return {
      activeElement: null,
      elements: [],
      canvas: {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    width(width) {
      this.updateCanvas({ width })
    },
    height(height) {
      this.updateCanvas({ height })
    }
  },
  computed: {
    canvasStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
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
    updateCanvas(data) {
      Object.assign(this.canvas, data)
    },
    updateElement(data) {
      if (this.activeElement) {
        data && this.activeElement.update(data)
      }
    },
    addElement(...elements) {
      elements.forEach(element => {
        if (element instanceof Element) {
          this.elements.push(element)
        }
      })
    },
    handleElementRectChange(style) {
      this.updateElement({ style })
    },
    clear() {
      this.elements = []
    }
  },
  render() {
    return (
      <div class="lb-canvas">
        <div class="lb-canvas-wrapper" style={this.canvasStyle}>
          <div class="elements">
            {this.elements.map(element => (
              <ElementRender
                element={element}
                onActive={() => this.handleElementActive(element)}
                onDeactive={() => this.handleElementDeactive(element)}
                onChange={this.handleElementRectChange}
              ></ElementRender>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
