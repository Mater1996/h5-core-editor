/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-17 17:27:16
 * @Description :
 */
import './index.scss'
import ElementRender from './components/ElementRender'

export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    elements: {
      type: Array,
      default: () => []
    }
  },
  provide () {
    return {
      canvas: this.canvas
    }
  },
  data () {
    return {
      canvas: {
        width: this.width,
        height: this.height
      }
    }
  },
  watch: {
    width (width) {
      this.updateCanvas({ width })
    },
    height (height) {
      this.updateCanvas({ height })
    }
  },
  computed: {
    canvasStyle () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    }
  },
  methods: {
    updateCanvas (data) {
      Object.assign(this.canvas, data)
    }
  },
  render () {
    return (
      <div class="lb-canvas" style={this.canvasStyle}>
        <div class="lb-canvas-wrapper">
          <div class="elements">
            {this.elements.map(element => (
              <ElementRender
                key={element.id}
                element={element}
                onActive={() => this.$listeners.active(element)}
                onDeactive={() => this.$listeners.deactive(element)}
                onChange={this.$listeners.elementRectChange}
              ></ElementRender>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
