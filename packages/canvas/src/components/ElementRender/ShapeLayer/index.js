import './index.scss'
import { renderStyle } from '../../../utils'
import vClickOutside from '../../../directive/v-click-outside'

const points = ['lt', 'rt', 'lb', 'rb', 'lm', 'rm', 'mt', 'mb']

export default {
  name: 'ShapeLayer',
  directives: {
    vClickOutside
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
      startY: 0,
      startX: 0,
      point: '',
      active: false,
      vcoConfig: {},
      rect: {}
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
      return this.normalizeShape({
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top
      })
    },
    shapeStyle () {
      return renderStyle(this.shape, this.lbpCanvasContext.unit)
    }
  },
  watch: {
    top (top) {
      this.rect.top = top
    },
    left (left) {
      this.rect.left = left
    },
    width (width) {
      this.rect.width = width
    },
    height (height) {
      this.rect.height = height
    },
    rect: {
      handler (rect) {
        this.$emit('change', { ...rect }, this.effect)
      },
      deep: true
    }
  },
  mounted () {
    this.vcoConfig = {
      events: ['mousedown'],
      handler: this.onClickOutside,
      scopeNode: document.querySelector('.lbp-canvas-wrapper')
    }
  },
  methods: {
    normalizeShape (shape) {
      let { width, height, left, top } = shape
      const { right: rightBound, bottom: bottomRound } = this.bound
      if (left < 0) left = 0
      if (top < 0) top = 0
      if (width > rightBound) width = rightBound
      if (height > bottomRound) height = bottomRound
      if (left + width > rightBound) left = rightBound - width
      if (top + height > bottomRound) top = bottomRound - height
      return {
        ...shape,
        width,
        height,
        left,
        top
      }
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
      Object.assign(this.rect, this.normalizeShape(nextRect))
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
      const effectRegex = [/l/, /t/, /r|lm/, /b|mt/]
      const effect = effectRegex.map(v => v.test(this.point))
      const [effectLeft, effectTop, effectWidth, effectHeight] = effect
      const { clientX, clientY } = e
      const distanceX = clientX - this.startX
      const distanceY = clientY - this.startY
      const { top, height, left, width } = this.rect
      const nextRect = { ...this.rect }
      if (effectLeft) {
        const toRight = distanceX > 0
        const effectXDistance = toRight
          ? Math.min(width, distanceX)
          : Math.max(-left, distanceX)
        nextRect.left = left + effectXDistance
        nextRect.width = width - effectXDistance
      }
      if (effectTop) {
        const toBottom = distanceY > 0
        const effectYDistance = toBottom
          ? Math.min(height, distanceY)
          : Math.max(-top, distanceY)
        nextRect.top = top + effectYDistance
        nextRect.height = height - effectYDistance
      }
      if (!effectLeft && effectWidth) nextRect.width = width + distanceX
      if (!effectTop && effectHeight) nextRect.height = height + distanceY
      this.effect = [this.point]
      this.startX = clientX
      this.startY = clientY
      this.patchRect(nextRect)
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
