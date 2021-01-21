/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-01-20 12:00:39
 * @Description :
 */
import './index.scss'
import { renderStyle } from './utils'
import ElementRender from './components/ElementRender'

const LbpCanvas = {
  name: 'luban-h5-canvas',
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
      return renderStyle(
        {
          width: this.width,
          height: this.height
        },
        this.unit
      )
    }
  },
  methods: {
    updateCanvas (data) {
      Object.assign(this.lbpCanvasContext, data)
    }
  },
  render () {
    return (
      <div
        class={['lbp-canvas', this.readonly ? 'readonly' : 'edit']}
        style={this.canvasStyle}
      >
        <div class="lbp-canvas-wrapper">
          <div class="lbp-elements">
            {this.elements.map(element => (
              <ElementRender
                key={element.id}
                element={element}
                disabled={this.disabled}
                on={this.$listeners}
              ></ElementRender>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default LbpCanvas
