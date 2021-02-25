/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-25 14:23:29
 * @Description:
 */
export default {
  name: 'LubanSupportInput',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('change', e.target.value)
    }
  },
  render () {
    return <input value={this.value} onInput={this.handleChange}/>
  }
}
