export default {
  methods: {
    onMousedown (e) {
      let startX = e.clientX
      const move = moveEvent => {
        moveEvent.preventDefault()
        moveEvent.stopPropagation()
        const offset = startX - moveEvent.clientX
        this.$emit('lineMove', offset)
        startX -= offset
      }

      const up = moveEvent => {
        document.removeEventListener('mousemove', move, true)
        document.removeEventListener('mouseup', up, true)
      }
      document.addEventListener('mousemove', move, true)
      document.addEventListener('mouseup', up, true)
    }
  },
  render () {
    return <div class="adjust-line-wrapper adjust-line-wrapper-v" onMousedown={this.onMousedown}>
      <div class="adjust-line adjust-line-v"></div>
      <div class="adjust-button">
        <div class="indicator"></div>
      </div>
    </div>
  }
}
