import './index.scss'

export default {
  name: 'AdjustLine',
  props: {
    type: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    isVertical () {
      return this.type === 'vertical'
    }
  },
  methods: {
    onMousedown (e) {
      let start = this.isVertical ? e.clientY : e.clientX
      const move = moveEvent => {
        moveEvent.preventDefault()
        moveEvent.stopPropagation()
        const { clientY, clientX } = moveEvent
        const offset = (this.isVertical ? clientY : clientX) - start
        this.$emit('lineMove', offset)
        start += offset
      }
      const up = () => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }
  },
  render () {
    return (
      <div
        class={`adjust-line-wrapper ${
          this.isVertical ? 'adjust-line-wrapper-v' : 'adjust-line-wrapper-h'
        }`}
        onMousedown={this.onMousedown}
      >
        <div
          class={`adjust-line ${
            this.isVertical ? 'adjust-line-v' : 'adjust-line-h'
          }`}
        ></div>
        <div class="adjust-button">
          <div class="indicator"></div>
        </div>
      </div>
    )
  }
}
