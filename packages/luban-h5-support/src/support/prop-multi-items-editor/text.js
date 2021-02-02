/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-01-19 15:00:05
 * @Description :
 */
import { Input } from 'ant-design-vue'

export default {
  components: {
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
