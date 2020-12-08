/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-02 10:47:24
 * @Description :
 */
import { Icon, Input } from 'ant-design-vue'

export default {
  components: {
    [Icon.name]: Icon,
    [Input.name]: Input
  },
  name: 'lbs-props-text-enum-editor',
  render () {
    return (
      <div>
        {this.innerItems.map((item, index) => (
          <div>
            <a-input
              value={item.value}
              onChange={e => {
                item.value = e.target.value
              }}
              style={{ width: '70%' }}
            ></a-input>
            <a-icon type="plus-circle" onClick={this.add} class="ml-2" />
            <a-icon
              type="minus-circle"
              onClick={(item, index) => this.minus(item, index)}
              class="ml-1"
            ></a-icon>
          </div>
        ))}
      </div>
    )
  },
  props: {
    value: {
      type: Array,
      default: () => [
        {
          value: 'default',
          label: 'default'
        }
      ]
    }
  },
  computed: {
    innerItems: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    add () {
      this.$emit('change', [
        ...this.innerItems,
        {
          value: `选项${this.innerItems.length + 1}`,
          label: `选项${this.innerItems.length + 1}-label`
        }
      ])
    },
    minus (item, index) {
      const items = this.innerItems.slice(0)
      items.splice(index, 1)
      this.$emit('change', items)
    }
  }
}