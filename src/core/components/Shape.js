import '../css/shape.scss'
import animationMixin from '@/mixins/animation.js'
import vClickOutside from '../directive/v-click-outside'

/**
 * #!zh: 上下左右 对应的 东南西北
 * #!en: top(north)、bottom(south)、left(west)、right(east)
 */
const directionKey = {
  t: 'n',
  b: 's',
  l: 'w',
  r: 'e'
}

const points = ['lt', 'rt', 'lb', 'rb', 'lm', 'rm', 'tm', 'bm']

var id = 0

export default {
  mixins: [animationMixin],
  directives: {
    clickOutside: vClickOutside
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
  data() {
    return {
      rect: {
        width: this.width,
        height: this.height,
        left: this.left,
        top: this.top
      },
      startY: 0,
      startX: 0,
      point: '',
      active: false,
      vcoConfig: {}
    }
  },
  mounted() {
    this.vcoConfig = {
      events: ['mousedown'],
      handler: this.onClickOutside,
      scopeNode: document.querySelector('.lb-canvas')
    }
  },
  computed: {
    shapeStyle() {
      const { left, top, width, height } = this.rect
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    },
    ltPointStyle() {
      return {
        left: `${0}px`,
        top: `${0}px`
      }
    },
    rtPointStyle() {
      const { width } = this.rect
      return {
        left: `${width}px`,
        top: `${0}px`
      }
    },
    lbPointStyle() {
      const { height } = this.rect
      return {
        left: `${0}px`,
        top: `${height}px`
      }
    },
    rbPointStyle() {
      const { width, height } = this.rect
      return {
        left: `${width}px`,
        top: `${height}px`
      }
    },
    lmPointStyle() {
      const { height } = this.rect
      return {
        left: `${0}px`,
        top: `${height / 2}px`
      }
    },
    rmPointStyle() {
      const { width, height } = this.rect
      return {
        left: `${width}px`,
        top: `${height / 2}px`
      }
    },
    tmPointStyle() {
      const { width } = this.rect
      return {
        left: `${width / 2}px`,
        top: `${0}px`
      }
    },
    bmPointStyle() {
      const { width, height } = this.rect
      return {
        left: `${width / 2}px`,
        top: `${height}px`
      }
    }
  },
  watch: {
    rect: {
      handler(newValue) {
        this.$emit('change', newValue)
      },
      deep: true
    }
  },
  methods: {
    setActive(active) {
      if (this.active === active) return
      active ? this.$emit('active', active) : this.$emit('deactive', active)
      this.active = active
    },
    onClickOutside() {
      this.setActive(false)
    },
    addWidth(width) {
      const currentWidth = this.rect.width
      let nextWidth = currentWidth + width
      if (nextWidth < 0) nextWidth = 0
      return (this.rect.width = nextWidth)
    },
    addHeight(height) {
      const currentHeight = this.rect.height
      let nextHeight = currentHeight + height
      if (nextHeight < 0) nextHeight = 0
      return (this.rect.height = nextHeight)
    },
    addLeft(left) {
      const { left: currentLeft, width: currentWidth } = this.rect
      left = currentWidth > left ? left : currentWidth
      let nextLeft = currentLeft + left
      if (nextLeft < 0) nextLeft = 0
      return (this.rect.left = nextLeft)
    },
    addTop(top) {
      const { top: currentTop, height: currentHeight } = this.rect
      top = currentHeight > top ? top : currentHeight
      let nextTop = currentTop + top
      if (nextTop < 0) nextTop = 0
      return (this.rect.top = nextTop)
    },
    handleShapeDown(e) {
      this.setActive(true)
      this.startY = e.clientY
      this.startX = e.clientX
      document.addEventListener('mousemove', this.handleShapeMove)
      document.addEventListener('mouseup', this.handleShapeUp)
    },
    handleShapeMove(e) {
      e.preventDefault()
      const distanceX = e.clientX - this.startX
      const distanceY = e.clientY - this.startY
      this.startX = e.clientX
      this.startY = e.clientY
      this.addLeft(distanceX)
      this.addTop(distanceY)
    },
    handleShapeUp() {
      document.removeEventListener('mousemove', this.handleShapeMove)
      document.removeEventListener('mouseup', this.handleShapeUp)
    },
    handlePointDown(point, e) {
      this.startY = e.clientY
      this.startX = e.clientX
      this.point = point
      document.addEventListener('mousemove', this.handlePointMove)
      document.addEventListener('mouseup', this.handlePointUp)
    },
    handlePointMove(e) {
      const effect = [/l/, /t/, /r/, /b/].map(v => v.test(this.point))
      const [effectLeft, effectTop, effectWidth, effectHeight] = effect
      const distanceX = e.clientX - this.startX
      const distanceY = e.clientY - this.startY
      this.startX = e.clientX
      this.startY = e.clientY
      effectLeft && this.addLeft(distanceX)
      effectLeft && this.addWidth(-distanceX)
      effectTop && this.addTop(distanceY)
      effectTop && this.addHeight(-distanceY)
      effectWidth && this.addWidth(distanceX)
      effectHeight && this.addHeight(distanceY)
    },
    handlePointUp() {
      document.removeEventListener('mousemove', this.handlePointMove)
      document.removeEventListener('mouseup', this.handlePointUp)
    }
  },
  render() {
    return (
      <div
        tabindex="0"
        v-click-outside={this.vcoConfig}
        style={this.shapeStyle}
        class={['shape__wrapper', { 'shape__wrapper-active': this.active }]}
        data-id={id++}
        onMousedown={this.handleShapeDown}
        ref="shape"
      >
        <div class="content">{this.$slots.default}</div>
        <div class="control">
          {points.map(v => (
            <div
              v-show={this.active}
              style={this[`${v}PointStyle`]}
              class="shape__scale-point"
              data-point={v}
              onMousedown={this.handlePointDown.bind(this, v)}
            ></div>
          ))}
        </div>
      </div>
    )
  }
}
