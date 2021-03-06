/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-06 10:50:05
 * @LastEditTime: 2021-03-01 15:50:51
 * @Description :
 */
import './index.scss'

const maxOffset = 4

export default {
  name: 'AuxiliayLine',
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
    vLinesFlag: [],
    vLines: [],
    hLinesFlag: [],
    hLines: []
  }),
  computed: {
    elementsCoords () {
      const elements = [
        { left: 0, top: 0, width: this.width, height: this.height },
        ...this.data
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
    genLines (referElements, coords, currentLines) {
      let index = 0
      const lines = [false, false, false]
      referElements.forEach(referElement => {
        referElement.forEach(referPosition => {
          coords.forEach(coordsPosition => {
            const lineIndex = index++
            const offset = referPosition - coordsPosition
            const hasLine = currentLines[lineIndex]
            if (hasLine) {
              if (Math.abs(offset) > maxOffset) {
                currentLines[lineIndex] = false
              } else {
                lines[lineIndex % 3] = referPosition
              }
            } else if (parseInt(offset) === 0) {
              currentLines[lineIndex] = true
              lines[lineIndex % 3] = referPosition
            } else {
              currentLines[lineIndex] = false
            }
          })
        })
      })
      return lines
    },
    calcVHLine (data) {
      const [exCoords, eyCoords] = this.genBorder(data)
      const [referElementsX, referElementsY] = this.elementsCoords
      this.vLines = this.genLines(referElementsX, exCoords, this.vLinesFlag)
      this.hLines = this.genLines(referElementsY, eyCoords, this.hLinesFlag)
      return [this.vLines, this.hLines]
    }
  },
  render () {
    return (
      <div class="luban-auxiliary-line relative">
        {this.vLines.map(value =>
          value ? (
            <div
              class="v-line absolute w-px h-full top-0 bg-indigo-200 transform -translate-x-1/2 pointer-events-none"
              style={{ left: `${value}px`, height: `${this.height}px` }}
            ></div>
          ) : null
        )}
        {this.hLines.map(value =>
          value ? (
            <div
              class="h-line absolute w-full h-px left-0 bg-indigo-200 pointer-events-none"
              style={{ top: `${value}px`, width: `${this.width}px` }}
            ></div>
          ) : null
        )}
      </div>
    )
  }
}
