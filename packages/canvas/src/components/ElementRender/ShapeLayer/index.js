import { pickBy } from 'lodash'
import './index.scss'
import { renderStyle } from '../../../utils'
import vClickOutside from '../../../directive/v-click-outside'

const points = ['lt', 'rt', 'lb', 'rb', 'lm', 'rm', 'mt', 'mb']

export default {
  name: 'ShapeLayer',
  directives: {
    vClickOutside: vClickOutside
  },
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  inject: ['lbpCanvasContext'],
  data () {
    return {
      rect: this.getShape(),
      shapeStyle: renderStyle(this.getShape(), this.lbpCanvasContext.unit),
      startY: 0,
      startX: 0,
      point: '',
      active: false,
      vcoConfig: {}
    }
  },
  computed: {
    bound () {
      const { lbpCanvasContext } = this
      return {
        left: 0,
        top: 0,
        right: lbpCanvasContext.width,
        bottom: lbpCanvasContext.height
      }
    },
    shape () {
      return {
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top
      }
    }
  },
  mounted () {
    this.vcoConfig = {
      events: ['mousedown'],
      handler: this.onClickOutside,
      scopeNode: document.querySelector('.lbp-canvas-wrapper')
    }
  },
  watch: {
    top (top) {
      this.rect.top = top
      this.renderShapeStyle()
    },
    left (left) {
      this.rect.left = left
      this.renderShapeStyle()
    },
    width (width) {
      this.rect.width = width
      this.renderShapeStyle()
    },
    height (height) {
      this.rect.height = height
      this.renderShapeStyle()
    },
    rect: {
      handler (rect) {
        this.$emit('change', { ...rect }, this.effect)
      },
      deep: true
    }
  },
  methods: {
    getShape () {
      return {
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top
      }
    },
    renderShapeStyle () {
      this.shapeStyle = {
        ...this.shapeStyle,
        ...renderStyle(this.shape, this.lbpCanvasContext.unit)
      }
    },
    getReact (elStyle) {
      return pickBy(elStyle, v => v !== undefined)
    },
    setActive (active) {
      if (this.active === active) return
      active ? this.$emit('active') : this.$emit('deactive')
      this.active = active
    },
    onClickOutside () {
      this.setActive(false)
    },
    patchRect (nextRect) {
      const {
        width: nextWidth,
        left: nextLeft,
        height: nextHeight,
        top: nextTop
      } = nextRect
      if (nextWidth < 0) nextRect.width = 0
      if (nextLeft < 0) nextRect.left = 0
      if (nextHeight < 0) nextRect.height = 0
      if (nextTop < 0) nextRect.top = 0
      const { right: boundRight, bottom: boundBottom } = this.bound
      if (nextLeft + nextWidth > boundRight) return
      if (nextTop + nextHeight > boundBottom) return
      Object.assign(this.rect, nextRect)
    },
    handleShapeDown (e) {
      this.rect = this.shape
      this.setActive(true)
      this.startY = e.clientY
      this.startX = e.clientX
      document.addEventListener('mousemove', this.handleShapeMove)
      document.addEventListener('mouseup', this.handleShapeUp)
    },
    handleShapeMove (e) {
      e.preventDefault()
      this.effect = []
      const distanceX = e.clientX - this.startX
      const distanceY = e.clientY - this.startY
      const { top: currentTop, left: currentLeft } = this.rect
      this.patchRect({
        ...this.rect,
        left: currentLeft + distanceX,
        top: currentTop + distanceY
      })
      this.startX = e.clientX
      this.startY = e.clientY
    },
    handleShapeUp () {
      document.removeEventListener('mousemove', this.handleShapeMove)
      document.removeEventListener('mouseup', this.handleShapeUp)
    },
    handlePointDown (point, e) {
      this.rect = this.shape
      this.startY = e.clientY
      this.startX = e.clientX
      this.point = point
      document.addEventListener('mousemove', this.handlePointMove)
      document.addEventListener('mouseup', this.handlePointUp)
    },
    handlePointMove (e) {
      console.log(e)
      const effectRegex = [/l/, /t/, /r|lm/, /b|mt/]
      const effect = effectRegex.map(v => v.test(this.point))
      const [effectLeft, effectTop, effectWidth, effectHeight] = effect
      const { clientX, clientY } = e
      const distanceX = clientX - this.startX
      const distanceY = clientY - this.startY
      const {
        top: currentTop,
        height: currentHeight,
        left: currentLeft,
        width: currentWidth
      } = this.rect
      if (effectLeft) {
        const isRight = distanceX > 0
        const effectXDistance = isRight
          ? Math.min(currentWidth, distanceX)
          : Math.max(-currentLeft, distanceX)
        this.patchRect({
          ...this.rect,
          left: currentLeft + effectXDistance,
          width: currentWidth - effectXDistance
        })
      }
      if (effectTop) {
        const isBottom = distanceY > 0
        const effectYDistance = isBottom
          ? Math.min(currentHeight, distanceY)
          : Math.max(-currentTop, distanceY)
        this.patchRect({
          ...this.rect,
          top: currentTop + effectYDistance,
          height: currentHeight - effectYDistance
        })
      }
      if (!effectLeft && effectWidth) {
        this.patchRect({
          ...this.rect,
          width: currentWidth + distanceX
        })
      }
      if (!effectTop && effectHeight) {
        this.patchRect({
          ...this.rect,
          height: currentHeight + distanceY
        })
      }
      this.effect = [this.point]
      this.startX = clientX
      this.startY = clientY
    },
    handlePointUp () {
      document.removeEventListener('mousemove', this.handlePointMove)
      document.removeEventListener('mouseup', this.handlePointUp)
    }
  },
  render () {
    const { readonly } = this.lbpCanvasContext
    const options = {
      directives: [{ name: 'v-click-outside', value: this.vcoConfig }],
      on: {
        mousedown: this.handleShapeDown
      },
      class: [{ active: this.active }],
      attrs: {
        tabindex: 0
      }
    }
    return (
      <div
        style={this.shapeStyle}
        class="shape-layer"
        {...(!readonly ? options : {})}
      >
        <div class="shape-content">{this.$slots.default}</div>
        {!readonly && (
          <div class="control">
            {points.map(v => (
              <div
                v-show={this.active}
                class="shape-scale__point"
                data-point={v}
                onMousedown={this.handlePointDown.bind(this, v)}
              ></div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
