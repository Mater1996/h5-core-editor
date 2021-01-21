/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-06 11:03:51
 * @LastEditTime: 2021-01-21 15:06:24
 * @Description :
 */
import './index.scss'
import AdjustLine from '../adjust-line'

export default {
  name: 'AdjustHeight',
  props: {
    height: {
      type: Number,
      default: 0
    }
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
    handleAdjustHeight (offset) {
      const startHeight = this.height
      const canvasOuterWrapper = document.querySelector(
        '#editor-wrapper .scroll-view'
      )
      const currentHeight = startHeight + offset
      this.updateWorkHeight(currentHeight)
      if (canvasOuterWrapper) {
        canvasOuterWrapper.scrollTop = canvasOuterWrapper.scrollHeight
      }
    }
  },
  render () {
    return (
      <div class="adjust-height">
        <AdjustLine type="vertical" onLineMove={this.handleAdjustHeight} />
        <div class="adjust-tip">
          <span>{0} x</span>
          <input
            size="small"
            min={0}
            style="margin: 0 4px; width:60px;"
            value={this.height}
            onChange={this.updateWorkHeight}
          />
          <span>px</span>
        </div>
      </div>
    )
  }
}
