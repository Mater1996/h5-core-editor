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
        class={`group adjust-line-wrapper relative ${
          this.isVertical
            ? 'adjust-line-wrapper-v w-full'
            : 'adjust-line-wrapper-h h-full'
        }`}
        onMousedown={this.onMousedown}
      >
        <div
          class={`adjust-line bg-white box-border group-hover:bg-blue-600 ${
            this.isVertical
              ? 'adjust-line-v w-full h-px'
              : 'adjust-line-h h-full w-px'
          }`}
        ></div>
        <div class="adjust-button absolute flex justify-center items-center mx-auto w-7 h-2 bg-white group-hover:bg-blue-600">
          <div class="indicator mx-auto w-2 h-px bg-gray-100"></div>
        </div>
      </div>
    )
  }
}
