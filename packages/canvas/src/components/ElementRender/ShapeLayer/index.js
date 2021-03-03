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
    shapeStyle: {
      type: Object,
      default: () => ({})
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  inject: ['lubanCanvasContext'],
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
      const { lubanCanvasContext } = this
      return {
        left: 0,
        top: 0,
        right: lubanCanvasContext.width,
        bottom: lubanCanvasContext.height
      }
    },
    shape () {
      return this.normalizeShape(this.shapeStyle)
    }
  },
  watch: {
    'shape.top' (top) {
      this.rect.top = top
    },
    'shape.left' (left) {
      this.rect.left = left
    },
    'shape.width' (width) {
      this.rect.width = width
    },
    'shape.height' (height) {
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
      scopeNode: document.querySelector('.luban-h5-canvas-wrapper')
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
      const { right: rightBound, bottom: bottomRound } = this.bound
      const { clientX, clientY } = e
      const distanceX = clientX - this.startX
      const distanceY = clientY - this.startY
      const { top, height, left, width } = this.rect
      const nextRect = { ...this.rect }
      const toRight = distanceX > 0
      const toBottom = distanceY > 0
      if (effectLeft) {
        const effectXDistance = toRight
          ? Math.min(width, distanceX)
          : Math.max(-left, distanceX)
        nextRect.left = left + effectXDistance
        nextRect.width = width - effectXDistance
      } else if (effectWidth) {
        const effectXDistance = toRight
          ? Math.min(rightBound - (left + width), distanceX)
          : Math.max(-width, distanceX)
        nextRect.width = width + effectXDistance
      }
      if (effectTop) {
        const effectYDistance = toBottom
          ? Math.min(height, distanceY)
          : Math.max(-top, distanceY)
        nextRect.top = top + effectYDistance
        nextRect.height = height - effectYDistance
      } else if (effectHeight) {
        const effectYDistance = toBottom
          ? Math.min(bottomRound - (top + height), distanceY)
          : Math.max(-height, distanceY)
        nextRect.height = height + effectYDistance
      }
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
    const { readonly } = this.lubanCanvasContext
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
    const style = renderStyle(this.shape, this.lubanCanvasContext.unit)
    return (
      <div
        style={style}
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
