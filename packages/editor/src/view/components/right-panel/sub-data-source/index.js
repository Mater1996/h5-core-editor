/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-03-08 17:32:12
 * @Description: 订阅数据源
 */
export default {
  props: {
    subDataSource: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentSubDataSource: ''
    }
  },
  methods: {
    _handleAddSubDataSource () {
      this.$emit('change', [...this.subDataSources, this.currentSubDataSource])
    }
  },
  render () {
    return (
      <div class="p-2">
        <input
          class="inline-block border p-2"
          v-model={this.currentSubDataSource}
        />
        <button
          class="inline-block border p-2 bg-green-600 text-sm box-border"
          onClick={this._handleAddSubDataSource}
        >
          添加
        </button>
        <div>
          {...this.subDataSource.map(v => {
            return <p>{v}</p>
          })}
        </div>
      </div>
    )
  }
}
