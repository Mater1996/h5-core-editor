/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-06 10:50:05
 * @LastEditTime: 2020-12-25 15:24:21
 * @Description :
 */
const maxOffset = 4

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
  computed: {
    pageCenter () {
      return [
        [null, this.width / 2, null],
        [null, this.height / 2, null]
      ]
    },
    elementsCoords () {
      const elements = [
        ...this.data,
        { left: 0, top: 0, width: this.width, height: this.height }
      ]
      const referElementsXCoords = []
      const referElementsYCoords = []
      elements.forEach(e => {
        const [referElementXCoord, referElementYCoord] = this.genBorder(e)
        referElementsXCoords.push(referElementXCoord)
        referElementsYCoords.push(referElementYCoord)
      })
      return [referElementsXCoords, referElementsYCoords]
    }
  },
  methods: {
    genBorder ({ left, top, width, height }) {
      return [
        [left, left + width / 2, left + width],
        [top, top + height / 2, top + height]
      ]
    },
    calcVHLine (data) {
      const [exCoords, eyCoords] = this.genBorder(data)
      const [referElementsX, referElementsY] = this.elementsCoords
      let xIndex = 0
      exCoords.forEach(eX => {
        referElementsX.forEach(referElementX => {
          referElementX.forEach(referX => {
            const lineIndex = xIndex++
            const offset = referX - eX
            const hasLine = this.vLines[lineIndex]
            if (hasLine) {
              if (Math.abs(offset) > maxOffset) {
                this.$set(this.vLines, lineIndex, null)
              }
            } else if (parseInt(offset) === 0) {
              this.$set(this.vLines, lineIndex, { left: eX })
            }
          })
        })
      })
      let yIndex = 0
      eyCoords.forEach(eY => {
        referElementsY.forEach(referElementY => {
          referElementY.forEach(referY => {
            const lineIndex = yIndex++
            const offset = referY - eY
            const hasLine = this.hLines[lineIndex]
            if (hasLine) {
              if (Math.abs(offset) > maxOffset) {
                this.$set(this.hLines, lineIndex, null)
              }
            } else if (parseInt(offset) === 0) {
              this.$set(this.hLines, lineIndex, { top: eY })
            }
          })
        })
      })
      return [
        this.vLines.filter(Boolean).length,
        this.hLines.filter(Boolean).length
      ]
    }
  },
  render () {
    return (
      <div class="luban-auxiliary-line">
        {this.vLines.map(
          line =>
            line && (
              <div
                class="v-line"
                style={{ left: `${line.left}px`, height: `${this.height}px` }}
              ></div>
            )
        )}
        {this.hLines.map(
          line =>
            line && (
              <div
                class="h-line"
                style={{ top: `${line.top}px`, width: `${this.width}px` }}
              ></div>
            )
        )}
      </div>
    )
  }
}
