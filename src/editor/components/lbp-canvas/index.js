/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-19 14:55:52
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
    },
    readonly: {
      type: Boolean,
      default: false
    },
    unit: {
      type: String,
      default: 'px'
    }
  },
  provide () {
    return {
      lbpCanvasContext: this.lbpCanvasContext
    }
  },
  data () {
    return {
      lbpCanvasContext: {
        width: this.width,
        height: this.height,
        readonly: this.readonly,
        unit: this.unit
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
    const { active, deactive, ...restListeners } = this.$listeners
    return (
      <div class="lb-canvas" style={this.canvasStyle}>
        <div class="lb-canvas-wrapper">
          <div class="elements">
            {this.elements.map(element => (
              <ElementRender
                key={element.id}
                element={element}
                disabled={this.disabled}
                onActive={() => active(element)}
                onDeactive={() => deactive(element)}
                {...restListeners}
              ></ElementRender>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
