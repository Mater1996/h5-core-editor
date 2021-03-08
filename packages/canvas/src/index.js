/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime: 2021-03-08 18:45:59
 * @Description :
 */
import './index.scss'
import { renderStyle } from './utils'
import ElementLayer from './components/ElementLayer'
import ShapeLayer from './components/ShapeLayer'

const LubanH5Canvas = {
  name: 'LubanH5Canvas',
  props: {
    h5: {
      type: Object,
      default: () => ({})
    },
    page: {
      type: Number,
      default: 0
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
  data () {
    return {
      lubanCanvasContext: {
        width: this.h5.pages[this.page].width,
        height: this.h5.pages[this.page].height,
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
    currentPage () {
      return this.h5.pages[this.page]
    },
    elements () {
      return this.currentPage.elements
    },
    canvasStyle () {
      return renderStyle(
        {
          width: this.currentPage.width,
          height: this.currentPage.height
        },
        this.unit
      )
    }
  },
  provide () {
    return {
      lubanCanvasContext: this.lubanCanvasContext,
      h5: this.h5
    }
  },
  methods: {
    updateCanvas (data) {
      Object.assign(this.lubanCanvasContext, data)
    }
  },
  render () {
    return (
      <div
        class={['luban-h5-canvas', this.readonly ? 'readonly' : 'edit']}
        style={this.canvasStyle}
      >
        <div class="luban-h5-canvas-wrapper">
          <ElementLayer elements={this.elements} on={this.$listeners} />
          {!this.readonly && (
            <ShapeLayer elements={this.elements} on={this.$listeners} />
          )}
        </div>
      </div>
    )
  }
}

export default LubanH5Canvas
