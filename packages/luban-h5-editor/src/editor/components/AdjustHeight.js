/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-06 11:03:51
 * @LastEditTime: 2021-01-06 11:49:11
 * @Description :
 */
import { InputNumber } from 'ant-design-vue'
import { PAGE_MODE } from '../../constants/work'

export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  components: {
    [InputNumber.name]: InputNumber
  },
  methods: {
    /**
     * 更新作品高度
     * @param {Number} height
     */
    updateWorkHeight (height) {
      this.$emit('change', height || 0)
    },
    /**
     * TODO 封装 adjust editor scale 组件
     * scale: height/width
     * @param {MouseEvent} e
     */
    mousedownForAdjustLine (e) {
      const startY = e.clientY
      const startHeight = this.height
      const canvasOuterWrapper = document.querySelector(
        '#editor-wrapper .ant-layout'
      )
      const move = moveEvent => {
        // !#zh 移动的时候，不需要向后代元素传递事件，只需要单纯的移动就OK
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        const currY = moveEvent.clientY
        const moveHeight = currY - startY
        const currentHeight = moveHeight + startHeight
        this.updateWorkHeight(currentHeight)
        if (canvasOuterWrapper) { canvasOuterWrapper.scrollTop = canvasOuterWrapper.scrollHeight }
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
        style={{
          position: 'absolute',
          bottom: '0px',
          width: '100%',
          transform: 'translateY(100%)'
        }}
      >
        <div class="adjust-line-wrapper adjust-line-wrapper-h">
          <div class="adjust-line adjust-line-h"></div>
          <div class="adjust-button" onMousedown={this.mousedownForAdjustLine}>
            <div class="indicator"></div>
          </div>
          <div class="adjust-tip">
            <span>{PAGE_MODE.WIDTH} x</span>
            <a-input-number
              size="small"
              min={0}
              style="margin: 0 4px; width:60px;"
              value={this.height}
              onChange={this.updateWorkHeight}
            />
            <span>px</span>
          </div>
        </div>
      </div>
    )
  }
}
