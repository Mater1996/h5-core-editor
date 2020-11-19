import './index.scss'
import { renderStyle } from '@/utils'
import vClickOutside from '@/directive/v-click-outside'
/**
 * #!zh: 上下左右 对应的 东南西北
 * #!en: top(north)、bottom(south)、left(west)、right(east)
 */
// const directionKey = {
//   t: 'n',
//   b: 's',
//   l: 'w',
//   r: 'e'
// }

export const ShapeLayerDefaultProps = {
  top: 0,
  left: 0,
  width: 100,
  height: 40
}

const points = ['lt', 'rt', 'lb', 'rb', 'lm', 'rm', 'tm', 'bm']

export default {
  directives: {
    vClickOutside: vClickOutside
  },
  props: {
    elStyle: {
      type: Object,
      default: () => ({})
    },
    disable: {
      type: Boolean,
      default: ShapeLayerDefaultProps.disable
    }
  },
  inject: ['lbpCanvasContext'],
  data () {
    return {
      rect: this.getReact(this.elStyle),
      shapeStyle: renderStyle(this.elStyle, this.lbpCanvasContext.unit),
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
    }
  },
  mounted () {
    this.vcoConfig = {
      events: ['mousedown'],
      handler: this.onClickOutside,
      scopeNode: document.querySelector('.lb-canvas-wrapper')
    }
  },
  watch: {
    elStyle () {
      const { elStyle } = this
      this.rect = this.getReact(elStyle)
      this.shapeStyle = renderStyle(elStyle, this.lbpCanvasContext.unit)
    },
    rect: {
      handler () {
        const newStyle = {
          ...this.elStyle,
          ...this.rect
        }
        this.shapeStyle = {
          ...this.shapeStyle,
          ...renderStyle(this.rect, this.lbpCanvasContext.unit)
        }
        this.$emit('change', newStyle)
      },
      deep: true
    }
  },
  methods: {
    getReact (elStyle) {
      return {
        left: elStyle.left,
        top: elStyle.top,
        width: elStyle.width,
        height: elStyle.height
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
      this.setActive(true)
      this.startY = e.clientY
      this.startX = e.clientX
      document.addEventListener('mousemove', this.handleShapeMove)
      document.addEventListener('mouseup', this.handleShapeUp)
    },
    handleShapeMove (e) {
      e.preventDefault()
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
      this.startY = e.clientY
      this.startX = e.clientX
      this.point = point
      document.addEventListener('mousemove', this.handlePointMove)
      document.addEventListener('mouseup', this.handlePointUp)
    },
    handlePointMove (e) {
      const effect = [/l/, /t/, /r/, /b/].map(v => v.test(this.point))
      const [effectLeft, effectTop, effectWidth, effectHeight] = effect
      const distanceX = e.clientX - this.startX
      const distanceY = e.clientY - this.startY
      this.startX = e.clientX
      this.startY = e.clientY
      if (effectLeft) {
        const { left: currentLeft, width: currentWidth } = this.rect
        const effectLeftDistance = Math.min(currentWidth, distanceX)
        const effectWidthDistance = Math.min(currentLeft, -distanceX)
        this.addLeft(effectLeftDistance)
        this.addWidth(effectWidthDistance)
      }
      if (effectTop) {
        const { top: currentTop, height: currentHeight } = this.rect
        const effectTopDistance = Math.min(currentHeight, distanceY)
        const effectHeightDistance = Math.min(currentTop, -distanceY)
        this.addTop(effectTopDistance)
        this.addHeight(effectHeightDistance)
      }
      effectWidth && this.addWidth(distanceX)
      effectHeight && this.addHeight(distanceY)
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
      class: ['shape-layer', { active: this.active }],
      attrs: {
        tabindex: 0
      }
    }
    return (
      <div style={this.shapeStyle} {...(!readonly ? options : {})}>
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
