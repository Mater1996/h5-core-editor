/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-25 14:26:22
 * @Description:
 */
export default {
  name: 'LubanSupportInputNumber',
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('change', Number(e.target.value))
    }
  },
  render () {
    return <input value={this.value} onChange={this.handleChange} type="number"/>
  }
}
