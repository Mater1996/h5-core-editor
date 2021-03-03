/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-07 11:18:42
 * @Description:
 */
export default {
  name: 'LubanSupportSelect',
  props: {
    value: {
      default: null
    },
    options: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    handleChange (e) {
      console.log(e.target.value)
      this.$emit('change', e.target.value)
    }
  },
  render () {
    return (
      <select class="border px-1" onChange={this.handleChange}>
        {...this.options.map(v => {
          return <option value={v.value}>{v.label}</option>
        })}
      </select>
    )
  }
}
