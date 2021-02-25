/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-25 14:26:40
 * @Description: switch
 */
import './index.scss'

let id = 0

export default {
  name: 'LubanSupportSwitch',
  methods: {
    handleChange (e) {
      this.$emit('change', e.target.value)
    }
  },
  render () {
    const switchId = id++
    return (
      <div class="luban-support-switch">
        <input
          onChange={this.handleChange}
          class="luban-support-switch-checkbox"
          type="checkbox"
          id={`luban-support-switch-${switchId}`}
        />
        <label
          class="luban-support-switch-label"
          for={`luban-support-switch-${switchId}`}
        >
          Toggle
        </label>
      </div>
    )
  }
}
