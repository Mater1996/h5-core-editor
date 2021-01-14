import { pickBy } from 'lodash'
import './index.scss'
import { renderStyle } from '../../../utils'
import vClickOutside from '../../../directive/v-click-outside'

const points = ['lt', 'rt', 'lb', 'rb', 'lm', 'rm', 'mt', 'mb']

export default {
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
      shapeStyle: renderStyle(
        this.getShape(),
        this.lbpCanvasContext.unit
      ),
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
    addWidth (distance) {
      const { left: currentLeft, width: currentWidth } = this.rect
      const { right: boundRight } = this.bound
      let nextWidth = currentWidth + distance
      if (nextWidth < 0) nextWidth = 0
      if (currentLeft + nextWidth > boundRight) return
      return (this.rect.width = nextWidth)
    },
    addHeight (distance) {
      const { top: currentTop, height: currentHeight } = this.rect
      const { bottom: boundBottom } = this.bound
      let nextHeight = currentHeight + distance
      if (nextHeight < 0) nextHeight = 0
      if (currentTop + nextHeight > boundBottom) return
      return (this.rect.height = nextHeight)
    },
    addLeft (distance) {
      const { left: currentLeft, width: currentWidth } = this.rect
      const { left: boundLeft, right: boundRight } = this.bound
      let nextLeft = currentLeft + distance
      if (nextLeft < boundLeft) nextLeft = boundLeft
      if (nextLeft + currentWidth > boundRight) return
      return (this.rect.left = nextLeft)
    },
    addTop (distance) {
      const { top: currentTop, height: currentHeight } = this.rect
      const { top: boundTop, bottom: boundBottom } = this.bound
      let nextTop = currentTop + distance
      if (nextTop < boundTop) nextTop = boundTop
      if (nextTop + currentHeight > boundBottom) return
      return (this.rect.top = nextTop)
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
      this.startX = e.clientX
      this.startY = e.clientY
      this.addLeft(distanceX)
      this.addTop(distanceY)
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
      this.effect = [this.point]
      const [effectLeft, effectTop, effectWidth, effectHeight] = effect
      const distanceX = e.clientX - this.startX
      const distanceY = e.clientY - this.startY
      this.startX = e.clientX
      this.startY = e.clientY
      if (effectLeft) {
        const { left: currentLeft, width: currentWidth } = this.rect
        const effectLeftDistance = Math.min(currentWidth, distanceX)
        const effectWidthDistance = Math.min(currentLeft, -distanceX)
        if (effectLeftDistance > 0) {
          this.addWidth(effectWidthDistance)
          this.addLeft(effectLeftDistance)
        } else {
          this.addLeft(effectLeftDistance)
          this.addWidth(effectWidthDistance)
        }
      }
      if (effectTop) {
        const { top: currentTop, height: currentHeight } = this.rect
        const effectTopDistance = Math.min(currentHeight, distanceY)
        const effectHeightDistance = Math.min(currentTop, -distanceY)
        if (effectTopDistance > 0) {
          this.addHeight(effectHeightDistance)
          this.addTop(effectTopDistance)
        } else {
          this.addTop(effectTopDistance)
          this.addHeight(effectHeightDistance)
        }
      }
      !effectLeft && effectWidth && this.addWidth(distanceX)
      !effectTop && effectHeight && this.addHeight(distanceY)
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
