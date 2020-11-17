/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-17 11:44:55
 * @Description :
 */
export default {
  name: 'colors-panel',
  props: {
    value: {
      type: [Array, String]
    }
  },
  render () {
    return (
      <div>
        {Array.isArray(this.value) ? (
          this.value.map((v, index) => {
            return <input
              size="small"
              type="color"
              autocomplete
              value={v}
              onChange={e => {
                const colors = this.value.slice(0)
                colors[index] = e.target.value
                this.$emit('change', colors)
              }}
            />
          })
        ) : (
          <input
            size="small"
            type="color"
            autocomplete
            value={this.value}
            onChange={e => {
              this.$emit('change', e.target.value)
            }}
          />
        )}
      </div>
    )
  }
}
