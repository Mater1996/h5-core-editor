/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-06 10:50:05
 * @LastEditTime : 2020-11-16 18:07:04
 * @Description :
 */
export default {
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    vLines: [],
    hLines: []
  }),
  watch: {
    data: {
      handler: 'calcVHLine',
      deep: true
    }
  },
  methods: {
    drawVLine (newLeft) {
      this.vLines = [{ left: newLeft }]
    },
    clearVLine () {
      this.vLines = []
    },
    drawHLine (newTop) {
      this.hLines = [{ top: newTop }]
    },
    clearHLine () {
      this.hLines = []
    },
    genBorder ({ left, top, width, height }) {
      return [
        [left + width, left + width / 2, left],
        [top + height, top + height / 2, top]
      ]
    },
    calcVHLine () {
      const referElementsXCoords = []
      const referElementsYCoords = []
      let hasVLine = false
      let hasHLine = false
      this.data.forEach(e => {
        const [xCoords, yCoords] = this.genBorder(e)
        referElementsXCoords.push(...xCoords)
        referElementsYCoords.push(...yCoords)
      })
      const [exCoords, eyCoords] = this.genBorder({
        left: 0,
        top: 0,
        width: this.width,
        height: this.height
      })
      exCoords.forEach(eX => {
        referElementsXCoords.forEach(referX => {
          const offset = referX - eX
          if (Math.abs(offset) <= 5) {
            this.drawVLine(referX)
            hasVLine = true
          }
        })
      })
      eyCoords.forEach(eY => {
        referElementsYCoords.forEach(referY => {
          const offset = referY - eY
          if (Math.abs(offset) <= 5) {
            this.drawHLine(referY)
            hasHLine = true
          }
        })
      })
      if (!hasVLine) {
        this.clearVLine()
      }
      if (!hasHLine) {
        this.clearHLine()
      }
    }
  },
  render () {
    return (
      <div class="luban-auxiliary-line">
        {this.vLines.map(line => (
          <div
            class="v-line"
            style={{ left: `${line.left}px`, height: `${this.height}px` }}
          ></div>
        ))}
        {this.hLines.map(line => (
          <div
            class="h-line"
            style={{ top: `${line.top}px`, width: `${this.width}px` }}
          ></div>
        ))}
      </div>
    )
  }
}
