/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime: 2021-03-05 16:45:25
 * @Description :
 */
export default {
  name: 'TitleMenu',
  methods: {
    handleClick (key) {
      this.$emit('selectMenuItem', key)
    }
  },
  render () {
    const action = ['copy', 'delete']
    return (
      <div trigger={['hover']} placement="bottomCenter">
        <div class="p-1">
          {...action.map(v => {
            return (
              <div
                class="text-xs text-indigo-600 hover:text-indigo-500"
                key={v}
                onClick={() => this.handleClick(v)}
              >
                {this.$t(`editor.pageManager.action.${v}`)}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
