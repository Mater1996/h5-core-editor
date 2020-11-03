/*
 * @Author: ly525
 * @Date: 2020-10-11 09:47:30
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-03 15:00:25
 * @FilePath: /lbs-text-align/src/main.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 */
/**
 * #!zh: 鲁班支持组件：文字对齐组件
 * #!en: Component that support Luban: for text align
 */
import { Radio, Tooltip } from 'ant-design-vue'

export default {
  name: 'lbs-text-align',
  components: {
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button,
    [Tooltip.name]: Tooltip
  },
  render(h) {
    return (
      <div class="wrap">
        <a-radio-group
          size="small"
          value={this.value}
          onChange={value => {
            this.$emit('change', value)
            this.$emit('input', value)
          }}
        >
          {this.textAlignTabs.map(item => (
            <a-tooltip
              effect="dark"
              placement="top"
              key={item.value}
              title={item.label}
            >
              <a-radio-button value={item.value}>
                <i
                  class={['fa', 'fa-align-' + item.value]}
                  aria-hidden="true"
                ></i>
              </a-radio-button>
            </a-tooltip>
          ))}
        </a-radio-group>
      </div>
    )
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  data: () => ({
    textAlignTabs: [
      {
        label: '左对齐',
        value: 'left'
      },
      {
        label: '居中对齐',
        value: 'center'
      },
      {
        label: '右对齐',
        value: 'right'
      }
    ]
  })
}
